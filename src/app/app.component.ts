import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { ApiService } from './api/api.service';
import { UserService } from './user/user.service';
import { User } from '../models/user';

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
			const id = JSON.parse(atob(this.userService.jwt.split('.')[1])).id;

			this.apiService.playerProfile(id).subscribe((user: User) => {
				this.userService.user = user;

				// Pull their permissions
				this.apiService.groupPermissions(user.group_name)
				.subscribe((permissions: string[]) => {
					this.userService.permissions = permissions;

					console.log(this.userService.permissions);
					console.log(this.userService.user);
				});
			});
		}
	}
}
