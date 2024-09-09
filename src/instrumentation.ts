import type NodeCache from 'node-cache';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { default: NodeCache } = await import('node-cache');
    const config: NodeCache.Options = {
      stdTTL: process.env.NODE_ENV === 'production' ? 0 : 60,
    };

    global.collectionCache = new NodeCache(config);
    global.documentCache= new NodeCache(config);
  }
}