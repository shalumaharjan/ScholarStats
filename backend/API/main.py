from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .auth import router
from .fetch_jobs import router as fetch_jobs_router

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(fetch_jobs_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)