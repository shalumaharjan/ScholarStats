from database.connection import engine, Base
import models.user   # 👈 VERY IMPORTANT (use this, not from ... import)

def init_db():
    print("Tables detected:", Base.metadata.tables.keys())  # 👈 DEBUG

    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Done.")

if __name__ == "__main__":
    init_db()