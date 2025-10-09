const nextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: [
        'raw-loader',
      ],
    });

    return config;
  },
};

export default nextConfig;
