import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyDocAddComponent } from './policy-doc-add.component';

describe('PolicyDocAddComponent', () => {
  let component: PolicyDocAddComponent;
  let fixture: ComponentFixture<PolicyDocAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolicyDocAddComponent]
    });
    fixture = TestBed.createComponent(PolicyDocAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
