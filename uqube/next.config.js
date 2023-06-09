/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects(){
    return[
      {
        source:"/",
        destination:"/LetterBoard",
        permanent:false
      }
    ]
  }
}

module.exports = nextConfig
