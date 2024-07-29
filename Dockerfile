FROM node:14 AS dev-build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run dev
RUN npm run build

#  In the second stage, we are creating a new, clean image and only copying the dist directory 
# from the first stage:
# Use an official lightweight Node.js runtime as a base image for the production build
FROM node:14-alpine AS production
WORKDIR /app
RUN npm install -g serve
COPY --from=0 /app/dist .
EXPOSE 5000

# Run the application when the Docker container starts
CMD ["serve", "-s", ".", "-l", "5000"]