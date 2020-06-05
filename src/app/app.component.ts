import { Component } from '@angular/core';
import { ApiService } from './api/api.service';
import { UserService } from './user/user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'ttt-frontend';

	constructor(
		private apiService: ApiService,
		private userService: UserService,
		private router: Router,
	) {
		// Do nothing if no localStorage state
		if (this.userService.jwtString === '') {
			this.router.navigate(['/login']);
			return;
		}

		const jwt = this.userService.jwtString;
		const id = JSON.parse(atob(jwt.split('.')[1])).id;

		// Pull the profile
		this.apiService.getPlayerProfile(id).subscribe((response) => {
			if (!response.status.success) {
				console.log('Failed to pull player profile');
			} else {
				// Setup the userService instance
				this.userService.player = response.data;

				console.log(this.userService.player);
				console.log('Pulled player profile');

				// If password reset requried, redirect
				if (this.userService.player.password_reset) {
					this.router.navigate(['/passwordreset']);
				}
			}
		});
	}
}
