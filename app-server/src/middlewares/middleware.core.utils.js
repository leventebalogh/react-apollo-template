export function applyMiddlewares(middlewares, app) {
  middlewares.forEach(middleware => {
    if (middleware.path && middleware.middleware) {
      app.use(middleware.path, middleware.middleware);
    } else if (middleware.path && middleware.middlewareGetter) {
      app.use(middleware.path, middleware.middlewareGetter());
    } else {
      app.use(middleware);
    }
  });
}
