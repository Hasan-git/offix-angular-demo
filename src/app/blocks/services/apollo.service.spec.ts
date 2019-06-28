/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApolloService } from './apollo.service';

describe('Service: Apollo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApolloService]
    });
  });

  it('should ...', inject([ApolloService], (service: ApolloService) => {
    expect(service).toBeTruthy();
  }));
});
