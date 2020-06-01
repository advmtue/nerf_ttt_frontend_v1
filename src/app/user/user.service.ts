import { Injectable } from '@angular/core';
import { Player } from '../../models/player';
import { Router } from '@angular/router';
import { PlayerJwt, InitialLogin } from '../../models/auth';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	public user: Player | undefined = undefined;
	public permissions: string[] = [];

	// jwt as string
	public jwtString = '';
	// jwt decoded
	public jwtInfo: PlayerJwt | undefined;

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

	/**
	 * Pulls any available JWT from localStorage
	 */
	getLocalItems() {
		this.jwt = localStorage.getItem('auth_token') || '';
	}

	/**
	 * Determines the logged in status of the user and
	 * redirects accordingly:
	 * 
	 * Full login: /
	 * Password reset required: /passwordreset
	 * No auth: /login
	 */
	performRedirects(): void {
		if (this.loginState === 2) {
			this.router.navigate(['/']);
		} else if (this.loginState === 1) {
			this.router.navigate(['/passwordreset']);
		} else {
			this.router.navigate(['/login']);
		}
	}

	/**
	 * Determine the login state of the user
	 */
	get loginState(): number {
		if (this.jwtInfo) {
			return this.jwtInfo.password_reset ? 1 : 2;
		} else {
			return 0;
		}
	}

	/**
	 * Assign JWT and perform persistence.
	 * 
	 * Assigning an empty string removes jwt (effectively logout);
	 * 
	 */
	set jwt(token: string) {
		if (token === '') {
			this.logout();
		} else {
			// Persist the jwt string
			localStorage.setItem('auth_token', token);
			this.jwtString = token;
			// Decode it for use
			this.jwtInfo = JSON.parse(atob(token.split('.')[1]));
		}
	}

	/**
	 * Get the user jwt string
	 */
	get jwt(): string {
		return this.jwtString;
	}

	/**
	 * Clears the user service and redirect to /login
	 */
	logout() {
		this.jwtString = '';
		localStorage.removeItem('auth_token');
		localStorage.removeItem('password_reset');
		this.user = undefined;
		this.performRedirects();
	}

	/**
	 * Check if the localPlayer has a given permission
	 *
	 * @param perm Permission name
	 */
	hasPermission(perm: string) {
		if (this.permissions.indexOf('all') > -1) {
			return true;
		} else {
			return this.permissions.indexOf(perm) > -1;
		}
	}

	getInitialLogin(data: InitialLogin) {
		this.jwt = data.jwt;
		this.user = data.profile;
		this.permissions = data.permissions;
	}
}
