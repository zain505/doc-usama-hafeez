/** @type {import('next').NextConfig} */
const normalizeBasePath = (value = "") => {
  const trimmedValue = value.trim();

  if (!trimmedValue || trimmedValue === "/") {
    return "";
  }

  return `/${trimmedValue.replace(/^\/+|\/+$/g, "")}`;
};

const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

const nextConfig = {
  devIndicators: false,
  output: "export",
  ...(basePath ? { basePath } : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
