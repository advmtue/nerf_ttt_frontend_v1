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
	) {
		// Get lobby list
		this.socket.io.on('getLobbyList', this.getLobbyList.bind(this));
		this.socket.io.on('removeLobby', this.removeLobby.bind(this));
		this.socket.io.on('addLobby', this.addLobby.bind(this));
		this.socket.io.on('lobbyPlayerChange', this.lobbyPlayerChange.bind(this));

		this.socket.io.emit('getLobbyList');
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		this.socket.io.off('getLobbyList');
		this.socket.io.off('removeLobby');
		this.socket.io.off('addLobby');
		this.socket.io.off('lobbyPlayerChange');
	}

	lobbyPlayerChange(data: {lobby: number; change: number}) {
		this.lobbies.forEach(lobby => {
			if (lobby.id === data.lobby) {
				lobby.player_count = data.change
			}
		})
	}

	// Recieve the list of lobbies
	getLobbyList(lobbies: GameLobby[]) {
		console.log(lobbies);
		this.lobbies = lobbies;
	}

	// Remove a lobby by a given id
	removeLobby(lobbyId: number) {
		this.lobbies = this.lobbies.filter(lobby => lobby.id !== lobbyId);
	}

	// Add a new lobby to the list
	addLobby(lobby: GameLobby) {
		this.lobbies.push(lobby);
	}

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
