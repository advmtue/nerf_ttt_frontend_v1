import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../../models/game';
import { SocketService } from '../socket/socket.service';

@Component({
	selector: 'app-gameview',
	templateUrl: './gameview.component.html',
	styleUrls: ['./gameview.component.scss']
})
export class GameviewComponent implements OnInit, OnDestroy {

	public game: Game | undefined;

	constructor(
		private route: ActivatedRoute,
		private socket: SocketService,
	) {
		this.route.paramMap.subscribe(params => {
			this.setGame(Number(params.get('id')));
		})

		this.socket.io.on('getGame', this.getGame.bind(this));
		this.socket.io.on('gameStart', this.gameStart.bind(this));
		this.socket.io.on('gamePregame', this.gamePregame.bind(this));
	}

	ngOnDestroy() {
		this.socket.io.off('getGame');
		this.socket.io.off('gameStart');
		this.socket.io.off('gamePregame');
	}

	gamePregame() {
		console.log('pregame- requesting id: ', this.game.id);
		this.socket.io.emit('getGame', this.game.id);
	}

	// Request a fresh game state
	gameStart() {
		console.log('requesting game id:', this.game.id);
		this.socket.io.emit('getGame', this.game.id);
	}

	getGame(game: Game) {
		console.log('Got game: ', game);
		this.game = game;
	}

	setGame(id: number) {
		this.socket.io.emit('getGame', id);
	}

	ngOnInit(): void {
	}

}
