// import type NodeCache from 'node-cache';
import {NodeCacheOptions} from "@cacheable/node-cache";

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const NodeCache = (await import('@cacheable/node-cache')).default;
    const config: NodeCacheOptions = {
      stdTTL: process.env.NODE_ENV === 'production' ? 0 : 60,
    };

    global.collectionCache = new NodeCache(config);
    global.documentCache= new NodeCache(config);
    global.altCache = new NodeCache(config);
  }
}