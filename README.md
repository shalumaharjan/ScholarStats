# ScholarStats — Backend

Academic Result Analyzer — FastAPI backend with MySQL database and JWT-based authentication.

## Tech Stack

- **Framework:** FastAPI
- **Database:** MySQL
- **Auth:** JWT (Bearer token)
- **Password hashing:** bcrypt (via passlib)

## Setup

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd ScholarStats/backend
```

### 2. Create and activate a virtual environment

```bash
python -m venv venv
```

Windows:
```bash
venv\Scripts\activate
```

macOS/Linux:
```bash
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Set up environment variables

Create a `.env` file in the `backend/` folder (this is git-ignored, never commit it):

```env
DATABASE_URL=mysql+pymysql://<user>:<password>@localhost/scholarstats
SECRET_KEY=<your-secret-key>
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

### 5. Create the database tables

```bash
python -m database.init_db
```

## Running the server

```bash
uvicorn main:app --reload
```

The API will be available at:

```
http://127.0.0.1:8000
```

Interactive API docs (Swagger UI):

```
http://127.0.0.1:8000/docs
```

## Authentication Flow

1. Register a user via `POST /register`
2. Log in via `POST /login` → receive an `access_token`
3. Send that token as `Authorization: Bearer <access_token>` on protected routes like `GET /me`
4. Token is **not** stored server-side — the frontend is responsible for storing it (e.g. `localStorage`) and attaching it to every authenticated request.

## Endpoints

### `POST /register`

Creates a new user account.

**Request body**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Success response — `200 OK`**
```json
{
  "message": "User created successfully"
}
```

**Error response — `400 Bad Request`**
```json
{
  "detail": "User already exists"
}
```

---

### `POST /login`

Authenticates a user and returns a JWT.

**Request body**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Success response — `200 OK`**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Error response — `400 Bad Request`**
```json
{
  "detail": "Invalid credentials"
}
```

---

### `GET /me`

Returns the currently authenticated user. Requires a valid token.

**Headers**
```
Authorization: Bearer <access_token>
```

**Success response — `200 OK`**
```json
{
  "username": "admin"
}
```

**Error response — `401 Unauthorized`**
```json
{
  "detail": "No token"
}
```

---

### `POST /logout`

Client-side logout (deletes the stored token). No request body required.

**Success response — `200 OK`**
```json
{
  "message": "Logged out successfully"
}
```

## Frontend Integration Notes

- Base URL for all requests: `http://127.0.0.1:8000`
- Store `access_token` from `/login` in `localStorage` (or in-memory state).
- Attach it as `Authorization: Bearer <token>` on every request to protected routes.
- CORS is configured to allow requests from the frontend dev server — confirm the allowed origin in `main.py` matches your local dev URL.

## Project Structure

```
backend/
├── main.py                  # FastAPI app entrypoint, CORS config, router registration
├── requirements.txt
├── .env                      # secrets — not committed
│
├── config/
│   └── settings.py           # reads .env, exposes settings object
│
├── core/
│   └── security.py           # JWT create/verify, get_current_user dependency
│
├── database/
│   ├── db.py                 # engine, SessionLocal, Base, get_db dependency
│   └── init_db.py            # creates tables (run once during setup)
│
├── models/
│   └── user.py                # SQLAlchemy ORM models
│
├── schemas/
│   └── auth.py                # Pydantic request/response models
│
├── services/
│   └── auth_service.py        # register/login/logout business logic
│
└── routes/
    └── auth.py                 # route definitions
```