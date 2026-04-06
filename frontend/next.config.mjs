/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // you already have this
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'your-project-name.railway.app', // ← change to your real Railway domain later
        pathname: '/media/**',
      },
    ],
  },
}

export default nextConfig