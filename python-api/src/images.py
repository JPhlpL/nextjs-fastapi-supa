from modal import Image

# Define an image for your API.
api_image = (
    Image.debian_slim(python_version="3.11")
    .pip_install(
        "aiohttp==3.10.8",
        "boto3==1.35.17",
        "fastapi==0.115.0",
        "logfire==3.7.1",
        "opentelemetry-instrumentation-fastapi==0.51b0",
        "pandas==2.2.2",
        "psycopg2-binary==2.9.7",
        "pydantic==2.9.2",
        "python-dotenv==1.0.1",
        "pytz==2024.1",
        "SQLAlchemy==2.0.35",
        "tenacity==9.0.0"
    )  # add more dependencies as needed
)
