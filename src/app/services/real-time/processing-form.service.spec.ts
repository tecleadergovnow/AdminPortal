import { TestBed } from '@angular/core/testing';

import { ProcessingFormService } from './processing-form.service';

describe('ProcessingFormService', () => {
  let service: ProcessingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessingFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
