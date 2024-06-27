import type NodeCache from 'node-cache';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const NodeCache = (await import('node-cache')).default;
    const config: NodeCache.Options = {
      stdTTL: process.env.NODE_ENV === 'production' ? 0 : 60,
    };

    global.cacheArticles = new NodeCache(config);
    global.cacheCompanies = new NodeCache(config);
    global.cacheReviews = new NodeCache(config);
  }
}