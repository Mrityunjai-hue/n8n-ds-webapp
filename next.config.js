/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow WASM for Pyodide and sql.js
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    }
    return config
  },
  // Required headers for SharedArrayBuffer (Pyodide needs this)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
