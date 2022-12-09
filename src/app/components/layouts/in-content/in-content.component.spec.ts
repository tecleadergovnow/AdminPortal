import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InContentComponent } from './in-content.component';

describe('InContentComponent', () => {
  let component: InContentComponent;
  let fixture: ComponentFixture<InContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
