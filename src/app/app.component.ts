import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { ApiService } from './api/api.service';
import { UserService } from './user/user.service';
import { Player } from '../models/player';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'ttt-frontend';

	constructor(
		private apiService: ApiService,
		private userService: UserService
	) {
		// If the user has some localstorage state
		if (this.userService.loginState > 0) {
			// Pull their use object
			console.log('Pulling user and permissions');
			const jwtInfo = JSON.parse(atob(this.userService.jwt.split('.')[1]));

			// Pull the profile
			this.apiService.playerProfile(jwtInfo.id).subscribe((response) => {
				if (!response.status.success) {
					console.log('Failed to pull player profile');
				} else {
					this.userService.user = response.data;
					console.log('Player info: ', response.data);
				}
			});

			// Pull group permissions
			this.apiService.groupPermissions(jwtInfo.group)
			.subscribe((response) => {
				if (!response.status.success) {
					console.log('Failed to pull player permissions');
					console.log(response.status.msg);
				} else {
					this.userService.permissions = response.data;
					console.log('User permissions: ', response.data);
				}
			});
		}
	}
}
