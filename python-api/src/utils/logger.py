import logging
import os
from datetime import datetime
import logfire
from logfire.integrations.logging import LogfireLoggingHandler
from fastapi import FastAPI

# User ID filter to inject contextual information into logs
class UserIDFilter(logging.Filter):
    def filter(self, record: logging.LogRecord) -> bool:
        record.user_id = getattr(record, "user_id", "N/A")
        return True

# Function to set up the logger
def setup_logger() -> logging.Logger:
    logger = logging.getLogger(__name__)
    if logger.handlers:  # If handlers already exist, skip reconfiguration.
        return logger

    # Create logs directory if it doesn't exist
    LOG_DIR = os.path.join(os.path.dirname(__file__), 'logs')
    if not os.path.exists(LOG_DIR):
        os.makedirs(LOG_DIR)

    log_filename = datetime.now().strftime("%m-%d-%Y") + ".log"
    log_filepath = os.path.join(LOG_DIR, log_filename)

    logging.basicConfig(
        level=logging.INFO, 
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s - User ID: %(user_id)s",
        handlers=[
            logging.FileHandler(log_filepath, mode='a'), 
            logging.StreamHandler()
        ]
    )

    # Optionally, set a custom logger class if needed.
    class CustomLogger(logging.Logger):
        def __init__(self, name: str, level: int = logging.NOTSET) -> None:
            super().__init__(name, level)

    logging.setLoggerClass(CustomLogger)
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.INFO)

    # Add User ID filter
    user_id_filter = UserIDFilter()
    logger.addFilter(user_id_filter)

    # Add LogfireLoggingHandler if not already added
    if not any(isinstance(handler, LogfireLoggingHandler) for handler in logger.handlers):
        logfire_handler = LogfireLoggingHandler()
        logfire_handler.setLevel(logging.INFO)
        logfire_format = logging.Formatter(
            "%(asctime)s - %(name)s - %(levelname)s - %(message)s - User ID: %(user_id)s"
        )
        logfire_handler.setFormatter(logfire_format)
        logger.addHandler(logfire_handler)

    return logger

# Function to set up Logfire integration with FastAPI
def setup_logfire(app: FastAPI) -> None:
    logfire_taja_token = os.environ["LOGFIRE_TOKEN"]
    logfire.configure(token=logfire_taja_token)
    logfire.instrument_fastapi(app)

# Call the setup_logging function to initialize logging
logger = setup_logger()