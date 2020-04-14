import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
	selector: 'app-playerlist',
	templateUrl: './playerlist.component.html',
	styleUrls: ['./playerlist.component.scss']
})
export class PlayerlistComponent implements OnInit {

	playerList: any;
	filterList: any;
	activeList: any;
	searchName: string = '';

	constructor(private apiService: ApiService) {
		this.playerList = [];
		this.activeList = [];
		this.filterList = [];
	}

	ngOnInit(): void {
		this.apiService.playerList()
		.subscribe((players: any) => {
			this.playerList = players;
			this.activeList = this.playerList;
		});
	}

	updateFilter() {
		this.filterList = this.playerList.filter((pl) => {
			let name = pl.first_name + pl.last_name;
			name = name.toLowerCase();
			return name.indexOf(this.searchName) > -1;
		});

		if (this.searchName === '') {
			this.activeList = this.playerList;
		} else {
			this.activeList = this.filterList;
		}
	}
}
