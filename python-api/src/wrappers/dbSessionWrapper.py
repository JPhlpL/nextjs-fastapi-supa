import functools
import time
from typing import Callable, Any
from sqlalchemy.exc import OperationalError
from tenacity import retry, stop_after_attempt, wait_fixed, retry_if_exception
from src.database.config import create_session_local

def is_ssl_connection_error(exception: BaseException) -> bool:
    """
    Detects if the exception is caused by an SSL connection error.
    """
    return isinstance(
        exception, OperationalError
    ) and "SSL connection has been closed unexpectedly" in str(exception)

def with_db_session(func: Callable[..., Any]) -> Callable[..., Any]:
    """
    A decorator that manages database sessions and retries in case of SSL connection errors.
    """
    @functools.wraps(func)
    @retry(
        stop=stop_after_attempt(5),  # Retry 5 times before giving up
        wait=wait_fixed(2),  # Wait 2 seconds between retries
        retry=retry_if_exception(is_ssl_connection_error),  # Retry if it's an SSL connection error
        reraise=True,  # Reraise the last exception if all retry attempts fail
        before_sleep=lambda retry_state: print(
            f"SSL connection closed unexpectedly. Retrying in 2 seconds. "
            f"Attempt {retry_state.attempt_number}/5"
        ),
    )
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        """
        Manages the database session and applies retry logic in case of SSL connection errors.
        """
        db_session = create_session_local()  # Create a new session
        start_time = time.perf_counter()  # Start the timer for logging the duration
        try:
            result = func(*args, **kwargs, scoped_db=db_session)  # Call the decorated function with a session
            return result  # Return the result if successful
        except OperationalError as e:
            if is_ssl_connection_error(e):
                print(f"SSL connection error occurred: {str(e)}")
                raise  # Reraise to trigger retry
            else:
                print(f"Operational error in {func.__name__}: {str(e)}")
                db_session.rollback()  # Rollback on non-SSL related OperationalError
                raise
        except Exception as e:
            print(f"Error in {func.__name__}: {str(e)}")
            db_session.rollback()  # Rollback on any other exceptions
            raise
        finally:
            end_time = time.perf_counter()  # Stop the timer for logging the duration
            duration = end_time - start_time  # Calculate how long the function took to run
            print(f"Function {func.__name__} execution took {duration:.4f} seconds")
            db_session.close()  # Close the session

    return wrapper
