from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # 🔐 Security
    SECRET_KEY: str = "supersecretkey"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # 🗄️ Database
    DATABASE_URL: str = "mysql+pymysql://root:root@localhost:3306/scholarstats"

    # 🌐 Scraper
    LOGIN_URL: str = "https://exam.pu.edu.np:9094/"
    TIMEOUT: int = 1
    HEADLESS: bool = False

    class Config:
        env_file = ".env"


settings = Settings()