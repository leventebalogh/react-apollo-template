import serveStatic from "serve-static";
import { logging } from "../services";
import { clientRootPath } from "../paths";

export function getStaticClientBuildMiddleware() {
  const distFolderPath = `${clientRootPath}/build`;

  logging.info("[ Static ] - Serving files from client/build directory");

  return serveStatic(distFolderPath, {
    index: false,
    cacheControl: true,
    immutable: true,
    maxAge: 31536000,
  });
}
