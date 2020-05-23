import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Lobby } from '../../models/lobby';
import { User } from '../../models/user';
import { ApiService } from '../api/api.service';

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
		private router: ActivatedRoute
	) { }

	ngOnInit(): void {
		// Get the lobby with matching id
		this.router.paramMap.subscribe(params => {
			const lobbyId = Number(params.get('id'));

			// Get lobby info
			this.apiService.getLobby(lobbyId)
			.subscribe((lobby: Lobby) => {
				this.lobby = lobby;
			});

			// Get player list
			this.apiService.getLobbyPlayers(lobbyId)
			.subscribe((players: User[]) => {
				this.players = players;
			});

		});
	}
}
