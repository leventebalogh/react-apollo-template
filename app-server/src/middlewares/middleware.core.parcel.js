import Bundler from "parcel-bundler";
import { logging } from "../services";
import { clientRootPath } from "../paths";

export function getParcelMiddleware() {
  const bundlerOptions = {};
  const indexHtmlPath = `${clientRootPath}/src/index.html`;
  const bundler = new Bundler(indexHtmlPath, bundlerOptions);

  logging.info("[ Static ] - Using Parcel JS middleware");

  return bundler.middleware();
}
