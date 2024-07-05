import type NodeCache from 'node-cache';

declare global {
  var collectionCache: NodeCache;
  var documentCache: NodeCache;
}

export {};