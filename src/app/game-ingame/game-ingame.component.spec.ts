import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameIngameComponent } from './game-ingame.component';

describe('GameIngameComponent', () => {
  let component: GameIngameComponent;
  let fixture: ComponentFixture<GameIngameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameIngameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameIngameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
