/* eslint-disable no-console */
const info = (msg, ...props) => {
  console.log(`INFO: ${msg}`, ...props);
};

const warn = (msg, ...props) => {
  console.log(`WARN: ${msg}`, ...props);
};

const error = (msg, ...props) => {
  console.log(`ERROR: ${msg}`, ...props);
};

export const logging = {
  info,
  warn,
  error
};
