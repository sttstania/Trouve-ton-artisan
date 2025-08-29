import { TestBed } from '@angular/core/testing';

import { Artisans } from './artisans';

describe('Artisans', () => {
  let service: Artisans;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Artisans);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
