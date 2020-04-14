import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
	selector: 'app-gamelist',
	templateUrl: './gamelist.component.html',
	styleUrls: ['./gamelist.component.scss']
})

export class GamelistComponent implements OnInit {

	gameList: any;

	constructor(private apiService: ApiService) { }

	ngOnInit(): void {
		this.apiService.lobbyList()
		.subscribe((lobbies: any) => {
			this.gameList = lobbies;
			console.log(this.gameList)
		});
	}


}
