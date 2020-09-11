import { TestBed } from '@angular/core/testing';

import { GenericServicesService } from './generic-services.service';

describe('GenericServicesService', () => {
  let service: GenericServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
