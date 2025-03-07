import type { NextConfig } from 'next';
import { NextFederationPlugin } from '@module-federation/nextjs-mf';

const federationConfig = {
  name: 'dashApp',
  filename: 'static/chunks/remoteEntry.js',
  remotes: {
    weatherRemote: 'weatherRemote@http://localhost:3010/remoteEntry.js',
    newsRemote: 'newsRemote@http://localhost:3020/remoteEntry.js',
  },
  shared: ['react', 'react-dom', 'vue'],
  extraOptions: {},
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.plugins.push(new NextFederationPlugin(federationConfig));

    return config;
  },
};

export default nextConfig;
