from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError

SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=60)
    to_encode.update({
        "exp": expire
    })
    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

def verify_access_token(token: str):
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        username = payload.get("sub")
        if username is None:
            raise JWTError()

        return username
    except JWTError:

        return None