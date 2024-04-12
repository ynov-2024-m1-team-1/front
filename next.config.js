/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/webp'],
        domains: [
            "127.0.0.1",
            process.env.NEXT_PUBLIC_BACKEND_URL,

        ],
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'media.discordapp.net',
              port: '',
              pathname: '/attachments/**',
            },
        ],
    },
}

module.exports = nextConfig
