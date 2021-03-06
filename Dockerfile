# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:7.8.0

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn

# Install and configure `serve`.
RUN npm install -g express
RUN npm install -g babel-cli
RUN npm install -g babel-preset-es2015
RUN npm install -g babel-preset-stage-2
CMD  babel-node server.js --presets es2015,stage-2
EXPOSE 3000

# Install all dependencies of the current project.
COPY package.json package.json

RUN npm install

# Copy all local files into the image.
COPY . .

# Build for production.
RUN npm run build --production