/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GreetingsService } from './greetings.service';

describe('Service: Greetings', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GreetingsService]
    });
  });

  it('should ...', inject([GreetingsService], (service: GreetingsService) => {
    expect(service).toBeTruthy();
  }));
});
