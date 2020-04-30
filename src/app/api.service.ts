import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserProfile } from '../models/user';
import { Lobby } from '../models/lobby';
import { LoginResponse, PasswordResetResponse } from '../models/auth';
import { UserService } from './user.service';
import { API_URL } from './config';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor(private http: HttpClient, private userService: UserService) {
		if (this.userService.loginState > 0) {
			const id = JSON.parse(atob(this.userService.jwt.split('.')[1])).id;

			this.playerProfile(id)
			.subscribe((user: User) => {
				this.userService.user = user;

				this.groupPermissions(user.group_name)
				.subscribe((permissions: string[]) => {
					this.userService.permissions = permissions;

					console.log(user, permissions);
				});
			});
		}
	}

	getUrl(url: string) {
		return API_URL + url;
	}

	/* Get group permissions */
	groupPermissions(group: string) {
		return this.http.get<string[]>(this.getUrl(`group/${group}/permissions`))
	}

	/* POST /login { username: string, password: string } */
	login(username: string, password: string) {
		const loginDetails = {username, password};

		return this.http.post<LoginResponse>(
			this.getUrl('login'),
			loginDetails
		);
	}

	/* GET /player */
	playerList() {
		return this.http.get<User[]>(this.getUrl('player'));
	}

	/* GET /player/:id */
	playerProfile(id: string) {
		return this.http.get<UserProfile>(this.getUrl('player/' + id));
	}

	/* Get /lobby */
	lobbyList() {
		return this.http.get<Lobby[]>(this.getUrl('lobby'));
	}

	// Change a users password
	changePassword(currentPassword: string, newPassword: string) {
		const pwDetails = {currentPassword, newPassword};

		return this.http.post<PasswordResetResponse>(
			this.getUrl('passwordreset'),
			pwDetails
		);
	}
}
