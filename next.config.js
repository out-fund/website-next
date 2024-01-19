/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  compress: true,
  async redirects() {
    return [
      {
        source: "/es/:path*",
        destination: "/es-es/",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
