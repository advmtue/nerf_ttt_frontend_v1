import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Game, GamePlayer } from '../../models/game';
import { UserService } from '../user/user.service';

const winConditions = {
	'TRAITOR': [
		'Only Traitors are left alive',
		'Time expires and the detective is dead.'
	],
	'DETECTIVE': [
		'No traitors are left alive.',
		'Time expires and you are still alive.'
	],
	'INNOCENT': [
		'No traitors are currently alive.',
		'Time expires and there is a detective alive.'
	],
};

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public game: Game | undefined = undefined;
  public display = false;
  public localPlayer: GamePlayer | undefined;
  public associates: GamePlayer[];

  public winConditions = winConditions;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    public user: UserService,
  ) {
    this.route.paramMap.subscribe(params => {
      this.gameId = Number(params.get('id'));
    })
  }

  set gameId(id: number) {
    this.api.getGame(id)
    .subscribe(response => {
      if (response.status.success) {
	this.assignGameState(response.data);
      }
    });
  }

  startTimer() {
	  setInterval(() => this.game.seconds_left--, 1000);
  }

  assignGameState(game: Game) {
	this.game = game;
        this.localPlayer = game.players.find(p => p.id === this.user.playerId);
	this.associates = game.players.filter(pl => {
		return pl.role !== 'INNOCENT' && pl.id !== this.localPlayer.id
	});
	this.startTimer();
	this.display = true;
  }

  ngOnInit(): void {
  }

}
