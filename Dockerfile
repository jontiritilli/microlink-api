FROM node:14 as base

# Create and change to the app directory.
WORKDIR /usr/node/app

# Copy application dependency manifests to the container image.
# Also copying yarn.lock to use the --frozen-lockfile flag, and .npmrc to install private packages.
COPY package.json ./
COPY yarn.lock ./

# Install production dependencies.
RUN yarn install --production --frozen-lockfile

# Copy local code to the container image.
COPY . .

ENV NODE_PATH=./build

RUN yarn build

# Run the web service on container startup.
CMD [ "yarn", "start" ]