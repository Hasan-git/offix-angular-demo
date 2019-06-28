import { ApolloService } from './blocks/services/apollo.service';
import { NgModule, APP_INITIALIZER } from '@angular/core';

function apolloClientFactory(aeroGear: ApolloService) {
  return () => aeroGear.createApolloClient();
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: apolloClientFactory,
      deps: [ApolloService],
      multi: true
    }
  ]
})

export class GraphQLModule {

}
