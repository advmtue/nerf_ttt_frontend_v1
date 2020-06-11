import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { UserService } from '../user/user.service';
import { SocketService } from '../socket/socket.service';
import { Game, GamePlayer } from '../../models/game';
import { WebResponse } from '../../models/response';

@Component({
	selector: 'app-lobby',
	templateUrl: './lobby.component.html',
	styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit, OnDestroy {
	@Input('game') game: Game;

	private gameStartIgnore: boolean = false;

	constructor(
		public api: ApiService,
		public user: UserService,
		public socket: SocketService,
		public router: Router,
	) {
		socket.io.on('playerJoin', this.playerJoin.bind(this));
		socket.io.on('playerLeave', this.playerLeave.bind(this));
		socket.io.on('playerReady', this.playerReady.bind(this));
		socket.io.on('playerUnready', this.playerUnready.bind(this));
		socket.io.on('gameCloseAdmin', this.gameClose.bind(this));
		socket.io.on('gameCloseOwner', this.gameClose.bind(this));
		socket.io.on('getGame', this.getGame.bind(this));
	}

	getGame(game: Game) {
		// We are probably about to be tidied
		if (game.status !== 'LOBBY') {
				this.gameStartIgnore = true;
		}
	}

	ngOnDestroy(): void {
		// Leave the lobby
		if (!this.gameStartIgnore) {
			this.setJoined(false);
		} else {
			console.log('Ignoring leaveGame for started game');
		}

		this.socket.io.off('playerJoin');
		this.socket.io.off('playerLeave');
		this.socket.io.off('playerReady');
		this.socket.io.off('playerUnready');
		this.socket.io.off('gameCloseAdmin');
		this.socket.io.off('gameCloseOwner');
	}

	ngOnInit(): void {}

	gameClose() {
		console.log('Got gameCloseAdmin');
		this.router.navigate(['/']);
	}

	playerJoin(player: GamePlayer) {
		this.game.players.push(player);
	}

	playerLeave(playerId: number) {
		this.game.players = this.game.players.filter(pl => pl.id !== playerId);
	}

	playerReady(playerId: number) {
		this.game.players.find(pl => pl.id === playerId).ready = true;
	}

	playerUnready(playerId: number) {
		this.game.players.find(pl => pl.id === playerId).ready = false;
	}

	// Console log any web response errors
	checkWebResponse(response: WebResponse<boolean>) {
		if (!response.status.success) {
			console.log(response);
		}
	}

	// Join / Leave the game
	setJoined(joined: boolean = true) {
		// Requesting same state, do nothing
		if (this.localPlayerJoined === joined) return;

		// Only leave if lobby state
		if (this.game.status !== 'LOBBY') return;

		if (joined) {
			this.api.joinGame(this.game.id).subscribe(this.checkWebResponse);
		} else {
			this.api.leaveGame(this.game.id).subscribe(this.checkWebResponse);
		}
	}


	// Ready / Unready
	setReady(ready: boolean = true) {
		if (ready) {
			this.api.readyUp(this.game.id).subscribe(this.checkWebResponse);
		} else {
			this.api.unready(this.game.id).subscribe(this.checkWebResponse);
		}
	}

	// Close lobby as administrator
	adminCloseLobby() {
		this.api.adminCloseGame(this.game.id).subscribe(this.checkWebResponse);
	}

	// Owner start lobby
	startLobby() {
		// Hello world!
		this.api.startLobby(this.game.id).subscribe(this.checkWebResponse);
	}

	// Determine if localPlayer has joined the lobby
	get localPlayerJoined(): boolean {
		return this.localPlayer !== null;
	}

	// Get the local player if they are in the game, else null
	get localPlayer(): GamePlayer | null {
		return this.game.players.filter(pl => pl.id === this.user.player.id)[0] || null;
	}

	// Determine if localPlayer is ready
	get localPlayerReady() {
		if (this.localPlayer === null) {
			return false;
		}
		return this.localPlayer.ready;
	}

	// Determine if localPlayer is Game master
	get localPlayerIsGM() {
		return this.game.owner.id === this.user.player.id;
	}

}
