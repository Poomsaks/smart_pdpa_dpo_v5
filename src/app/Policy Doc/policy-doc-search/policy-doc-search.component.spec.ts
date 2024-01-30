import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyDocSearchComponent } from './policy-doc-search.component';

describe('PolicyDocSearchComponent', () => {
  let component: PolicyDocSearchComponent;
  let fixture: ComponentFixture<PolicyDocSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolicyDocSearchComponent]
    });
    fixture = TestBed.createComponent(PolicyDocSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
