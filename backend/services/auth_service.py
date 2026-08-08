from fastapi import HTTPException, Response, Request
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from models.user import User
from schemas.auth import UserCreate
from core.security import create_access_token, verify_access_token

# =========================
# PASSWORD CONFIG
# =========================

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# =========================
# PASSWORD HELPERS
# =========================

def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, hashed: str) -> bool:
    try:
        return pwd_context.verify(password, hashed)
    except Exception:
        return False


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

    return {"message": "User created successfully"}


# =========================
# LOGIN
# =========================

def login_user(user: UserCreate, response: Response, db: Session):
    db_user = db.query(User).filter(User.username == user.username).first()

    if not db_user:
        raise HTTPException(status_code=400, detail="User not found")

    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"sub": db_user.username})

    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        samesite="Lax",
        secure=False  # change to True in production (HTTPS)
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }


# =========================
# LOGOUT
# =========================

def logout_user(response: Response):
    response.delete_cookie(key="access_token")
    return {"message": "Logged out successfully"}