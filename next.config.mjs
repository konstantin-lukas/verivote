/** @type {import('next').NextConfig} */
const CSPHeaders =
    "media-src 'self'; " +
    "img-src 'self'; " +
    "font-src 'self'; " +
    "child-src 'self'; " +
    "frame-src 'self'; " +
    "worker-src 'none'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "object-src 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self'; " +
    "upgrade-insecure-requests; " +
    "frame-ancestors 'none';";

const nextConfig = {
    async headers() {
        return [{
            source: "/",
            headers: [{
                key: "Content-Security-Policy",
                value: CSPHeaders,
            }, {
                key: "Access-Control-Allow-Origin",
                value: "https://verivote.eu",
            }, {
                key: "Access-Control-Allow-Methods",
                value: "GET, POST, PUT, DELETE",
            }, {
                key: "Strict-Transport-Security",
                value: "max-age=63072000; includeSubDomains",
            }, {
                key: "X-Frame-Options",
                value: "SAMEORIGIN",
            }, {
                key: "Strict-Transport-Security",
                value: "max-age=63072000; includeSubDomains; preload",
            }, {
                key: "Referrer-Policy",
                value: "no-referrer",
            }, {
                key: "X-Content-Type-Options",
                value: "nosniff",
            }, {
                key: "X-DNS-Prefetch-Control",
                value: "on",
            }],
        }];
    },
    eslint: {
        ignoreDuringBuilds: true,
    }
};

export default nextConfig;
