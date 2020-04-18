import NodeCache from "node-cache";
import { config } from "./services.core.config";

export const createCache = () => {
  return new NodeCache({
    stdTTL: config.cache.ttl,
    checkperiod: config.cache.checkperiod,
  });
};

export const cache = createCache();
