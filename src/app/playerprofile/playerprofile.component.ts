import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
	selector: 'app-playerprofile',
	templateUrl: './playerprofile.component.html',
	styleUrls: ['./playerprofile.component.scss']
})
export class PlayerprofileComponent implements OnInit {

	profile: any;

	constructor(private route: ActivatedRoute, private apiService: ApiService) { }

	getProfile(id: string) {
		this.apiService.playerProfile(id)
		.subscribe((profiles: any) => {
			console.log(profiles);
			this.profile = profiles[0];
		});
	}

	ngOnInit(): void {
		this.route.paramMap.subscribe(params => {
			this.getProfile(params.get('id'));
		});
	}

}
