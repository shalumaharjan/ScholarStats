from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from config.settings import settings
from fastapi import Header, HTTPException



def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def verify_access_token(token: str):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise JWTError()
        return username
    except JWTError:
        return None

# for protected login

def get_current_user(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="No token")

    token = authorization.split(" ", 1)[1]
    username = verify_access_token(token)

    if username is None:
        raise HTTPException(status_code=401, detail="Invalid token")

    return username