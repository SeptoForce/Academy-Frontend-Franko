import { withKumaUI } from '@kuma-ui/next-plugin'
//redirect / to /football

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  rewrites: async () => {
    return [{ source: '/api/:path*', destination: 'https://academy-backend.sofascore.dev/:path*' }]
  },
  redirects: async () => {
    const date = new Date().toISOString().split('T')[0]
    return [
      {
        source: '/',
        destination: '/football?d=' + date,
        permanent: true,
      },
    ]
  },
}

export default withKumaUI(nextConfig)
