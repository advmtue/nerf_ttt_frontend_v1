import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { API_URL } from '../config';

@Injectable({
	providedIn: 'root'
})
export class SocketService {
	public io: SocketIOClient.Socket;

	public connectionStatus: BehaviorSubject<string>;

	constructor() {
		this.connectionStatus = new BehaviorSubject<string>('SOCKET_NONE');

		this.io = io(API_URL);

		this.io.on('connect', this.connected);
		this.io.on('auth', this.authed);
		this.io.on('disconnect', this.disconnected);
	}


	// socket-event :: disconnect
	disconnected = () => {
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
	connected = () => {
		console.log('Socket connected.');
		this.connectionStatus.next('SOCKET_CONNECT');
	}

	// socket-event :: auth
	authed = (authStatus: boolean) => {
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
