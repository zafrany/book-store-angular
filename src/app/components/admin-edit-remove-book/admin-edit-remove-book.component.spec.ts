import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditRemoveBookComponent } from './admin-edit-remove-book.component';

describe('AdminEditRemoveBookComponent', () => {
  let component: AdminEditRemoveBookComponent;
  let fixture: ComponentFixture<AdminEditRemoveBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditRemoveBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditRemoveBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
