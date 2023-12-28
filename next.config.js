/** @type {import('next').NextConfig} */

module.exports = {
    functions: {
      generateMetadata: {
        metadataBase: process.env.NEXT_PUBLIC_VERCEL_URL,
      },
    },
  };