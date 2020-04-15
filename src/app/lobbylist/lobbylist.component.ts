import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Lobby } from '../../models/lobby';

@Component({
	selector: 'app-lobbylist',
	templateUrl: './lobbylist.component.html',
	styleUrls: ['./lobbylist.component.scss']
})
export class LobbylistComponent implements OnInit {

	public lobbies: Lobby[] = [];

	constructor(private apiService: ApiService) { }

	ngOnInit(): void {
		// Get lobby list
		this.apiService.lobbyList().subscribe((lobbies: any) => {
			this.lobbies = lobbies;
			console.log(this.lobbies);
		});
	}

}
