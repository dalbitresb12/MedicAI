import { TestBed } from '@angular/core/testing';

import { HistoryClinicService } from './history-clinic.service';

describe('HistoryClinicService', () => {
  let service: HistoryClinicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryClinicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
