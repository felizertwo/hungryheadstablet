/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            hostname: 'orca-app-h3nmy.ondigitalocean.app',
        },
            {
                hostname: 'hungryheads-assets-test.fra1.digitaloceanspaces.com',
            },
            {
                hostname: 'hungryheads-production-files.fra1.digitaloceanspaces.com'
            }
            ],
    },
};

export default nextConfig;
