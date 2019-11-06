# ⚡️ React - Apollo Template

This repository serves as a template for creating React - Apollo projects quickly.
It includes both the client-side and server-side setup including server-side rendering.

## Features
- Project: **Yarn workspaces** for easier development
- Project: **Linting (ESLint)** set up and added to pre-commit hooks
- Project: **Testing (JEST)** set up and added to pre-commit hooks
- Project: **Auto-updating NPM dependencies** with one command (updtr)
- Server: **Express** set up for the server
- Server: **Apollo-Server** set up and integrated with examples 
- Server: **Parcel** middleware set up 
- Server: **Dockerized** self-contained service for easier deployment 
- Client: **React** set up (latest)
- Client: **Routing** set up with examples
- Client: **Apollo (GraphQL)** set up with examples
- Client: **Hot-reloading** with Parcel
- Client: **Hashed bundles** for easier caching in production

## Install
```bash
# Installs dependencies from the project root
$ yarn 
```

## Development
```bash
# ⚠️ RUN FROM THE REPO ROOT
# Runs the server & client in development mode.
# Will update the client-code with hot-module-reloading on any change. (Parcel)
# Will restart the server on any change. (Nodemon)
# Your app will be visible on http://localhost:8080
$ yarn dev


# ⚠️ RUN FROM THE REPO ROOT / APP FOLDER (app-client|app-server)
# Runs Jest
$ yarn test


# ⚠️ RUN FROM THE REPO ROOT / APP FOLDER (app-client|app-server)
# Runs ESLint and automatically fixes auto-fixable problems 
$ yarn lint


# ⚠️ RUN FROM THE REPO ROOT
# Updates the dependencies automatically and reverts if there are any collisions
$ yarn update-dependencies
```


## Production
```bash
# ⚠️ RUN FROM THE REPO ROOT
# Runs the app as a docker container. Currently exposes port 8080.
$ docker-compose up --build


# ⚠️ RUN FROM THE REPO ROOT
# Builds both the client and the server (both outputs go into a "build" directory)
$ yarn build


# ⚠️ RUN FROM THE REPO ROOT
# Runs the production version of the app (will use Server Side Rendering) 
$ yarn prod
```
