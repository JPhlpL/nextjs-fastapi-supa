from modal import App, asgi_app, Secret
import os
from src.defaults import (
    API_STUB_NAME,
    MODAL_PRODUCTION_ENVIRONMENT,
    MODAL_DEVELOPMENT_ENVIRONMENT,
    SECRETS_NAME
)
from src.images import api_image

MODAL_ENVIRONMENT = os.environ.get("MODAL_ENVIRONMENT")
is_production = MODAL_ENVIRONMENT == MODAL_PRODUCTION_ENVIRONMENT

secrets_env = (
    MODAL_PRODUCTION_ENVIRONMENT if is_production else MODAL_DEVELOPMENT_ENVIRONMENT
)


app = App(name=API_STUB_NAME)


# Wrap your FastAPI app in a Modal function.
@app.function( # type: ignore
    image=api_image,
    secrets=[Secret.from_name(SECRETS_NAME, environment_name=secrets_env)],
    cloud="auto",  # aws, gcp, oci, auto
    allow_concurrent_inputs=1000,
    region=("us-east"), #ap-southeast
    timeout=60 * 60,  # set an appropriate timeout (here, 1 hour)
)
@asgi_app()
def fastapi_app():
    from src.api import web_app
    from src.utils.logger import setup_logger

    logger = setup_logger()
    logger.info(
        f"FastAPI app started in region {os.environ['MODAL_REGION']} with cloud provider {os.environ['MODAL_CLOUD_PROVIDER']} with image id {os.environ['MODAL_IMAGE_ID']}"
    )

    return web_app

# local entrypoints for testing
@app.local_entrypoint() 
def main() -> None:

    return None
