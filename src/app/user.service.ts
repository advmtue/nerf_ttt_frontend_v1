import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { PasswordResetResponse, LoginResponse } from '../models/auth';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	public user: User | undefined = undefined;

	private passwordResetRequired = false;
	private authJWT = '';

	constructor(private router: Router) {
		// Setup auth tokens if they exist
		this.getLocalItems();

		if (this.loginState === 0) {
			router.navigate(['/login']);
			// Redirect to login
		} else if (this.loginState === 1) {
			router.navigate(['/passwordreset']);
		}
	}

	// Populate class field by pulling from localStorage
	getLocalItems() {
		this.authJWT = localStorage.getItem('auth_token') || '';
		this.passwordResetRequired = localStorage.getItem('password_reset') === 'true';
	}

	performRedirects(): void {
		if (this.loginState === 2) {
			this.router.navigate(['/']);
		} else if (this.loginState === 1) {
			this.router.navigate(['/passwordreset']);
		} else {
			this.router.navigate(['/login']);
		}
	}

	get loginState(): number {
		if (this.authJWT !== '') {
			return this.passwordResetRequired ? 1 : 2;
		} else {
			return 0;
		}
	}

	set jwt(token: string) {
		if (token === '') {
			localStorage.removeItem('auth_token');
			this.authJWT = '';
		} else {
			localStorage.setItem('auth_token', token);
			this.authJWT = token;
		}
	}

	get jwt(): string {
		return this.authJWT;
	}

	get passwordReset(): boolean {
		return this.passwordResetRequired;
	}

	set passwordReset(val: boolean) {
		if (val) {
			localStorage.setItem('password_reset', val.toString());
		} else {
			localStorage.removeItem('password_reset');
		}
		this.passwordResetRequired = val;
	}

	logout() {
		this.authJWT = '';
		localStorage.removeItem('auth_token');
		localStorage.removeItem('password_reset');
		this.user = undefined;
	}
}
