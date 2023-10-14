/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: "/parseUrl",
            destination: "http://localhost:4000/parseUrl",
          },
          {
            source: "/verifyPayment",
            destination: "http://localhost:4000/verifyPayment"
          }
        ];
       },
}

module.exports = nextConfig
