import { Component } from '@angular/core';
import { ApiService } from './api/api.service';
import { UserService } from './user/user.service';
import { Router } from '@angular/router';
import { WebResponse } from '../models/response';
import { PlayerProfile } from '../models/player';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'ttt-frontend';
	public loaded = false;

	constructor(
		private api: ApiService,
		private user: UserService,
		private router: Router,

	) {
		this.checkRedirects();
	}

	checkRedirects() {
		const authLevel = this.user.authLevel;
		console.log(authLevel);
		if (authLevel === 'LOADING') {
			// Make a request for the profile
			this.api.getPlayerProfile(this.user.playerId)
			.subscribe(this.onGetProfile);
		} else if (authLevel === 'NONE') {
			// Redirect to login if necessary
			if (this.router.url !== '/login') {
				this.router.navigate(['/login']);
				this.loaded = true;
			}
		} else if (authLevel === 'PASSWORD_RESET') {
			// Redirect to passwordreset if necessary
			if (this.router.url !== '/passwordreset') {
				this.router.navigate(['/passwordreset']);
				this.loaded = true;
			}
		} else {
			this.loaded = true;
		}
	}

	// Response for player login
	onGetProfile = (pack: WebResponse<PlayerProfile>) => {
		if (!pack.status.success) {
			console.log('Failed to authenticate.');
			this.user.logout();
			this.router.navigate(['/login']);
			return;
		}

		// Assign the login pack to the user service
		this.user.player = pack.data;

		this.checkRedirects();
	}
}
