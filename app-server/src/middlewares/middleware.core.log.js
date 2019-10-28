export const getLoggerMiddleware = (name = "LOG") => (req, res, next) => {
  const data = {
    url: req.url
  };

  // eslint-disable-next-line
  console.log(`[ ${name} ]`, data);

  next();
};
