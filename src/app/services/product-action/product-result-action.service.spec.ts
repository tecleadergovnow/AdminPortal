import { TestBed } from '@angular/core/testing';

import { ProductResultActionService } from './product-result-action.service';

describe('ProductResultActionService', () => {
  let service: ProductResultActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductResultActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
