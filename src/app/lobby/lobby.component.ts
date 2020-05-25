import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Lobby } from '../../models/lobby';
import { User } from '../../models/user';
import { ApiService } from '../api/api.service';
import { UserService } from '../user/user.service';
import { SocketService } from '../socket/socket.service';

@Component({
	selector: 'app-lobby',
	templateUrl: './lobby.component.html',
	styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

	public lobby: Lobby | undefined;
	public players: User[] = [];

	constructor(
		public apiService: ApiService,
		private route: ActivatedRoute,
		private router: Router,
		public userService: UserService,
		public socketService: SocketService
	) {
		// Add socket routes
		this.socketService.bindRoute('playerJoin', this.playerJoin);
		this.socketService.bindRoute('playerLeave', this.playerLeave);
		this.socketService.bindRoute('lobbyClosed', this.lobbyClosed);
	}

	ngOnDestroy(): void {
		this.leaveLobby();

		this.socketService.clearRoute('playerJoin');
		this.socketService.clearRoute('playerLeave');
		this.socketService.clearRoute('lobbyClosed', this.lobbyClosed);
	}

	ngOnInit(): void {
		// Get the lobby with matching id
		this.route.paramMap.subscribe(params => {
			const lobbyId = Number(params.get('id'));

			// Get lobby info
			this.apiService.getLobby(lobbyId)
			.subscribe((lobby: Lobby) => {
				this.lobby = lobby;
				this.socketService.sendMsg('joinLobby', this.lobby.id);
			});

			// Get player list
			this.apiService.getLobbyPlayers(lobbyId)
			.subscribe((players: User[]) => {
				this.players = players;
			});

		});
	}

	lobbyClosed = () => {
		this.router.navigate(['/']);
	}

	// @socket
	playerJoin = (player: User) => {
		this.players.push(player);
	}

	// @socket
	playerLeave = (player: User) => {
		this.players = this.players.filter(pl => {
			return pl.id !== player.id
		});
	}

	get joined() {
		if (!this.userService.user) {
			return false;
		}

		let joined = false;

		for (let player of this.players) {
			if (player.id === this.userService.user.id) {
				joined = true;
				break;
			}
		}

		return joined;
	}

	joinLobby() {
		this.apiService.joinLobby(this.lobby.id)
		.subscribe(success => {
			console.log(`Joined lobby: ${success}`);
		});
	}

	leaveLobby() {
		this.apiService.leaveLobby(this.lobby.id)
		.subscribe(success => {
			console.log(`Left Lobby: ${success}`);
		});
	}

	adminCloseLobby() {
		this.apiService.adminCloseLobby(this.lobby.id)
		.subscribe((success: boolean) => {
			if (success) {
				this.router.navigate(['/']);
			}
		});
	}
}
