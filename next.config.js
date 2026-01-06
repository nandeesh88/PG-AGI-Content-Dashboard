/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['picsum.photos', 'image.tmdb.org', 'pbs.twimg.com'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig