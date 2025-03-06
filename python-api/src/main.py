from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers import (
    users, 
    roles
) # Import the user router from the router directory

# Initialize FastAPI and call it 'app'
app = FastAPI()

# Allow CORS for specific origins
origins = [
    "http://localhost:3000",  # Your frontend URL
    "http://10.73.130.177:3000",  # Your frontend URL
    "http://10.74.12.26:3000",  # Your frontend URL
    "http://172.24.68.121:3000"  # Your frontend URL
    # Add other origins as needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows specific origins
    # allow_origins=origins,  # Allows specific origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Include the user router
app.include_router(users.router)
app.include_router(roles.router)

# TODO: Add Router for Roles and make an enum for role (User, Admin, Super Admin)
