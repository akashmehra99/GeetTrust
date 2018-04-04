import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessFalconeComponent } from './success-falcone.component';

describe('SuccessFalconeComponent', () => {
  let component: SuccessFalconeComponent;
  let fixture: ComponentFixture<SuccessFalconeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessFalconeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessFalconeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
