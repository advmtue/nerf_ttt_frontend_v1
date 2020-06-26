import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameIngameRevealComponent } from './game-ingame-reveal.component';

describe('GameIngameRevealComponent', () => {
  let component: GameIngameRevealComponent;
  let fixture: ComponentFixture<GameIngameRevealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameIngameRevealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameIngameRevealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
