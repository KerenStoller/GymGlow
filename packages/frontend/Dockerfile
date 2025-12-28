# Stage 1: Build from Node.js
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package.json .
# We might need pnpm-lock.yaml if it exists, but user has pnpm-workspace.yaml in root.
# For a standalone build in a monorepo, it's tricky.
# Let's assume we can install dependencies locally for this package.
# Since it's a monorepo, we might need to copy the root workspace file too if we were running from root context.
# But here we are building from packages/frontend context usually.
# Let's try a simple npm install/pnpm install.

# install pnpm
RUN npm install -g pnpm
COPY package.json .
# COPY pnpm-lock.yaml . 

# download dependencies
RUN pnpm install

# copy project files
COPY . .

# build the project
RUN pnpm build

# Stage 2: Serve with Nginx (super fast web server)
FROM nginx:alpine

# copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# start the web server (daemon off to make it run in foreground)
CMD ["nginx", "-g", "daemon off;"]
