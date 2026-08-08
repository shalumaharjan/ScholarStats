from fastapi import APIRouter, Depends, Response, Request
from sqlalchemy.orm import Session

from database.db import get_db
from schemas.auth import UserCreate
from services import auth_service
from core.security import get_current_user  # ✅ keep this

router = APIRouter()

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    return auth_service.register_user(user, db)

@router.post("/login")
def login(user: UserCreate, response: Response, db: Session = Depends(get_db)):
    return auth_service.login_user(user, response, db)


@router.post("/logout")
def logout(response: Response):
    return auth_service.logout_user(response)

# ✅ Protected route
@router.get("/me")
def get_me(current_user = Depends(get_current_user)):
    return {"username": current_user}