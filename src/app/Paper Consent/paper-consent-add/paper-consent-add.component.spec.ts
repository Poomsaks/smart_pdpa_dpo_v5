import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperConsentAddComponent } from './paper-consent-add.component';

describe('PaperConsentAddComponent', () => {
  let component: PaperConsentAddComponent;
  let fixture: ComponentFixture<PaperConsentAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaperConsentAddComponent]
    });
    fixture = TestBed.createComponent(PaperConsentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
