#use node
FROM node:16

# Set working Directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
RUN npm install

COPY . .

# Expose port 5000
EXPOSE 5000

# Start the app
CMD ["node", "index.js"]