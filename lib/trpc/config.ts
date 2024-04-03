import nextConfig from '../../next.config.mjs';

const url = (() => {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const domain =
    (process.env.NODE_ENV === 'production'
      ? process.env.DOMAIN
      : 'localhost:3000') ?? 'localhost:3000';
  const url = `${protocol}://${domain}${nextConfig.basePath}/api/trpc`;
  return url;
})();

export { url };
