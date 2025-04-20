# 1. Use a minimal Node.js base image
FROM node:18-alpine

# 2. Set the working directory
WORKDIR /app

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm install
RUN npm uninstall bcrypt
RUN npm install bcryptjs

# 4. Copy the full backend code into the container
COPY . .

# 5. Expose the port your app runs on
EXPOSE 4000

# 6. Command to run your backend server
CMD ["node", "server.js"]
