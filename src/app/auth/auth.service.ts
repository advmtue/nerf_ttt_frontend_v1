import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { SocketService } from '../socket/socket.service';
import { TokenService } from '../token/token.service';
import { PlayerLogin } from '../../models/player';

/**
 * Roles of the Auth Service:
 *
 * Early establishment of socket and user.
 * Define what current auth state the app is in.
 *
 * This service should be used to notify the main app.component
 */

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	public authStatus: BehaviorSubject<string>;

	private userReady = false;
	private socketReady = false;

	constructor(
		private token: TokenService,
		private user: UserService,
		private socket: SocketService,
	) {
		this.authStatus = new BehaviorSubject<string>('AUTH_UNDEF');

		this.authSocket();
		this.authUser();
	}

	// Check the entire auth status
	checkReady() {
		if (this.userReady && this.socketReady) {
			this.authStatus.next('AUTH_FULL');
		}
	}

	// Perform connection/auth on socket
	authSocket() {
		// Subscribe to socket status changes
		this.socket.connectionStatus.subscribe((authLevel: string) => {
			if (authLevel === 'SOCKET_CONNECT') {
				this.socket.auth(this.token.get);
			} else if (authLevel === 'SOCKET_READY') {
				this.authStatus.next('AUTH_SOCKET');
				this.socketReady = true;
				this.checkReady();
			} else if (authLevel === 'SOCKET_NONE') {
				this.socketReady = false;
				// Reconnect
			}
		});
	}

	// Perform authentication on the user
	authUser() {
		this.user.loginStatus.subscribe((authLevel: string) => {
			if (authLevel === 'PLAYER_FULL') {
				this.authStatus.next('AUTH_PLAYER');
				this.userReady = true;
				this.checkReady();
			} else if (authLevel === 'PLAYER_NONE') {
				this.authStatus.next('AUTH_NONE');
				this.userReady = false;
			} else if (authLevel === 'PLAYER_PASSWORD_RESET') {
				this.authStatus.next('AUTH_PASSWORD_RESET');
			}
		});
	}

	auth(pack: PlayerLogin) {
		// Update token
		this.token.set(pack.token);

		// Update user
		this.user.setPlayer(pack.player);

		// Auth socket
		this.socket.auth(pack.token);
	}

	logout() {
		// Log everything out
		this.user.logout();
		this.socket.logout();
		this.token.unset();
	}
}
