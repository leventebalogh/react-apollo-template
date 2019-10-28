import fs from "fs";
import path from "path";
import { clientRootPath, serverRootPath } from "../paths";

export const readFile = _path => fs.readFileSync(_path, "utf-8");

export const readClientFile = _path =>
  fs.readFileSync(path.join(clientRootPath, _path), "utf-8");

export const readServerFile = _path =>
  fs.readFileSync(path.join(serverRootPath, _path), "utf-8");
