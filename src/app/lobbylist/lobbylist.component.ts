import { Component, OnInit, OnDestroy } from '@angular/core';
import { Lobby } from '../../models/lobby';
import { UserService } from '../user/user.service';
import { SocketService } from '../socket/socket.service';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-lobbylist',
	templateUrl: './lobbylist.component.html',
	styleUrls: ['./lobbylist.component.scss']
})
export class LobbylistComponent implements OnInit, OnDestroy {

	public lobbies: Lobby[] = [];
	public newLobbyName = '';
	public createLobbyError = '';

	constructor(
		private socketService: SocketService,
		public userService: UserService,
		public apiService: ApiService,
		public router: Router
	) {
		// Get lobby list
		this.socketService.bindRoute('getLobbyList', this.getLobbyList);
		this.socketService.bindRoute('removeLobby', this.removeLobby);
		this.socketService.bindRoute('addLobby', this.addLobby);
		this.socketService.bindRoute('lobbyPlayerChange', this.lobbyPlayerChange);

		this.socketService.sendMsg('getLobbyList');
	}

	ngOnInit(): void {
	}

	ngOnDestroy(): void {
		this.socketService.clearRoute('getLobbyList');
		this.socketService.clearRoute('removeLobby');
		this.socketService.clearRoute('addLobby');
		this.socketService.clearRoute('lobbyPlayerChange');
	}

	lobbyPlayerChange = (data: {lobby: number; change: number}) => {
		this.lobbies.forEach(lobby => {
			if (lobby.id === data.lobby) {
				lobby.player_count = data.change
			}
		})
	}

	// Recieve the list of lobbies
	getLobbyList = (lobbies: Lobby[]) => {
		this.lobbies = lobbies;
	}

	// Remove a lobby by a given id
	removeLobby = (rLobby: {id: number}) => {
		this.lobbies = this.lobbies.filter(lobby => lobby.id !== rLobby.id);
	}

	// Add a new lobby to the list
	addLobby = (lobby: Lobby) => {
		this.lobbies.push(lobby);
	}

	createNewLobby() {
		if (this.newLobbyName === '') {
			return;
		}

		this.apiService.createLobby(this.newLobbyName)
		.subscribe(response => {
			if (response.status.success) {
				this.router.navigate([`/game/${response.data.id}`])
			} else {
				this.createLobbyError = 'Failed to create lobby';
			}
		})
	}
}
