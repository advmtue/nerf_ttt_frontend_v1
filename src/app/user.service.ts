import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
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

	constructor(private apiService: ApiService, private router: Router) {
		// Setup auth tokens if they exist
		this.getLocalItems();

		if (this.loginState === 0) {
			router.navigate(['/login']);
			// Redirect to login
		} else if (this.loginState === 1) {
			router.navigate(['/passwordreset']);
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

	// Populate class field by pulling from localStorage
	getLocalItems() {
		this.authJWT = localStorage.getItem('auth_token') || '';
		this.passwordResetRequired = localStorage.getItem('password_reset') === 'true';
	}

	get loginState(): number {
		if (this.authJWT !== '') {
			return this.passwordResetRequired ? 1 : 2;
		} else {
			return 0;
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

	login(username: string, password: string, cb) {
		this.apiService.login(username, password)
		.subscribe((response: LoginResponse) => {
			if (response.success) {
				localStorage.setItem('auth_token', response.token);
				this.authJWT = response.token;
			}
			this.passwordReset = response.passwordReset;
			console.log(`Login Success? : ${response.success}`);
			cb(response);
		});
	}

	changePassword(currentPassword: string, newPassword: string, cb) {
		this.apiService.changePassword(currentPassword, newPassword)
		.subscribe((response: PasswordResetResponse) => {
			if (response.success) {
				this.passwordReset = false;
				this.router.navigate(['/']);
			}
			cb(response);
		});
	}

	logout() {
		this.authJWT = '';
		localStorage.removeItem('auth_token');
		localStorage.removeItem('password_reset');
		this.user = undefined;
	}
}
