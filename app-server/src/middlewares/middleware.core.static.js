import serveStatic from "serve-static";
import { logging } from "../services";
import { clientRootPath } from "../paths";

export function getStaticMiddleware() {
  const distFolderPath = `${clientRootPath}/static`;

  logging.info("[ Static ] - Serving files from client/static directory");

  return serveStatic(distFolderPath, {
    index: false,
    cacheControl: true,
    immutable: true,
    maxAge: 31536000,
  });
}
