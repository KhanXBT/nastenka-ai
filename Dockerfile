FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build the project (if needed, but we run with ts-node/esm here)
# For production, we would normally build to dist/
RUN npm run build

# Set production environment
ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

# Run the API
CMD ["npm", "run", "start:api"]
