import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClinicalHistoryComponent } from './add-clinical-history.component';

describe('AddClinicalHistoryComponent', () => {
  let component: AddClinicalHistoryComponent;
  let fixture: ComponentFixture<AddClinicalHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddClinicalHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClinicalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
