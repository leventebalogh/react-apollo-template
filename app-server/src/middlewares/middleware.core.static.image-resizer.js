import path from "path";
import sharp from "sharp";
import { clientRootPath } from "../paths";
import { cache } from "../services";

export const isImage = (req) => {
  const imageExtensions = [".jpg", ".jpeg", ".png"];
  const extension = path.extname(req.path).toLowerCase();

  return imageExtensions.includes(extension);
};

export const getContentType = (req) => {
  const extension = path.extname(req.path).toLowerCase().replace(".", "");

  return `image/${extension}`;
};

// There are two available options: ?w= and ?h=
export const shouldBeResized = (req) => {
  return req.query.w || req.query.h;
};

export const processQueryParameters = (req) => {
  const width = req.query.w ? parseInt(req.query.w, 10) : null;
  const height = req.query.h ? parseInt(req.query.h, 10) : null;

  return { width, height };
};

export const getFilePath = (req) => {
  const staticFolder = `${clientRootPath}/static`;
  const [, relativePath] = req.path.split("static");

  return path.normalize(`${staticFolder}${relativePath}`);
};

export const resize = async (req) => {
  const { width, height } = processQueryParameters(req);
  const filePath = getFilePath(req);
  const cacheKey = req.originalUrl;
  const cached = cache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const data = await sharp(filePath).resize(width, height).toBuffer();
  cache.set(cacheKey, data);

  return data;
};

export const getImageResizerMiddleware = () => {
  return async (req, res, next) => {
    const shouldBeProcessed = isImage(req) && shouldBeResized(req);

    // We let the static middleware to serve it as it is
    if (!shouldBeProcessed) {
      next();
      return;
    }

    const data = await resize(req);
    const contentType = getContentType(req);
    const cacheControl = "public, max-age=31557600";

    res.set("Cache-Control", cacheControl).contentType(contentType).send(data);
  };
};
