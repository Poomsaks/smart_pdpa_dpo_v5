import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperConsentSearchComponent } from './paper-consent-search.component';

describe('PaperConsentSearchComponent', () => {
  let component: PaperConsentSearchComponent;
  let fixture: ComponentFixture<PaperConsentSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaperConsentSearchComponent]
    });
    fixture = TestBed.createComponent(PaperConsentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
