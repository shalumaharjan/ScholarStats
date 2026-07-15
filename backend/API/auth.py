from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from passlib.context import CryptContext
import hashlib

from .database import SessionLocal
from .models import User
from .schemas import UserCreate

# ✅ Import JWT function from separate file
from .jwt_handler import create_access_token

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# =========================
# DB dependency
# =========================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# =========================
# PASSWORD HELPERS
# =========================
def _prehash(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def hash_password(password: str) -> str:
    return pwd_context.hash(_prehash(password))

def verify_password(password: str, hashed: str) -> bool:
    return pwd_context.verify(_prehash(password), hashed)

# =========================
# REGISTER
# =========================
@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.username == user.username).first()
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    new_user = User(
        username=user.username,
        hashed_password=hash_password(user.password),
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created"}

# =========================
# LOGIN (JWT + COOKIE)
# =========================
@router.post("/login")
def login(user: UserCreate, response: Response, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()

    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    # ✅ Create JWT token
    token = create_access_token({"sub": db_user.username})

    # ✅ Store in cookie
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        samesite="Lax",
        secure=False  # change to True in production (HTTPS)
    )

    # ✅ ALSO return token (useful for frontend)
    return {
        "access_token": token,
        "token_type": "bearer"
    }