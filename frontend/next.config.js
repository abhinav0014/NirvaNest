/** @type {import('next').NextConfig} 
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
*/

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  output: "export",

  basePath: "/NirvaNest",
  assetPrefix: "/NirvaNest/",

  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
