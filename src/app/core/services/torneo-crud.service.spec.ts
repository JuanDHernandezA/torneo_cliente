import { TestBed } from '@angular/core/testing';

import { TorneoCrudService } from './torneo-crud.service';

describe('TorneoCrudService', () => {
  let service: TorneoCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TorneoCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
