import { Component, OnInit, Input } from '@angular/core';
import { Game, GamePlayer } from '../../models/game';
import { UserService } from '../user/user.service';

const winConditions = {
	'TRAITOR': [
		'Kill the detective and survive the round.',
	],
	'DETECTIVE': [
		'Kill all traitors or survive the game.',
	],
	'INNOCENT': [
		'Keep your detective alive.'
	],
};

@Component({
	selector: 'app-game',
	templateUrl: './game.component.html',
	styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
	@Input('game') game: Game;

	public display = false;
	public localPlayer: GamePlayer | undefined;
	public associates: GamePlayer[];
	public secondsLeft: number = -1;

	public timer: any;

	public winConditions = winConditions;

	constructor(
		public user: UserService,
	) { }

	ngOnInit(): void {
		this.assignGameState();
	}

	startTimer() {
		this.timer = setInterval(() => {
			this.secondsLeft--;
			if (this.secondsLeft < 0) {
				this.secondsLeft = 0;
				clearInterval(this.timer);
			}
		}, 1000);
	}

	assignGameState() {
		this.localPlayer = this.game.players.find(p => p.id === this.user.player.id);

		this.associates = this.game.players.filter(pl => pl.role !== 'INNOCENT');

		// Setup seconds until next game phase
		this.game.date_launched = new Date(this.game.date_launched);
		const n = new Date();
		const s = (this.game.date_launched.valueOf() - n.valueOf()) / 1000;

		this.secondsLeft = Math.floor(s);
		this.startTimer();

		// Ready to display
		this.display = true;
	}


}
