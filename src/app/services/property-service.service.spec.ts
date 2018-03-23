import { TestBed, inject } from '@angular/core/testing';

import { PropertyServiceService } from './property-service.service';

describe('PropertyServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PropertyServiceService]
    });
  });

  it('should be created', inject([PropertyServiceService], (service: PropertyServiceService) => {
    expect(service).toBeTruthy();
  }));
});
