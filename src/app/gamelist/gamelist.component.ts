import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-gamelist',
	templateUrl: './gamelist.component.html',
	styleUrls: ['./gamelist.component.scss']
})

export class GamelistComponent implements OnInit {

	gameList: any = [
		{
			name: "Game One",
			id: 1,
			owner_name: "Adam",
			owner_id: 31,
			date_created: "01 JAN 1970 6:54pm",
			player_count: 3
		},
		{
			name: "Game Twoooo000",
			id: 2,
			owner_name: "Russel",
			owner_id: 69,
			date_created: "02 JAN 1970 6:54pm",
			player_count: 69
		}
	]


	constructor() { }

	ngOnInit(): void {
	}

}
