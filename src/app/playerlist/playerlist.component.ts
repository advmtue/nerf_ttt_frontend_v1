import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
	selector: 'app-playerlist',
	templateUrl: './playerlist.component.html',
	styleUrls: ['./playerlist.component.scss']
})
export class PlayerlistComponent implements OnInit {

	playerList: any;

	constructor(private apiService: ApiService) { }

	ngOnInit(): void {
		this.apiService.playerList()
		.subscribe((players: any) => {
			this.playerList = players;
			console.log(this.playerList);
		});
	}
}
