// This file is responsible for loading the appropriate configuration file
// and extending it with the environment option.
import { logging } from "./services.core.logging";

export const ENV = {
  PRODUCTION: "production",
  DEVELOPMENT: "development",
};

const getEnv = () => {
  const env = process.env.NODE_ENV || ENV.DEVELOPMENT;

  return env === ENV.PRODUCTION ? ENV.PRODUCTION : ENV.DEVELOPMENT;
};

// Reads the environment configuration files from the config/server folder
// and merges it with the default configuration.
const getConfig = () => {
  const env = getEnv();
  const defaultConfigPath = `../../../config/server/default.json`;
  const configPath = `../../../config/server/${env}.json`;
  const defaultConfig = require(defaultConfigPath); // eslint-disable-line
  const config = require(configPath); // eslint-disable-line

  logging.info(`[ Config ] Using env "${env}"`);
  logging.info(`[ Config ] Loaded configuration: "${configPath}"`);

  return {
    ...defaultConfig,
    ...config,
    env,
  };
};

export const config = getConfig();
