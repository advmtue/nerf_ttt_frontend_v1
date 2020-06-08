import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlayerProfile, PlayerLogin } from '../../models/player';
import { TokenService } from '../token/token.service';
import { ApiService } from '../api/api.service';
import { WebResponse } from '../../models/response';

/**
 * AUTH LEVELS
 *
 * PLAYER_ZERO = init
 * PLAYER_NONE = no login
 * PLAYER_PASSWORD_RESET = Password reset required
 * PLAYER_FULL = full player
 */
@Injectable({
	providedIn: 'root'
})
export class UserService {
	public player: PlayerProfile | undefined = undefined;

	public loginStatus: BehaviorSubject<string>;

	constructor(
		private token: TokenService,
		private api: ApiService,
	) {
		this.loginStatus = new BehaviorSubject<string>('PLAYER_ZERO');

		if (this.token.has) {
			// Pull player information
			this.getLogin();
		} else {
			this.loginStatus.next('PLAYER_NONE');
		}
	}

	/**
	 *  Pull login information from API.
	 *  Exchange auth token for player login pack.
	 */
	getLogin() {
		this.api.authenticate(this.token.get)
		.subscribe((response: WebResponse<PlayerLogin>) => {
			if (!response.status.success) {
				console.log(response.status.msg);
				this.loginStatus.next('PLAYER_NONE');
				return;
			}

			this.setPlayer(response.data.player);
		});
	}


	/**
	 * Resets the userService to a default 'no-auth' state
	 */
	logout() {
		this.player = undefined;
		this.loginStatus.next('PLAYER_NONE');
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

	/**
	 * Set localPlayer and update loginStatus
	 *
	 * @param player Profile
	 */
	setPlayer(player: PlayerProfile) {
		this.player = player;

		if (this.player.password_reset) {
			this.loginStatus.next('PLAYER_PASSWORD_RESET');
		} else {
			this.loginStatus.next('PLAYER_FULL');
		}
	}
}
