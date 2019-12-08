import express from "express";
import { logging, config } from "./services";

import {
  getApolloMiddleware,
  getParcelMiddleware,
  getStaticMiddleware,
  getStaticClientBuildMiddleware,
  getSSRMiddleware,
  applyMiddlewares,
  getLoggerMiddleware
} from "./middlewares";

const app = express();
const { port, env } = config;

// This is where you configure which middlewares you would like
// to use in a certain environment. Currently there are only
// 2 supported environments, development and productions, you can
// choose between them by using NODE_ENV=development|production
const middlewares = {
  development: [
    getApolloMiddleware(),
    { path: "/static", middleware: getStaticMiddleware() },
    { path: "/", middlewareConstructor: getParcelMiddleware }
  ],
  production: [
    getApolloMiddleware(),
    { path: "/static", middleware: getStaticMiddleware() },
    { path: "/", middleware: getStaticClientBuildMiddleware() },
    getLoggerMiddleware("LOG 1"),
    getSSRMiddleware()
  ]
};
const envSpecificMiddlewares = middlewares[env] || middlewares.development;

applyMiddlewares(envSpecificMiddlewares, app);
app.listen({ port }, () =>
  logging.info(`[ Express ] 🚀 Server ready at http://localhost:${port}!`)
);
