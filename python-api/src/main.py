from modal import App, asgi_app, Secret
import os
from src.defaults import (
    API_STUB_NAME,
    MODAL_PRODUCTION_ENVIRONMENT,
    MODAL_DEVELOPMENT_ENVIRONMENT,
    SECRETS_NAME
)
from src.images import api_image  # import the API image from images.py

MODAL_ENVIRONMENT = os.environ.get("MODAL_ENVIRONMENT")
is_production = MODAL_ENVIRONMENT == MODAL_PRODUCTION_ENVIRONMENT
# For local, we still point to development secrets so we don't need to manage specific secrets
secrets_env = (
    MODAL_PRODUCTION_ENVIRONMENT if is_production else MODAL_DEVELOPMENT_ENVIRONMENT
)

# Create a Modal App instance.
app = App(name=API_STUB_NAME)  # type: ignore

# Wrap your FastAPI app in a Modal function.
@app.function(
    image=api_image,
    secrets=[Secret.from_name(SECRETS_NAME, environment_name=secrets_env)],
    # cloud="oci",  # aws, gcp, oci, auto. We choose oci for better latency with db, as we
    # allow_concurrent_inputs=1000,
    # region=("us-east"),
    # timeout=60 * 60,  # set an appropriate timeout (here, 1 hour)
)
@asgi_app()
def fastapi_app():
    from src.api import web_app
    from src.utils.logger import setup_logger

    logger = setup_logger()
    logger.info(
        f"FastAPI app started"
    )

    return web_app

# local entrypoints for testing
@app.local_entrypoint()  # type: ignore
def main() -> None:

    return None
