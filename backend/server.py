from dotenv import load_dotenv
from pathlib import Path
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import uuid
import logging
import bcrypt
import jwt
from datetime import datetime, timezone, timedelta
from typing import List, Optional, Any, Dict
from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends, Query
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr, ConfigDict

# ---------- DB ----------
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

JWT_ALGORITHM = "HS256"

def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]

def hash_password(pw: str) -> str:
    return bcrypt.hashpw(pw.encode(), bcrypt.gensalt()).decode()

def verify_password(pw: str, hashed: str) -> bool:
    return bcrypt.checkpw(pw.encode(), hashed.encode())

def create_access_token(user_id: str, email: str, ver: int = 0) -> str:
    payload = {"sub": user_id, "email": email, "ver": ver,
               "exp": datetime.now(timezone.utc) + timedelta(hours=8), "type": "access"}
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)

# ---------- App ----------
app = FastAPI(title="Merkabah Creative Life API")
api = APIRouter(prefix="/api")

async def get_current_admin(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth = request.headers.get("Authorization", "")
        if auth.startswith("Bearer "):
            token = auth[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        user = await db.users.find_one({"id": payload["sub"]})
        if not user or user.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Admin only")
        user.pop("password_hash", None)
        user.pop("_id", None)
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ---------- Models ----------
def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()

class LoginIn(BaseModel):
    email: EmailStr
    password: str

class ContactIn(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    enquiry_type: Optional[str] = "General Enquiry"
    message: str

class ProjectEnquiryIn(BaseModel):
    name: str
    company: Optional[str] = None
    email: EmailStr
    phone: Optional[str] = None
    website: Optional[str] = None
    industry: Optional[str] = None
    services: List[str] = []
    description: str
    budget: Optional[str] = None
    timeline: Optional[str] = None
    heard_from: Optional[str] = None

class TrialClassIn(BaseModel):
    name: str
    email: EmailStr
    phone: str
    age: Optional[str] = None
    instrument: str
    experience_level: Optional[str] = "Beginner"
    preferred_time: Optional[str] = None
    message: Optional[str] = None

class ApplicationIn(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    city: Optional[str] = None
    education: Optional[str] = None
    course: Optional[str] = None
    skills: Optional[str] = None
    portfolio_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    resume_url: Optional[str] = None
    cover_letter: Optional[str] = None
    why_merkabah: Optional[str] = None
    availability: Optional[str] = None
    area: Optional[str] = None
    duration: Optional[str] = None
    job_id: Optional[str] = None
    kind: str = "internship"  # or "job"

class NewsletterIn(BaseModel):
    email: EmailStr

class CommunityIn(BaseModel):
    name: str
    email: EmailStr
    interest: Optional[str] = None
    city: Optional[str] = None

class GenericDoc(BaseModel):
    model_config = ConfigDict(extra="allow")
    id: Optional[str] = None

# ---------- Auth ----------
@api.post("/auth/login")
async def login(body: LoginIn, response: Response):
    email = body.email.lower().strip()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(body.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token(user["id"], user["email"], user.get("token_version", 0))
    response.set_cookie("access_token", token, httponly=True, secure=True, samesite="none", max_age=28800, path="/")
    return {"token": token, "user": {"id": user["id"], "email": user["email"], "name": user.get("name"), "role": user.get("role")}}

@api.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    return {"ok": True}

@api.get("/auth/me")
async def me(admin=Depends(get_current_admin)):
    return admin

# ---------- Public form endpoints ----------
async def _insert_form(coll: str, data: dict, extra: dict = None):
    doc = {"id": str(uuid.uuid4()), "created_at": now_iso(), "status": "New", **data}
    if extra: doc.update(extra)
    await db[coll].insert_one(doc)
    doc.pop("_id", None)
    return doc

@api.post("/contact")
async def contact(body: ContactIn):
    return await _insert_form("contact_enquiries", body.model_dump())

@api.post("/agency/enquiry")
async def project_enquiry(body: ProjectEnquiryIn):
    return await _insert_form("project_enquiries", body.model_dump())

@api.post("/academy/trial")
async def trial_class(body: TrialClassIn):
    return await _insert_form("trial_classes", body.model_dump())

@api.post("/careers/apply")
async def apply(body: ApplicationIn):
    return await _insert_form("applications", body.model_dump())

@api.post("/newsletter")
async def newsletter(body: NewsletterIn):
    email = body.email.lower().strip()
    existing = await db.newsletter.find_one({"email": email})
    if existing:
        return {"ok": True, "message": "Already subscribed"}
    return await _insert_form("newsletter", {"email": email})

@api.post("/community/join")
async def community(body: CommunityIn):
    return await _insert_form("community", body.model_dump())

# ---------- Public content GET ----------
COLLECTIONS = ["courses", "instructors", "events", "podcast_episodes", "wellness_experiences",
               "jobs", "products", "articles", "portfolio_projects", "studios_projects"]

async def _list(coll: str, published_only: bool = True) -> List[dict]:
    q = {"published": True} if published_only else {}
    docs = await db[coll].find(q, {"_id": 0}).sort("created_at", -1).to_list(500)
    return docs

@api.get("/content/{coll}")
async def get_content(coll: str, published_only: bool = True):
    if coll not in COLLECTIONS:
        raise HTTPException(404, "Unknown collection")
    return await _list(coll, published_only)

@api.get("/content/{coll}/{item_id}")
async def get_item(coll: str, item_id: str):
    if coll not in COLLECTIONS:
        raise HTTPException(404, "Unknown collection")
    doc = await db[coll].find_one({"id": item_id}, {"_id": 0})
    if not doc:
        raise HTTPException(404, "Not found")
    return doc

# ---------- Admin CMS ----------
@api.get("/admin/{coll}")
async def admin_list(coll: str, admin=Depends(get_current_admin)):
    allowed = COLLECTIONS + ["contact_enquiries", "project_enquiries", "trial_classes",
                             "applications", "newsletter", "community"]
    if coll not in allowed:
        raise HTTPException(404, "Unknown collection")
    docs = await db[coll].find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return docs

@api.post("/admin/{coll}")
async def admin_create(coll: str, body: Dict[str, Any], admin=Depends(get_current_admin)):
    if coll not in COLLECTIONS:
        raise HTTPException(404, "Unknown collection")
    doc = {"id": str(uuid.uuid4()), "created_at": now_iso(), "published": True, **body}
    await db[coll].insert_one(doc)
    doc.pop("_id", None)
    return doc

@api.put("/admin/{coll}/{item_id}")
async def admin_update(coll: str, item_id: str, body: Dict[str, Any], admin=Depends(get_current_admin)):
    if coll not in COLLECTIONS:
        raise HTTPException(404, "Unknown collection")
    body.pop("_id", None); body.pop("id", None)
    result = await db[coll].update_one({"id": item_id}, {"$set": body})
    if result.matched_count == 0:
        raise HTTPException(404, "Not found")
    return {"ok": True}

@api.delete("/admin/{coll}/{item_id}")
async def admin_delete(coll: str, item_id: str, admin=Depends(get_current_admin)):
    if coll not in COLLECTIONS:
        raise HTTPException(404, "Unknown collection")
    await db[coll].delete_one({"id": item_id})
    return {"ok": True}

# ---------- Search ----------
@api.get("/search")
async def search(q: str = Query(..., min_length=2)):
    import re
    rx = {"$regex": re.escape(q), "$options": "i"}
    results = {}
    for coll, field in [("courses","title"),("events","name"),("podcast_episodes","title"),
                        ("jobs","title"),("articles","title"),("products","name"),
                        ("portfolio_projects","name")]:
        docs = await db[coll].find({"$or": [{field: rx}, {"description": rx}], "published": True},
                                    {"_id": 0}).to_list(10)
        if docs:
            results[coll] = docs
    return results

# ---------- Seed ----------
async def seed():
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@example.com").lower()
    admin_password = os.environ.get("ADMIN_PASSWORD", "admin123")
    existing = await db.users.find_one({"email": admin_email})
    if not existing:
        await db.users.insert_one({
            "id": str(uuid.uuid4()),
            "email": admin_email,
            "password_hash": hash_password(admin_password),
            "name": "Kingsley Victor",
            "role": "admin",
            "token_version": 0,
            "created_at": now_iso(),
        })
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one({"email": admin_email},
                                  {"$set": {"password_hash": hash_password(admin_password)}})
    await db.users.create_index("email", unique=True)

    # Seed sample content if empty
    if await db.courses.count_documents({}) == 0:
        await db.courses.insert_many([
            {"id": str(uuid.uuid4()), "title": "Piano & Keyboard", "slug": "piano",
             "level": "All Levels", "duration": "Ongoing", "mode": "In-person / Online",
             "instructor": "Kingsley Victor", "price": "On enquiry",
             "description": "From your very first note to concert-level performance.",
             "published": True, "created_at": now_iso()},
            {"id": str(uuid.uuid4()), "title": "Guitar", "slug": "guitar",
             "level": "All Levels", "duration": "Ongoing", "mode": "In-person / Online",
             "instructor": "Faculty", "price": "On enquiry",
             "description": "Acoustic and electric — chords, solos, songwriting.",
             "published": True, "created_at": now_iso()},
            {"id": str(uuid.uuid4()), "title": "Violin", "slug": "violin",
             "level": "All Levels", "duration": "Ongoing", "mode": "In-person / Online",
             "instructor": "Faculty", "price": "On enquiry",
             "description": "Western classical and Indian fusion violin.",
             "published": True, "created_at": now_iso()},
            {"id": str(uuid.uuid4()), "title": "Drums & Percussion", "slug": "drums",
             "level": "All Levels", "duration": "Ongoing", "mode": "In-person",
             "instructor": "Faculty", "price": "On enquiry",
             "description": "Rock, pop, jazz and fusion drums.",
             "published": True, "created_at": now_iso()},
            {"id": str(uuid.uuid4()), "title": "Vocals", "slug": "vocals",
             "level": "All Levels", "duration": "Ongoing", "mode": "In-person / Online",
             "instructor": "Faculty", "price": "On enquiry",
             "description": "Western and Indian vocal traditions.",
             "published": True, "created_at": now_iso()},
        ])
    if await db.events.count_documents({}) == 0:
        await db.events.insert_many([
            {"id": str(uuid.uuid4()), "name": "Merkabah Live: Acoustic Sessions",
             "date": "2026-04-12", "time": "7:30 PM", "venue": "The Loft, Bengaluru",
             "location": "Electronic City", "description": "An intimate evening of acoustic performances.",
             "published": True, "upcoming": True, "created_at": now_iso()},
        ])
    if await db.articles.count_documents({}) == 0:
        await db.articles.insert_many([
            {"id": str(uuid.uuid4()), "title": "Why We Named It Merkabah",
             "slug": "why-merkabah", "category": "Culture",
             "excerpt": "On ascent, creation, discovery and transformation.",
             "content": "Merkabah is more than a name — it is a symbol of ascent and creative journey.",
             "author": "Kingsley Victor", "published": True, "created_at": now_iso()},
        ])

@app.on_event("startup")
async def on_start():
    await seed()

@app.on_event("shutdown")
async def on_stop():
    client.close()

# ---------- Root ----------
@api.get("/")
async def root():
    return {"brand": "Merkabah Creative Life", "tagline": "Beyond Imagination"}

app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[os.environ.get("FRONTEND_URL", "http://localhost:3000")],
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)
