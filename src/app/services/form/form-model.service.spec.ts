import { TestBed } from '@angular/core/testing';

import { FormModelService } from './form-model.service';

describe('FormModelService', () => {
  let service: FormModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
