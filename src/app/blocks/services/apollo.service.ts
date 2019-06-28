import { ApolloOfflineClient, DataSyncConfig, OfflineClient, OfflineStore } from '@aerogear/voyager-client';
import { Injectable } from '@angular/core';
import { GreetingCacheUpdates } from '../common/cacheUpdates';

@Injectable({
  providedIn: 'root'
})
export class ApolloService {


  public _apolloClient: ApolloOfflineClient;
  private _offlineStore: OfflineStore;

  constructor() {
  }

  get apolloClient(): ApolloOfflineClient {
    return this._apolloClient;
  }

  get offlineStore(): OfflineStore {
    return this._offlineStore;
  }

  public async createApolloClient() {

    const options: DataSyncConfig = {
      mutationCacheUpdates: GreetingCacheUpdates
    };
    options.httpUrl = 'http://localhost:4000/graphql';
    options.wsUrl = 'ws://localhost:4000/graphql';

    const offlineClient = new OfflineClient(options);
    this._offlineStore = offlineClient.offlineStore;
    this._apolloClient = await offlineClient.init();


  }

}
