from typing import Optional
from fastapi import HTTPException, Header
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv(dotenv_path='.env.local')

def valid_auth_token(x_auth_token: Optional[str] = Header(None)) -> bool:
    if x_auth_token !=  os.getenv("X_AUTH_API_KEY"):
        raise HTTPException(status_code=403, detail="Access Denied")
    return True