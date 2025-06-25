# 1. Use official Node.js LTS image (slim variant for smaller size)
FROM node:18-alpine

# 2. Create & set working directory
WORKDIR /usr/src/app

# 3. Copy application code
COPY . .

# 4. Expose the port your Express app listens on
EXPOSE 3000

# 5. Define default startup command
CMD ["node", "server.js"]
