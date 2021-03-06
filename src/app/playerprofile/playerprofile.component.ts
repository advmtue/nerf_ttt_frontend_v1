import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api/api.service';
import { PlayerProfile } from '../../models/player';

@Component({
	selector: 'app-playerprofile',
	templateUrl: './playerprofile.component.html',
	styleUrls: ['./playerprofile.component.scss']
})
export class PlayerprofileComponent implements OnInit {

	profile: PlayerProfile | undefined;

	constructor(private route: ActivatedRoute, private apiService: ApiService) { }

	get primaryEmoji() {
		if (!this.profile) return;


	}

	getProfile(id: string) {
		this.apiService.getPlayerProfile(id)
		.subscribe(response => {
			if (response.status.success) {
				this.profile = response.data;
			} else {
				console.log('Failed to pull player profile');
				console.log(response.status.msg);
			}
		});
	}

	ngOnInit(): void {
		this.route.paramMap.subscribe(params => {
			this.apiService.getPlayerProfile(params.get('id'))
			.subscribe(response => {
				if (!response.status.success) {
					console.log(response.status.msg);
					return;
				}

				this.profile = response.data;
				console.log(this.profile);
			})
		});
	}

}
