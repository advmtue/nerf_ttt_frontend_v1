import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../../models/user';

@Component({
	selector: 'app-playerlist',
	templateUrl: './playerlist.component.html',
	styleUrls: ['./playerlist.component.scss']
})
export class PlayerlistComponent implements OnInit {
	private playerList: User[];
	private filterList: User[];
	public activeList: User[];
	public searchName: string;

	constructor(private apiService: ApiService) {
		this.playerList = [];
		this.filterList = [];
		this.activeList = [];
		this.searchName = '';
	}

	ngOnInit(): void {
		this.apiService.playerList()
		.subscribe((players: User[]) => {
			this.playerList = players;
			this.activeList = this.playerList;
		});
	}

	updateFilter() {
		if (this.searchName === '') {
			this.activeList = this.playerList;
		} else {
			this.activeList = this.playerList.filter((pl: User) => {
				let name = pl.first_name + pl.last_name;
				name = name.toLowerCase();
				return name.indexOf(this.searchName) > -1;
			});
		}
	}
}
