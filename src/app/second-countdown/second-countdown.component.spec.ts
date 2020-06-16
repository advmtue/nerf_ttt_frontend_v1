import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondCountdownComponent } from './second-countdown.component';

describe('SecondCountdownComponent', () => {
  let component: SecondCountdownComponent;
  let fixture: ComponentFixture<SecondCountdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondCountdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
