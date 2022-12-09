import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutContentComponent } from './out-content.component';

describe('OutContentComponent', () => {
  let component: OutContentComponent;
  let fixture: ComponentFixture<OutContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
