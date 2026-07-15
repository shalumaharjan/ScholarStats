from fastapi import FastAPI
from routes import auth, student_files, fetch_jobs, analysis, dashboard

app = FastAPI(title="ScholarStats API")

app.include_router(auth.router)
app.include_router(student_files.router)
app.include_router(fetch_jobs.router)
app.include_router(analysis.router)
app.include_router(dashboard.router)

@app.get("/")
def home():
    return {"message": "Welcome to ScholarStats API"}