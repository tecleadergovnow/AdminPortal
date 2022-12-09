import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStepBlockComponent } from './form-step-block.component';

describe('FormStepBlockComponent', () => {
  let component: FormStepBlockComponent;
  let fixture: ComponentFixture<FormStepBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormStepBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormStepBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
