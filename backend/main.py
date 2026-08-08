from fastapi import FastAPI

from routes import (
    auth,
    student_files,
    fetch_jobs,
    result,
    dashboard,
    charts
)

app = FastAPI(
    title="ScholarStats API"
)

app.include_router(auth.router)
app.include_router(student_files.router)
app.include_router(fetch_jobs.router)
app.include_router(result.router)
app.include_router(dashboard.router)
app.include_router(charts.router)


@app.get("/")
def root():
    return {
        "message": "ScholarStats API is running"
    }