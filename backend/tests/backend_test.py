"""Merkabah Creative Life - backend API tests."""
import os
import pytest
import requests

BASE = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE:
    # Fallback read from frontend/.env
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL"):
                BASE = line.split("=", 1)[1].strip().rstrip("/")

API = f"{BASE}/api"
ADMIN_EMAIL = "merkabahcreativelife@gmail.com"
ADMIN_PASSWORD = "Merkabah@2026"


@pytest.fixture(scope="session")
def token():
    r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=30)
    assert r.status_code == 200, f"login failed {r.status_code} {r.text}"
    data = r.json()
    assert "token" in data and data["user"]["role"] == "admin"
    return data["token"]


@pytest.fixture
def auth_headers(token):
    return {"Authorization": f"Bearer {token}"}


# ---------- Root / auth ----------
def test_root():
    r = requests.get(f"{API}/", timeout=15)
    assert r.status_code == 200
    assert "Merkabah" in r.json().get("brand", "")


def test_login_invalid():
    r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": "wrong"}, timeout=15)
    assert r.status_code == 401


def test_me_requires_auth():
    r = requests.get(f"{API}/auth/me", timeout=15)
    assert r.status_code == 401


def test_me_with_token(auth_headers):
    r = requests.get(f"{API}/auth/me", headers=auth_headers, timeout=15)
    assert r.status_code == 200
    assert r.json()["email"] == ADMIN_EMAIL
    assert r.json()["role"] == "admin"


# ---------- Public content ----------
def test_courses_seeded():
    r = requests.get(f"{API}/content/courses", timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list) and len(data) >= 5
    titles = {c["title"] for c in data}
    assert {"Piano & Keyboard", "Guitar", "Violin", "Drums & Percussion", "Vocals"}.issubset(titles)


def test_events_seeded():
    r = requests.get(f"{API}/content/events", timeout=15)
    assert r.status_code == 200
    assert len(r.json()) >= 1


def test_articles_seeded():
    r = requests.get(f"{API}/content/articles", timeout=15)
    assert r.status_code == 200
    assert len(r.json()) >= 1


def test_unknown_collection():
    r = requests.get(f"{API}/content/unknown_x", timeout=15)
    assert r.status_code == 404


# ---------- Public forms + admin visibility ----------
def _get_admin(coll, headers):
    r = requests.get(f"{API}/admin/{coll}", headers=headers, timeout=15)
    assert r.status_code == 200
    return r.json()


def test_contact_form_and_admin(auth_headers):
    payload = {"name": "TEST_Contact", "email": "test_contact@example.com",
               "message": "Hello from tests", "enquiry_type": "General"}
    r = requests.post(f"{API}/contact", json=payload, timeout=15)
    assert r.status_code == 200
    doc = r.json()
    assert doc["email"] == payload["email"]
    assert "id" in doc
    items = _get_admin("contact_enquiries", auth_headers)
    assert any(x["id"] == doc["id"] for x in items)


def test_agency_enquiry_and_admin(auth_headers):
    payload = {"name": "TEST_Agency", "email": "test_agency@example.com",
               "description": "Project brief", "services": ["Branding"]}
    r = requests.post(f"{API}/agency/enquiry", json=payload, timeout=15)
    assert r.status_code == 200
    doc = r.json()
    items = _get_admin("project_enquiries", auth_headers)
    assert any(x["id"] == doc["id"] for x in items)


def test_trial_class_and_admin(auth_headers):
    payload = {"name": "TEST_Trial", "email": "trial@example.com", "phone": "9999999999",
               "instrument": "Piano"}
    r = requests.post(f"{API}/academy/trial", json=payload, timeout=15)
    assert r.status_code == 200
    doc = r.json()
    items = _get_admin("trial_classes", auth_headers)
    assert any(x["id"] == doc["id"] for x in items)


def test_application_and_admin(auth_headers):
    payload = {"full_name": "TEST_Intern", "email": "intern@example.com",
               "phone": "8888888888", "kind": "internship"}
    r = requests.post(f"{API}/careers/apply", json=payload, timeout=15)
    assert r.status_code == 200
    doc = r.json()
    items = _get_admin("applications", auth_headers)
    assert any(x["id"] == doc["id"] for x in items)


def test_newsletter_and_dedupe(auth_headers):
    email = "test_news@example.com"
    r1 = requests.post(f"{API}/newsletter", json={"email": email}, timeout=15)
    assert r1.status_code == 200
    r2 = requests.post(f"{API}/newsletter", json={"email": email}, timeout=15)
    assert r2.status_code == 200
    assert "Already subscribed" in r2.json().get("message", "") or r2.json().get("ok") is True


def test_community_and_admin(auth_headers):
    payload = {"name": "TEST_Community", "email": "comm@example.com", "interest": "Music"}
    r = requests.post(f"{API}/community/join", json=payload, timeout=15)
    assert r.status_code == 200
    doc = r.json()
    items = _get_admin("community", auth_headers)
    assert any(x["id"] == doc["id"] for x in items)


# ---------- Admin auth guard ----------
def test_admin_applications_requires_auth():
    r = requests.get(f"{API}/admin/applications", timeout=15)
    assert r.status_code in (401, 403)


def test_admin_unknown_collection(auth_headers):
    r = requests.get(f"{API}/admin/not_a_coll", headers=auth_headers, timeout=15)
    assert r.status_code == 404


# ---------- Search ----------
def test_search_music():
    r = requests.get(f"{API}/search", params={"q": "music"}, timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, dict)
    # at least one category should return results (articles reference "creative journey" no...)
    # Search "piano" should hit courses reliably.
    r2 = requests.get(f"{API}/search", params={"q": "piano"}, timeout=15)
    assert r2.status_code == 200
    d2 = r2.json()
    assert "courses" in d2 and len(d2["courses"]) >= 1


def test_search_min_length():
    r = requests.get(f"{API}/search", params={"q": "a"}, timeout=15)
    assert r.status_code == 422
