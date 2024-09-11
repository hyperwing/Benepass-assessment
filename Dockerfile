# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the backend code
COPY backend/ ./backend/

# Install backend dependencies
RUN cd backend && npm install

# Install nodemon globally
RUN npm install -g nodemon

# Copy the frontend code
COPY frontend/ ./frontend/

# Install frontend dependencies and build the frontend
RUN cd frontend && npm install && npm run build

# Expose the backend port
EXPOSE 3001

# Start the backend server with nodemon
CMD ["nodemon", "backend/server.js"]
