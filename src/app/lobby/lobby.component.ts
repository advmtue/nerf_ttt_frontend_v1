import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Lobby } from '../../models/lobby';
import { Player, LobbyPlayer } from '../../models/player';
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
	public players: LobbyPlayer[] = [];

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
		this.socketService.bindRoute('playerReady', this.playerReady);
		this.socketService.bindRoute('playerUnready', this.playerUnready);
	}

	ngOnDestroy(): void {
		this.leaveLobby();

		this.socketService.clearRoute('playerJoin');
		this.socketService.clearRoute('playerLeave');
		this.socketService.clearRoute('lobbyClosed');
	}

	ngOnInit(): void {
		// Get the lobby with matching id
		this.route.paramMap.subscribe(params => {
			const lobbyId = Number(params.get('id'));

			// Get lobby info
			this.apiService.getLobby(lobbyId)
			.subscribe((response) => {
				if (!response.status.success) {
					console.log('Failed to pull lobby information');
					console.log(response.status.msg);
					return;
				}

				// Save lobby
				this.lobby = response.data;
				// Join listeners for the lobby
				this.socketService.sendMsg('joinLobby', this.lobby.id);
			});

			// Get player list
			this.apiService.getLobbyPlayers(lobbyId)
			.subscribe(response => {
				if (!response.status.success) {
					console.log('Failed to pull lobby players');
					console.log(response.status.msg);
					return;
				}

				console.log(response.data);
				this.players = response.data;
			});

		});
	}

	get localPlayerReady() {
		let ready = false;
		this.players.forEach(player => {
			if (player.id === this.userService.user.id) {
				ready = player.ready;
			}
		})

		return ready;
	}

	/**
	 * Player change their ready status
	 *
	 * @param status 
	 */
	setReady(status: boolean) {
		this.apiService.setReadyStatus(this.lobby.id, status)
		.subscribe(response => {
			if (response.status.success) {
				console.log('Updated ready status');
			} else {
				console.log('Failed to change ready status');
				console.log(response.status.msg);
			}
		});
	}

	playerReady = (playerId: number) => {
		this.players.forEach(player => {
			if (player.id === playerId) {
				player.ready = true;
			}
		})
	}

	playerUnready = (playerId: number) => {
		this.players.forEach(player => {
			if (playerId === this.userService.user.id) {
				player.ready = false;
			}
		})
	}

	lobbyClosed = () => {
		this.router.navigate(['/']);
	}

	// @socket
	playerJoin = (player: LobbyPlayer) => {
		this.players.push(player);
	}

	// @socket
	playerLeave = (player: LobbyPlayer) => {
		this.players = this.players.filter(pl => {
			return pl.id !== player.id
		});
	}

	get joined() {
		if (!this.userService.user) {
			return false;
		}

		let joined = false;
		this.players.forEach(player => {
			if (player.id === this.userService.user.id) {
				joined = true;
			}

		})

		return joined;
	}

	joinLobby() {
		this.apiService.joinLobby(this.lobby.id)
		.subscribe(response => {
		});
	}

	leaveLobby() {
		this.apiService.leaveLobby(this.lobby.id)
		.subscribe(response => {
			if (!response.status.success) {
				console.log('leaveLobby() failed');
				console.log(response.status.msg);
			}
		});
	}

	adminCloseLobby() {
		this.apiService.adminCloseLobby(this.lobby.id)
		.subscribe(response => {
			if (response.status.success) {
				this.router.navigate(['/']);
			} else {
				console.log('Failed to close lobby');
				console.log(response.status.msg);
			}
		});
	}
}
