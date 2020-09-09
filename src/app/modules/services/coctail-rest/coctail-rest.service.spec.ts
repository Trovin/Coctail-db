import { TestBed } from '@angular/core/testing';

import { CoctailRestService } from './coctail-rest.service';

describe('CoctailRestService', () => {
  let service: CoctailRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoctailRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
