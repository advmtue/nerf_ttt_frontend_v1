import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	public user: User;

	private authJWT: string = '';

	constructor(private apiService: ApiService, private router: Router) {
		// Setup auth tokens if they exist
		this.getAuthToken();

		if (!this.loggedIn) {
			router.navigate(['/login']);
			// Redirect to login
		} else {
			// Pull user from api
		}
	}

	getAuthToken() {
		this.authJWT = localStorage.getItem('auth-token') || '';
	}

	// Get login state
	get loggedIn(): boolean {
		return this.authJWT !== '';
	}

	login(username: string, password: string) {
		this.apiService.login(username, password).subscribe(pl => {
			console.log(pl);
		})
	}
}
