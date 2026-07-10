export const BRAND_NAME = "Dental Square";

const DEFAULT_SITE_URL = "https://zain505.github.io/doc-usama-hafeez";

const trimTrailingSlashes = (value) => value.replace(/\/+$/g, "");

const normalizeBasePath = (value = "") => {
  const trimmedValue = value.trim();

  if (!trimmedValue || trimmedValue === "/") {
    return "";
  }

  return `/${trimmedValue.replace(/^\/+|\/+$/g, "")}`;
};

const hasScheme = (value) => /^[a-z][a-z\d+.-]*:/i.test(value);

export const BASE_PATH = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);
export const SITE_URL = trimTrailingSlashes(
  process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL,
);
export const SITE_ORIGIN = new URL(SITE_URL).origin;

export function withBasePath(path) {
  if (!path || !BASE_PATH || path.startsWith("#") || hasScheme(path) || path.startsWith("//")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (
    normalizedPath === BASE_PATH ||
    normalizedPath.startsWith(`${BASE_PATH}/`) ||
    normalizedPath.startsWith(`${BASE_PATH}#`)
  ) {
    return normalizedPath;
  }

  if (normalizedPath.startsWith("/#")) {
    return `${BASE_PATH}${normalizedPath.slice(1)}`;
  }

  return `${BASE_PATH}${normalizedPath}`;
}

export function toSiteUrl(path = "/") {
  if (!path) {
    return SITE_URL;
  }

  if (hasScheme(path) || path.startsWith("//")) {
    return path;
  }

  if (path.startsWith("#")) {
    return `${SITE_URL}${path}`;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const appPath =
    BASE_PATH &&
    (normalizedPath === BASE_PATH ||
      normalizedPath.startsWith(`${BASE_PATH}/`) ||
      normalizedPath.startsWith(`${BASE_PATH}#`))
      ? normalizedPath.slice(BASE_PATH.length) || "/"
      : normalizedPath;

  if (appPath === "/") {
    return `${SITE_URL}/`;
  }

  return `${SITE_URL}${appPath}`;
}
