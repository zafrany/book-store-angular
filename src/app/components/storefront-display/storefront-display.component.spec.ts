import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorefrontDisplayComponent } from './storefront-display.component';

describe('StorefrontDisplayComponent', () => {
  let component: StorefrontDisplayComponent;
  let fixture: ComponentFixture<StorefrontDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StorefrontDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StorefrontDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
