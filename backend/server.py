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
                             "applications", "newsletter", "community", "orders"]
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

@api.post("/orders")
async def create_order(body: Dict[str, Any]):
    doc = {"id": str(uuid.uuid4()), "order_no": f"MKB-{uuid.uuid4().hex[:8].upper()}",
           "created_at": now_iso(), "status": "Pending Payment", **body}
    await db.orders.insert_one(doc)
    doc.pop("_id", None)
    return doc

@api.get("/orders/{order_id}")
async def get_order(order_id: str):
    doc = await db.orders.find_one({"id": order_id}, {"_id": 0})
    if not doc:
        raise HTTPException(404, "Not found")
    return doc

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
             "content": "Merkabah is more than a name — it is a symbol of ascent and creative journey. It represents the movement of the creative spirit: the courage to imagine, the discipline to learn, and the joy of experiencing something larger than ourselves.\n\nWe chose this name because every person who walks into Merkabah arrives with a different door — a business to grow, an instrument to master, a story to tell, a life to pause and reset. What unites them is the same underlying motion: upward.\n\nAscend. Create. Discover. Transform. That is the journey we invite you into, and it is open to everyone — regardless of background, age or where you are starting from.",
             "author": "Kingsley Victor", "published": True, "created_at": now_iso()},
            {"id": str(uuid.uuid4()), "title": "The Ecosystem Advantage: Why Connected Creativity Wins",
             "slug": "ecosystem-advantage", "category": "Business",
             "excerpt": "Most agencies sell services. We built a journey.",
             "content": "When a brand needs a jingle, an agency usually outsources it. When they need a launch event, another vendor appears. The result is a story told in five different voices.\n\nMerkabah was designed differently. Strategy flows into branding, branding into content, content into audio, video and live experience — all under one roof, one vision, one team that knows your story from the first conversation.\n\nThis is not about convenience. It is about coherence. The brands people remember are the ones that sound, look and feel like themselves everywhere.",
             "author": "Merkabah Editorial", "published": True, "created_at": now_iso()},
            {"id": str(uuid.uuid4()), "title": "Learning Music as an Adult: What Nobody Tells You",
             "slug": "learning-music-as-adult", "category": "Music",
             "excerpt": "It is never too late to begin — and here's why.",
             "content": "The most common thing we hear at the Academy is: 'I wish I had started earlier.' The second most common thing, six months later: 'I can't believe I waited so long.'\n\nAdults bring something children cannot — taste, patience, and a reason to play. You are not learning scales to please a parent; you are learning them because a song you love lives on the other side.\n\nOur programs are built around this truth: structured enough to create real progress, flexible enough to fit a working life. The first note is the hardest. After that, momentum does the rest.",
             "author": "Academy Faculty", "published": True, "created_at": now_iso()},
        ])
    if await db.jobs.count_documents({}) == 0:
        await db.jobs.insert_many([
            {"id": str(uuid.uuid4()), "title": "Music Instructor — Piano & Keyboard",
             "department": "Academy", "employment_type": "Part-Time",
             "location": "Electronic City, Bengaluru", "work_mode": "On-site",
             "experience_level": "2+ years teaching experience",
             "description": "We are looking for a passionate Piano & Keyboard instructor to join Merkabah Academy of Music. You will teach students across beginner to advanced levels, prepare them for Trinity/ABRSM/RSL examinations, and guide them toward recital performances.",
             "responsibilities": "Conduct one-on-one and small group lessons; design lesson plans per student level; prepare students for graded exams and recitals; track and communicate student progress.",
             "requirements": "Strong command of piano technique and repertoire; experience with graded exam syllabi (Trinity/ABRSM/RSL preferred); excellent communication with students and parents.",
             "offer": "A growing academy with a genuine creative culture, performance opportunities for students, flexible scheduling, and the chance to shape a music program from the ground up.",
             "published": True, "created_at": now_iso()},
            {"id": str(uuid.uuid4()), "title": "Social Media & Content Executive",
             "department": "Creative Agency", "employment_type": "Full-Time",
             "location": "Bengaluru", "work_mode": "Hybrid",
             "experience_level": "1-3 years",
             "description": "Join Merkabah Creative Agency as the voice behind our clients' digital presence. You will plan, create and manage content across social platforms, working closely with strategy, design and production teams.",
             "responsibilities": "Own monthly content calendars; write captions, scripts and campaign copy; coordinate shoots and asset production; track performance and iterate.",
             "requirements": "Strong writing skills; understanding of Instagram, LinkedIn and YouTube ecosystems; basic design sense; comfort with fast-moving creative environments.",
             "offer": "Direct exposure to the full creative pipeline — from brand strategy to studio production to live events. Real portfolio work from day one.",
             "published": True, "created_at": now_iso()},
        ])
    if await db.podcast_episodes.count_documents({}) == 0:
        await db.podcast_episodes.insert_many([
            {"id": str(uuid.uuid4()), "episode_number": 1,
             "title": "The Beginning: Why We Built an Ecosystem, Not an Agency",
             "guest": "Kingsley Victor",
             "description": "In our very first episode, founder Kingsley Victor shares the story behind Merkabah — from radio studios and recording rooms to a vision of a connected creative life. What does it take to build something that serves business, art, education and wellbeing at once?",
             "notes": "Recorded at Merkabah Studios. In this episode: the early radio years, the shift to sound engineering and music production, and why 'Beyond Imagination' became more than a tagline.",
             "publish_date": "2026-03-01", "published": True, "created_at": now_iso()},
            {"id": str(uuid.uuid4()), "episode_number": 2,
             "title": "Creativity as a Daily Practice",
             "guest": "Merkabah Team",
             "description": "Creativity is not a lightning strike — it is a habit. A conversation about the small rituals that keep artists, musicians and makers moving forward when inspiration runs dry.",
             "notes": "Topics: morning pages, the discipline of showing up, why constraints breed originality, and how learning an instrument rewires creative thinking.",
             "publish_date": "2026-03-15", "published": True, "created_at": now_iso()},
        ])
    if await db.products.count_documents({}) == 0:
        await db.products.insert_many([
            {"id": str(uuid.uuid4()), "name": "Merkabah Signature Tee",
             "category": "Merchandise", "price": 999, "discount_price": 799,
             "description": "Premium cotton tee with the 'Beyond Imagination' mark. Minimal, heavyweight, made to be lived in.",
             "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
             "in_stock": True, "published": True, "created_at": now_iso()},
            {"id": str(uuid.uuid4()), "name": "Music Theory Foundations — Workbook",
             "category": "Learning Materials", "price": 499,
             "description": "The Academy's companion workbook: notation, rhythm, scales and chord construction with guided exercises used in our classrooms.",
             "image": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
             "in_stock": True, "published": True, "created_at": now_iso()},
            {"id": str(uuid.uuid4()), "name": "Merkabah Live: Acoustic Sessions — Ticket",
             "category": "Workshops / Tickets", "price": 299,
             "description": "Entry to our intimate acoustic evening at The Loft, Electronic City. Limited seating.",
             "image": "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
             "in_stock": True, "published": True, "created_at": now_iso()},
        ])
    if await db.portfolio_projects.count_documents({}) == 0:
        await db.portfolio_projects.insert_many([
            {"id": str(uuid.uuid4()), "name": "Brand Identity — Café Launch",
             "client": "Confidential", "industry": "Restaurants & Hospitality",
             "services": ["Logo Design", "Brand Identity", "Social Media Creatives"],
             "description": "Complete brand identity for a new café — from naming support and logo to menus, signage and launch-day social content.",
             "challenge": "Enter a crowded F&B market with a distinct visual voice on a startup budget.",
             "strategy": "Build the identity around warmth and ritual — hand-drawn textures, an earthy palette, and photography that feels like a Sunday morning.",
             "execution": "Logo suite, packaging, menu system, social templates and a launch content series produced by Merkabah Studios.",
             "results": "Identity and launch campaign delivered end-to-end by one team, in one timeline.",
             "published": True, "created_at": now_iso()},
            {"id": str(uuid.uuid4()), "name": "Brand Anthem — Corporate Film Score",
             "client": "Confidential", "industry": "Corporate",
             "services": ["Music Composition", "Music Arrangement", "Mixing & Mastering"],
             "description": "Original brand anthem and score for a corporate film — composed, arranged and mastered at Merkabah Studios.",
             "challenge": "Translate a company's values into a 90-second musical identity that works across film, events and hold music.",
             "strategy": "A memorable melodic motif built on piano and strings, with modular stems for different durations and moods.",
             "execution": "Composition, live tracking, orchestration, mixing and mastering — all in-house.",
             "results": "A flexible musical identity the client now uses across every touchpoint.",
             "published": True, "created_at": now_iso()},
        ])

    if await db.studios_projects.count_documents({}) == 0:
        await db.studios_projects.insert_many([
            {"id": str(uuid.uuid4()), "name": "Brand Anthem — Studio Session",
             "category": "Music Production",
             "description": "Original brand anthem composed, arranged and mastered in-house — modular stems for film, events and digital.",
             "published": True, "created_at": now_iso()},
            {"id": str(uuid.uuid4()), "name": "Podcast Season — Full Production",
             "category": "Podcast Production",
             "description": "End-to-end podcast production: recording, editing, sound design, mixing and mastering for a full season.",
             "published": True, "created_at": now_iso()},
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
