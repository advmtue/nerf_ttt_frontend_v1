import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../../models/game';
import { SocketService } from '../socket/socket.service';
import { UserService } from '../user/user.service';

@Component({
	selector: 'app-gameview',
	templateUrl: './gameview.component.html',
	styleUrls: ['./gameview.component.scss']
})
export class GameviewComponent implements OnInit, OnDestroy {
	public revealing: boolean = false;
	public game: Game | undefined;
	public debug: any;

	constructor(
		private route: ActivatedRoute,
		private socket: SocketService,
		private user: UserService,
	) {
		this.route.paramMap.subscribe(params => {
			this.setGame(Number(params.get('id')));
		})

		this.socket.io.on('getGame', this.getGame.bind(this));
		this.socket.io.on('gameStart', this.gameStart.bind(this));
		this.socket.io.on('timerUpdate', this.timerUpdate.bind(this));
		this.socket.io.on('reveal', this.reveal.bind(this));
	}

	get localPlayer() {
		return this.game.players.find(pl => pl.id === this.user.player.id);
	}

	ngOnDestroy() {
		this.socket.io.off('getGame');
		this.socket.io.off('gameStart');
		this.socket.io.off('timerUpdate');
		this.socket.io.off('reveal');
	}

	reveal() {
		console.log('Got reveal message');
		this.revealing = true;

		setTimeout(() => this.revealing = false, 10000);
	}

	timerUpdate(seconds: number) {
		if (!this.game) return;

		// Game timer is already more accurate
		if (this.game.timer < seconds) return;

		this.game.timer = seconds;
	}

	// Request a fresh game state
	gameStart(time: number) {
		this.debug = `game start time = ${time}`;
		this.game.status = 'INGAME';
		this.game.timer = time;
	}

	getGame(game: Game) {
		console.log('Got game: ', game);

		if (game.date_launched !== null) {
			game.date_launched = new Date(game.date_launched);
		}

		if (game.date_ended !== null) {
			game.date_ended = new Date(game.date_ended);
		}

		this.game = game;
	}

	setGame(id: number) {
		this.socket.io.emit('getGame', id);
	}

	ngOnInit(): void {
	}

}
