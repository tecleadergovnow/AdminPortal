import { TestBed } from '@angular/core/testing';

import { ProductActionService } from './product-action.service';

describe('ProductActionService', () => {
  let service: ProductActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
