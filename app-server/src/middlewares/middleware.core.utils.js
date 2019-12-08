export function applyMiddlewares(middlewares, app) {
  middlewares.forEach(middleware => {
    if (middleware.path && middleware.middleware) {
      app.use(middleware.path, middleware.middleware);
    } else if (middleware.path && middleware.middlewareConstructor) {
      app.use(middleware.path, middleware.middlewareConstructor());
    } else {
      app.use(middleware);
    }
  });
}
