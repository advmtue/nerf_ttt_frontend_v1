import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerNameGameComponent } from './player-name-game.component';

describe('PlayerNameGameComponent', () => {
  let component: PlayerNameGameComponent;
  let fixture: ComponentFixture<PlayerNameGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerNameGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerNameGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
