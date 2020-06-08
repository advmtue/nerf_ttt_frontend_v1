import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class TokenService {
	public token: string | null;

	constructor() {
		// Pull from storage
		this.token = localStorage.getItem('auth_token');
	}

	// Returns if token has been set
	get has() {
		return this.token !== null;
	}

	// Assign token and persist
	set(token: string) {
		this.token = token;
		localStorage.setItem('auth_token', this.token);
	}

	// Unassign token and delete persistence
	unset() {
		this.token = null;
		localStorage.removeItem('auth_token');
	}

	get get() {
		return this.token;
	}
}
