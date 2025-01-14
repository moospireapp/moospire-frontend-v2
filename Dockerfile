# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Set environment argument
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Install dependencies in the container
RUN if [ "$NODE_ENV" = "development" ]; then \
      npm install; \
    else \
      npm install --include=dev && npm install pm2 -g; \
    fi

# Install TypeScript globally (ensures `tsc` is available)
RUN npm install -g typescript

# Copy the rest of the app's code
COPY . .

# Build the Next.js application in production mode
RUN if [ "$NODE_ENV" = "production" ]; then \
      npm run build; \
    fi

# Expose the port your app runs on
EXPOSE 3000

# Set the default command foR developmnt
CMD ["npm", "run", "dev"]