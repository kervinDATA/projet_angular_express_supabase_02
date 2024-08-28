import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingFormComponent } from './listing-form.component';

describe('ListingFormComponent', () => {
  let component: ListingFormComponent;
  let fixture: ComponentFixture<ListingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
