import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	loggedIn: boolean = false;
	user: any;

	constructor(private apiService: ApiService) {
		this.getAuthToken();
	}

	getAuthToken() {
		let token = localStorage.getItem('auth-token');

		if (token === null) {
			console.log('No login session...');
		} else {
			console.log('Found login session');
			// Check expiry
		}
	}

	validateSession() {
	}
}
