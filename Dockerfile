FROM mhart/alpine-node:10

# Working directory
RUN mkdir -p /var/www
WORKDIR /var/www

# Copy everything
COPY . .

# Install dependencies
RUN yarn install --production

# Build client
RUN yarn build

EXPOSE 8080

# Start Server
CMD yarn prod