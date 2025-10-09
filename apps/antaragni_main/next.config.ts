import type { Configuration } from 'webpack';

const nextConfig = {
  /* config options here */
  images: {
    // Allow Firebase Storage host used for sponsor images
    domains: ['firebasestorage.googleapis.com'],
    // Also add a remote pattern to allow those full URL paths if needed
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**',
      },
    ],
  },
  webpack(config: Configuration) {
    // Initialize module and rules safely. Use `any` for module internals
    // to avoid TypeScript 'possibly undefined' errors while keeping the
    // webpack Configuration type for the function parameter.
    const moduleOpts = (config.module as any) || (config.module = { rules: [] } as any);
    moduleOpts.rules = moduleOpts.rules || [];

    moduleOpts.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: [
        'raw-loader',
      ],
    });

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
