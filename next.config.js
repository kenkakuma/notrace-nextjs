/** @type {import('next').NextConfig} */
import { withContentlayer } from 'next-contentlayer'

const nextConfig = {
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  eslint: {
    dirs: ['app', 'components', 'lib', 'utils'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/lab',
        destination: '/shop',
        permanent: true, // 301 redirect
      },
      {
        source: '/lab/:path*',
        destination: '/shop/:path*',
        permanent: true,
      },
    ]
  },
}

export default withContentlayer(nextConfig)
