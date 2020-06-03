import { Injectable } from '@angular/core';
import { Player } from '../../models/player';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	public player: Player | undefined = undefined;

	public jwtString = '';

	constructor(private router: Router) {
		// Setup auth tokens if they exist
		this.jwtString = localStorage.getItem('auth_token') || '';
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
		if (!this.player) {
			this.router.navigate(['/login']);
		} else if (this.player.password_reset) {
			this.router.navigate(['/passwordreset']);
		} else {
			this.router.navigate(['/']);
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
		localStorage.removeItem('auth_token');
		this.jwtString = '';
		this.player = undefined;
		this.performRedirects();
	}

	get loginState() {
		if (this.player) {
			if (this.player.password_reset) {
				return 1
			}

			return 2
		}

		return 0
	}

	/**
	 * Check if the localPlayer has a given permission
	 *
	 * @param perm Permission name
	 */
	hasPermission(perm: string) {
		if (!this.player) {
			return false;
		}

		const perms = this.player.permissions;

		const hasAll = perms.some(p => p.name === 'all');
		const hasPerm = perms.some(p => p.name === perm);

		return hasAll || hasPerm;
	}
}
