import { pathOr } from "ramda";
import configuration from "../../../config/client/configuration.json";

// Path is a "." separated string, e.g. "mixpanel.token"
export const get = (path, defaultValue = null) => {
  const pathParts = path.split(".");

  return pathOr(defaultValue, pathParts, configuration);
};

export const config = {
  get,
};
