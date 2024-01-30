import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyDocDetailComponent } from './policy-doc-detail.component';

describe('PolicyDocDetailComponent', () => {
  let component: PolicyDocDetailComponent;
  let fixture: ComponentFixture<PolicyDocDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolicyDocDetailComponent]
    });
    fixture = TestBed.createComponent(PolicyDocDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
