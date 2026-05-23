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

}

module.exports = nextConfig
