import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { LoginResponse } from '../models/auth';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	public user: User | undefined = undefined;

	private authJWT: string = '';

	constructor(private apiService: ApiService, private router: Router) {
		// Setup auth tokens if they exist
		this.getAuthToken();

		if (!this.loggedIn) {
			router.navigate(['/login']);
			// Redirect to login
		} else {
			// Pull user from api
			const id = JSON.parse(atob(this.authJWT.split('.')[1])).id;
			this.apiService.playerProfile(id)
			.subscribe((user: User) => {
				this.user = user;
				console.log(user);
			});
		}
	}

	getAuthToken() {
		this.authJWT = localStorage.getItem('auth-token') || '';
	}

	// Get login state
	get loggedIn(): boolean {
		return this.authJWT !== '';
	}

	login(username: string, password: string, cb) {
		this.apiService.login(username, password)
		.subscribe((response: LoginResponse) => {
			if (response.success) {
				localStorage.setItem('auth-token', response.token);
				this.authJWT = response.token;
				cb(true);
			} else {
				console.log('Unsuccessful login');
				cb(false);
			}
		})
	}

	logout() {
		this.authJWT = '';
		localStorage.removeItem('auth-token');
		this.user = undefined;
	}
}
