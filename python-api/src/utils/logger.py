import logging
import os
from datetime import datetime

LOG_DIR = os.path.join(os.path.dirname(__file__), 'logs')

if not os.path.exists(LOG_DIR):
    os.makedirs(LOG_DIR)

log_filename = datetime.now().strftime("%m-%d-%Y") + ".log"

log_filepath = os.path.join(LOG_DIR, log_filename)

logging.basicConfig(
    level=logging.INFO, 
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler(log_filepath, mode='a'), 
        logging.StreamHandler() 
    ]
)

logger = logging.getLogger(__name__)

def setup_logger() -> logging.Logger:
    return logger
