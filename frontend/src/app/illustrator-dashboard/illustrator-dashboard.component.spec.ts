import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustratorDashboardComponent } from './illustrator-dashboard.component';

describe('IllustratorDashboardComponent', () => {
  let component: IllustratorDashboardComponent;
  let fixture: ComponentFixture<IllustratorDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IllustratorDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustratorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
