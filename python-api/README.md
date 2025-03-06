This is a FastAPI

Link:
`
https://www.youtube.com/watch?v=f3CyAmelnEY&list=PLqAmigZvYxIL9dnYeZEhMoHcoP4zop8-p&index=3
`

For Installation:
`
pip install -r requirements.txt
`

To run, go to cd python-api then run:
`
uvicorn src.main:app --reload --port=5000 (if you want to have port number)
uvicorn src.main:app --host=0.0.0.0 --port=8000
`

To export libraries
`
pip freeze > requirements.txt
`

- KANBAN -

**TO-DO:**
1. Integrate the registration from the nextjs using fetchapi to fastapi
2. Create User Role Management

DONE:

1. Add Logger, and also can store internally using log file
2. Add Authorization Key
3. Add Bcrpyt for Password
4. CRUD Operation
5. Display list of users

