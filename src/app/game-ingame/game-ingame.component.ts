import { Component, OnInit, Input } from '@angular/core';
import { Game, GamePlayer } from '../../models/game';
import { UserService } from '../user/user.service';
import { SocketService } from '../socket/socket.service';

@Component({
	selector: 'app-game-ingame',
	templateUrl: './game-ingame.component.html',
	styleUrls: ['./game-ingame.component.scss']
})
export class GameIngameComponent implements OnInit {
	@Input('game') game: Game;

	public localPlayer: GamePlayer | undefined;
	public shouldShowInfo: boolean = false;
	public shouldShowAbilities: boolean = false;
	public showKillerList: boolean = false;

	public associates: GamePlayer[];
	public playersNotSelf: GamePlayer[];

	public selectedKiller: any;

	private hideInfoTimeout: any;
	private hideAbilitiesTimeout: any;

	constructor(
		private user: UserService,
		private socket: SocketService,
	) { }

	ngOnInit(): void {
		this.localPlayer = this.game.players.find(pl => pl.id === this.user.player.id);

		this.associates = this.game.players.filter(pl => pl.role !== 'INNOCENT');
		this.playersNotSelf = this.game.players.filter(pl => pl.id !== this.user.player.id);

		// Assign to a player in other players;
		this.selectedKiller = this.playersNotSelf[0].id;
	}

	toggleInfo() {
		this.shouldShowInfo = !this.shouldShowInfo;

		if (this.hideInfoTimeout) {
			clearTimeout(this.hideInfoTimeout);
		}

		this.hideInfoTimeout = setTimeout(() => {this.shouldShowInfo = false}, 5000);
	}

	toggleAbilities() {
		this.shouldShowAbilities = !this.shouldShowAbilities;

		if (this.hideAbilitiesTimeout) {
			clearTimeout(this.hideAbilitiesTimeout);
		}

		this.hideAbilitiesTimeout = setTimeout(() => {
			this.shouldShowAbilities = false;
		}, 10000);
	}

	toggleDeath() {
		this.showKillerList = !this.showKillerList;
	}

	die() {
		this.localPlayer.alive = false;
		console.log(this.selectedKiller);
		this.socket.io.emit('playerRegisterDeath', this.game.id, Number(this.selectedKiller));
	}

	detectiveUseReveal() {
		// Pick a random player
		const randomPlayer = this.game.players[Math.floor(Math.random() * this.game.players.length)];
		const playerId = randomPlayer.id;
		console.log('using reveal on ', playerId);

		this.socket.io.emit('detectiveUseReveal', this.game.id, playerId);
	}
}
