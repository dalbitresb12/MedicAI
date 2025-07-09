import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBySpecialtyComponent } from './search-by-specialty.component';

describe('SearchBySpecialtyComponent', () => {
  let component: SearchBySpecialtyComponent;
  let fixture: ComponentFixture<SearchBySpecialtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBySpecialtyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBySpecialtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
