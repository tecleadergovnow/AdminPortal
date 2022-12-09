import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnTagsComponent } from './column-tags.component';

describe('ColumnTagsComponent', () => {
  let component: ColumnTagsComponent;
  let fixture: ComponentFixture<ColumnTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnTagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
