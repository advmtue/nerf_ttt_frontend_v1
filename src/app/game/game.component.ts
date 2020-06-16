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

	public winConditions = winConditions;

	constructor(
		public user: UserService,
	) { }

	ngOnInit(): void {
		this.localPlayer = this.game.players.find(p => p.id === this.user.player.id);

		this.associates = this.game.players.filter(pl => pl.role !== 'INNOCENT');

		// Ready to display
		this.display = true;
	}
}
