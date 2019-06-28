import { IGreeting } from './../interfaces/IGreeting';
import { GREETINGS_QUERY, ADD_GREETING, DELETE_GREETING } from './../queries/queries';
import { ApolloService } from './apollo.service';
import { Injectable } from '@angular/core';
import { ApolloOfflineClient, OfflineStore, CacheOperation } from '@aerogear/voyager-client';

@Injectable({
  providedIn: 'root'
})
export class GreetingsService {

  private readonly apollo: ApolloOfflineClient;
  private offlineStore: OfflineStore;

  constructor(_apolloService: ApolloService) {
    this.apollo = _apolloService.apolloClient;
    this.offlineStore = _apolloService.offlineStore;
  }

  getGreetings() {
    return this.apollo.watchQuery({
      query: GREETINGS_QUERY,
      fetchPolicy: "cache-and-network"
    })
  }

  createGreeting(message) {
    return this.apollo.offlineMutation<IGreeting>({
      mutation: ADD_GREETING,
      variables: {
        msg: message
      },
      updateQuery: GREETINGS_QUERY,
      typeName: 'Greeting'
    });
  }

  deleteGreeting(id) {
    return this.apollo.offlineMutation({
      mutation: DELETE_GREETING,
      variables: { id },
      updateQuery: GREETINGS_QUERY,
      typeName: 'Greeting',
      operationType: CacheOperation.DELETE
    }
    );
  }

}
