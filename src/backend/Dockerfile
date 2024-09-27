FROM python:3.9-slim

# Set the working directory to /app
WORKDIR /app

# Copy the requirements.txt file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose port 8000 for the Django application
EXPOSE 8000

# Use Gunicorn to run the Django application
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "apartment_finder.wsgi:application"]

# Human Tasks:
# TODO: Ensure that all required Python packages are listed in the requirements.txt file
# TODO: Verify that the Gunicorn configuration is appropriate for the expected load
# TODO: Consider adding health check and/or startup probe commands