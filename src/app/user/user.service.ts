import { Injectable } from '@angular/core';
import { PlayerProfile, PlayerLogin } from '../../models/player';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	// A pulled PlayerProfile from the server
	public player: PlayerProfile | undefined = undefined;

	// PlayerId extracted from any saved JWT
	public playerId: number = -1;

	// JWT saved in localStorage
	public jwtString = '';

	constructor() {
		// Setup auth tokens if they exist
		this.jwtString = localStorage.getItem('auth_token') || '';

		if (this.jwtString !== '') {
			this.playerId = JSON.parse(atob(this.jwtString.split('.')[1])).id || -1;
		}
	}

	getLoginPack(pack: PlayerLogin) {
		// Assign the player profile
		this.player = pack.player;

		// Persist the token
		this.jwt = pack.token;
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
	 * Resets the userService to a default 'no-auth' state
	 */
	logout() {
		localStorage.removeItem('auth_token');
		this.jwtString = '';
		this.player = undefined;
	}

	/**
	 * Define different auth levels
	 *
	 * NONE = No authentication
	 * PASSWORD_RESET = Password reset required
	 * AUTHED = Full authentication
	 * LOADING = Awaiting auth confirmation
	 */
	get authLevel(): string {
		if (!this.player && this.jwtString !== '') {
			return 'LOADING';
		} else if (!this.player) {
			return 'NONE';
		} else if (this.player.password_reset) {
			return 'PASSWORD_RESET';
		} else {
			return 'AUTHED';
		}
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
