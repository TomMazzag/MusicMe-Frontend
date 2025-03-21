FROM node:21.5-alpine AS dev

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json package-lock.json ./

RUN npm install

# Copy project files
COPY . .

# Expose Vite's default development port
EXPOSE 5173

# Start Vite in development mode
CMD ["npm", "run", "dev", "--", "--host"]
