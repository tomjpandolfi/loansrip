/** @type {import('next').NextConfig} */

const apiHelloMoonToken = process.env.HELLOMOON_BEARER_API_TOKEN;
const apiHoneyToken = process.env.HONEY_API_TOKEN;

const nextConfig = {
  reactStrictMode: true,
  env: {
    HELLOMOON_BEARER_API_TOKEN: apiHelloMoonToken,
    HONEY_API_TOKEN: apiHoneyToken,
  },
}

module.exports = nextConfig