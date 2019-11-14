import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishingBookComponent } from './publishing-book.component';

describe('PublishingBookComponent', () => {
  let component: PublishingBookComponent;
  let fixture: ComponentFixture<PublishingBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishingBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishingBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
