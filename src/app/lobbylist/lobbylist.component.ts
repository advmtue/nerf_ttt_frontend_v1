import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user/user.service';
import { SocketService } from '../socket/socket.service';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { GameLobby } from '../../models/game';

@Component({
	selector: 'app-lobbylist',
	templateUrl: './lobbylist.component.html',
	styleUrls: ['./lobbylist.component.scss']
})
export class LobbylistComponent implements OnInit, OnDestroy {
	public lobbies: GameLobby[] = [];
	public newLobbyName = '';
	public createLobbyError = '';

	constructor(
		private socket: SocketService,
		public user: UserService,
		public api: ApiService,
		public router: Router
	) {}

	ngOnInit(): void {
		this.socket.io.on('getLobbyList', this.getLobbyList.bind(this));
		this.socket.io.on('removeLobby', this.removeLobby.bind(this));
		this.socket.io.on('addLobby', this.addLobby.bind(this));
		this.socket.io.on('lobbyPlayerChange', this.lobbyPlayerChange.bind(this));

		/**
		 * Whenever the socket becomes 'READY', pull the lobby list.
		 * This also occurs the first time we subscribe (BehaviorSubject)
		 */
		this.socket.connectionStatus
			.subscribe((status: string) => {
				if (status === 'SOCKET_READY') {
					this.requestLobbyList();
				}
			});
	}

	/**
	 * Request the lobby list from the server
	 * Should also subscribe the socket to listen for all lobby updates
	 */
	requestLobbyList() {
		this.socket.io.emit('getLobbyList');
	}

	/**
	 * Clear socket routes
	 */
	ngOnDestroy(): void {
		this.socket.io.off('getLobbyList');
		this.socket.io.off('removeLobby');
		this.socket.io.off('addLobby');
		this.socket.io.off('lobbyPlayerChange');
	}

	/**
	 * Number of players changed in a given lobby
	 */
	lobbyPlayerChange(lobbyId: number, count: number) {
		const l = this.lobbies.find(lobby => lobby.id === lobbyId);
		if (!l) return;
		l.player_count = count;
	}

	/**
	 * Recieve the list of lobbies
	 */
	getLobbyList(lobbies: GameLobby[]) {
		this.lobbies = lobbies;
	}

	/**
	 * Lobby with given lobbyId is no longer visible
	 */
	removeLobby(lobbyId: number) {
		this.lobbies = this.lobbies.filter(lobby => lobby.id !== lobbyId);
	}

	/**
	 * Push a new lobby to the lobby list
	 */
	addLobby(lobby: GameLobby) {
		this.lobbies.push(lobby);
	}

	/**
	 * Create a new lobby
	 */
	createNewLobby() {
		if (this.newLobbyName === '') {
			return;
		}

		this.api.createGame(this.newLobbyName)
		.subscribe(response => {
			if (response.status.success) {
				this.router.navigate([`/game/${response.data.id}`])
			} else {
				this.createLobbyError = 'Failed to create lobby';
			}
		})
	}
}
