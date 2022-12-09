import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldSwitchComponent } from './form-field-switch.component';

describe('FormFieldSwitchComponent', () => {
  let component: FormFieldSwitchComponent;
  let fixture: ComponentFixture<FormFieldSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFieldSwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
