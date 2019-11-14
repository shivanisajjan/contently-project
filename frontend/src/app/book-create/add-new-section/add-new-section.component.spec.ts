import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSectionComponent } from './add-new-section.component';

describe('AddNewSectionComponent', () => {
  let component: AddNewSectionComponent;
  let fixture: ComponentFixture<AddNewSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
