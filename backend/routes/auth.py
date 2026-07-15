from fastapi import APIRouter
from schemas.auth import LoginRequest

router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)


@router.post("/login")
def login(user: LoginRequest):

    if user.username == "admin" and user.password == "1234":
        return {
            "message": "Login Successful",
            "username": user.username
        }

    return {
        "message": "Invalid Username or Password"
    }


@router.get("/me")
def get_current_user():
    return {
        "username": "admin",
        "role": "Administrator"
    }