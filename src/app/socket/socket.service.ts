import { BehaviorSubject } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
	providedIn: 'root'
})
export class SocketService {
	public io: SocketIOClient.Socket;

	public connectionStatus: BehaviorSubject<string>;

	constructor(
		@Inject('API_URL') private apiUrl: string
	) {
		this.connectionStatus = new BehaviorSubject<string>('SOCKET_NONE');

		this.io = io(this.apiUrl);

		this.io.on('connect', this.connected.bind(this));
		this.io.on('auth', this.authed.bind(this));
		this.io.on('disconnect', this.disconnected.bind(this));
	}


	// socket-event :: disconnect
	disconnected() {
		this.connectionStatus.next('SOCKET_NONE');

		// Attempt to reconnect every second
		let iv = setInterval(() => {
			if (!this.io.connected) {
				console.log('Lost socket. Reconnecting...');
				this.io.connect();
			} else {
				clearInterval(iv);
			}
		}, 1000);
	}

	// socket-event :: connect
	connected() {
		console.log('Socket connected.');
		this.connectionStatus.next('SOCKET_CONNECT');
	}

	// socket-event :: auth
	authed(authStatus: boolean) {
		if (authStatus === false ) {
			return;
		}
		this.connectionStatus.next('SOCKET_READY');
	}

	/**
	 * Send an auth message to the server.
	 *
	 * @param token Auth Token
	 */
	auth(token: string) {
		this.io.emit('auth', token);
	}

	/**
	 * Perform cleanup of authenticated sockets
	 */
	logout() {
		this.io.disconnect();
	}
}
