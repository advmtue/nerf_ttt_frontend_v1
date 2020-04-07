import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-playerprofile',
	templateUrl: './playerprofile.component.html',
	styleUrls: ['./playerprofile.component.scss']
})
export class PlayerprofileComponent implements OnInit {

	player: any;
	players: any = {
		31: {
			firstname: "Adam",
			lastname: "Tuechler",
			rank: "admin",
			role: "👑",
			kills: 10,
			deaths: 1,
			wins: 0,
			losses: 100,
			date_joined: "69 SEP 1969"
		},
		69: {
			firstname: "Russell",
			lastname: "Waters",
			rank: "poop",
			role: "💩",
			kills: 0,
			deaths: 0,
			wins: 5,
			losses: 10,
			date_joined: "01 AUG 2019"
		}
	}

	constructor(private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.route.paramMap.subscribe(params => {
			this.player = this.players[params.get('id')]
		});
	}

}
