from fastapi import HTTPException, Response, Request
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from config.settings import settings
import hashlib

from models.user import User
from schemas.auth import UserCreate
from core.security import create_access_token, verify_access_token

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

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
def register_user(user: UserCreate, db: Session):
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
# LOGIN
# =========================
def login_user(user: UserCreate, response: Response, db: Session):
    db_user = db.query(User).filter(User.username == user.username).first()

    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"sub": db_user.username})

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        samesite="Lax",
        secure=False
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }

# =========================
# CURRENT USER
# =========================
def get_current_user(request: Request):
    token = request.cookies.get("access_token")

    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    username = verify_access_token(token)

    if not username:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    return {
        "authenticated": True,
        "username": username
    }

# =========================
# LOGOUT
# =========================
def logout_user(response: Response):
    response.delete_cookie(key="access_token")
    return {"message": "Logged out successfully"}