// This file is responsible for loading the appropriate configuration file
// and extending it with the environment option.
import { logging } from "./services.core.logging";

export const ENV = {
  PRODUCTION: "production",
  DEVELOPMENT: "development"
};

const getEnv = () => {
  const env = process.env.NODE_ENV || ENV.DEVELOPMENT;

  return env === ENV.PRODUCTION ? ENV.PRODUCTION : ENV.DEVELOPMENT;
};

const getConfig = () => {
  const env = getEnv();
  const configPath = `../../../config/${env}.json`;
  const config = require(configPath); // eslint-disable-line

  logging.info(`[ Config ] Using env "${env}"`);
  logging.info(`[ Config ] Loaded configuration: "${configPath}"`);

  return {
    ...config,
    env
  };
};

export const config = getConfig();
