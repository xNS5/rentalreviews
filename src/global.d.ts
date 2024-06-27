import type NodeCache from 'node-cache';

declare global {
  var cacheArticles: NodeCache;
  var cacheCompanies: NodeCache;
  var cacheReviews: NodeCache;
  //your cache names
}

export {};