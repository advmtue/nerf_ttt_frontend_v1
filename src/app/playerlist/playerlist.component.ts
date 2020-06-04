import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Player } from '../../models/player';

@Component({
	selector: 'app-playerlist',
	templateUrl: './playerlist.component.html',
	styleUrls: ['./playerlist.component.scss']
})
export class PlayerlistComponent implements OnInit {
	private playerList: Player[];
	private filterList: Player[];
	public activeList: Player[];
	public searchName: string;

	constructor(private apiService: ApiService) {
		this.playerList = [];
		this.filterList = [];
		this.activeList = [];
		this.searchName = '';
	}

	ngOnInit(): void {
		this.apiService.playerList()
		.subscribe(response => {
			if (response.status.success) {
				this.playerList = response.data;
				this.activeList = this.playerList.sort(this.sortFunc);
			} else {
				console.log('Failed to pull player list');
				console.log(response.status.msg);
			}
		});
	}

	sortFunc(a: Player, b: Player) {
		return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
	}

	updateFilter() {
		if (this.searchName === '') {
			this.activeList = this.playerList;
		} else {
			this.activeList = this.playerList.filter((pl: Player) => {
				let name = pl.name.toLowerCase();
				return name.indexOf(this.searchName.toLowerCase()) > -1;
			});
		}

		this.activeList = this.activeList.sort(this.sortFunc);
	}
}
