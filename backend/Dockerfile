# Use Python image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the backend code to the container
COPY . .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 5001
EXPOSE 5001

# Command to run the application
CMD ["python3", "main.py"]
