from fastapi import FastAPI
from routes.fetch_routes import router as fetch_router
from fastapi.middleware.cors import CORSMiddleware

from database.db import Base, engine
from routes.auth import router as auth_router
from routes.fetch_jobs import router as fetch_jobs_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Routers
app.include_router(auth_router)
app.include_router(fetch_jobs_router)
app.include_router(fetch_router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)