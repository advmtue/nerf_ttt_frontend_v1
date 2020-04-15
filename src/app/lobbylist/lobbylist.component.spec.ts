import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbylistComponent } from './lobbylist.component';

describe('LobbylistComponent', () => {
  let component: LobbylistComponent;
  let fixture: ComponentFixture<LobbylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LobbylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
