import type NodeCache from '@cacheable/node-cache';

declare global {
  var collectionCache: NodeCache;
  var documentCache: NodeCache;
  var altCache: NodeCache;
}

export {};