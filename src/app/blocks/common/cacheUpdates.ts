import { getUpdateFunction, CacheOperation } from '@aerogear/voyager-client';
import { GREETINGS_QUERY } from '../queries/queries';

export const GreetingCacheUpdates = {
  addGreeting: getUpdateFunction('addGreeting', 'id', GREETINGS_QUERY, CacheOperation.ADD),
  // updateGreeting: getUpdateFunction('updateGreeting', 'id', GREETINGS_QUERY, CacheOperation.REFRESH),
  deleteGreeting: getUpdateFunction('deleteGreeting', 'id', GREETINGS_QUERY, CacheOperation.DELETE)
};
