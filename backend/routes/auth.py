from fastapi import APIRouter, Depends, Response, Request
from sqlalchemy.orm import Session

from database.db import get_db
from schemas.auth import UserCreate
from services import auth_service   # ✅ correct import

router = APIRouter()

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    return auth_service.register_user(user, db)

@router.post("/login")
def login(user: UserCreate, response: Response, db: Session = Depends(get_db)):
    return auth_service.login_user(user, response, db)

@router.get("/auth/me")
def get_current_user(request: Request):
    return auth_service.get_current_user(request)

@router.post("/logout")
def logout(response: Response):
    return auth_service.logout_user(response)