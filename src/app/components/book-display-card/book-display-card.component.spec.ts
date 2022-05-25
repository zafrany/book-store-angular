import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDisplayCardComponent } from './book-display-card.component';

describe('BookDisplayCardComponent', () => {
  let component: BookDisplayCardComponent;
  let fixture: ComponentFixture<BookDisplayCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDisplayCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDisplayCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
