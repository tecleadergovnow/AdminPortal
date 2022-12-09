import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProductManagerComponent } from './main-product-manager.component';

describe('MainProductManagerComponent', () => {
  let component: MainProductManagerComponent;
  let fixture: ComponentFixture<MainProductManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainProductManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainProductManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
