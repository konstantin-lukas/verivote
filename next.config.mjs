/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [{
            source: "/",
            headers: [{
                key: "Access-Control-Allow-Origin",
                value: "https://verivote.eu",
            },
            {
                key: "Access-Control-Allow-Methods",
                value: "GET, POST, PUT, DELETE",
            },
            {
                key: "Strict-Transport-Security",
                value: "max-age=63072000; includeSubDomains",
            },
            {
                key: "X-Frame-Options",
                value: "SAMEORIGIN",
            }],
        }];
    },
};

export default nextConfig;
