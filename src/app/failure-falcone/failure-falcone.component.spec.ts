import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailureFalconeComponent } from './failure-falcone.component';

describe('FailureFalconeComponent', () => {
  let component: FailureFalconeComponent;
  let fixture: ComponentFixture<FailureFalconeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailureFalconeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailureFalconeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
