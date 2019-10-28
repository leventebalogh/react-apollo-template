import express from "express";
import { logging, config } from "./services";

import {
  getApolloMiddleware,
  getParcelMiddleware,
  getStaticMiddleware,
  getSSRMiddleware,
  applyMiddlewares,
  getLoggerMiddleware
} from "./middlewares";

const app = express();
const { port, env } = config;

const middlewares = {
  development: [
    getApolloMiddleware(),
    { path: "/", middlewareGetter: getParcelMiddleware }
  ],
  production: [
    getApolloMiddleware(),
    { path: "/", middleware: getStaticMiddleware() },
    getLoggerMiddleware("LOG 1"),
    getSSRMiddleware()
  ]
};
const envSpecificMiddlewares = middlewares[env] || middlewares.development;

applyMiddlewares(envSpecificMiddlewares, app);
app.listen({ port }, () =>
  logging.info(`[ Express ] 🚀 Server ready at http://localhost:${port}!`)
);
