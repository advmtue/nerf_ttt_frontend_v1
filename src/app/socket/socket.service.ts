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
	}

	// socket-event :: connect
	connected = () => {
		this.connectionStatus.next('SOCKET_CONNECT');
	}

	// socket-event :: auth
	authed = () => {
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
	 * Add a route for a given event name
	 *
	 * @param name Event name
	 * @param fn Callback function
	 */
	bindRoute(name: string, fn: (d: any) => any) {
		this.io.on(name, fn);
	}

	/**
	 * Remove rounte for given event name
	 *
	 * @param name Event name
	 */
	clearRoute(name: string) {
		this.io.off(name);
	}

	/**
	 * Send a message over the socket
	 *
	 * @param name Event name
	 * @param data Data object
	 */
	sendMsg(name: string, data: any = {}) {
		this.io.emit(name, data);
	}

	/**
	 * Perform cleanup of authenticated sockets
	 */
	logout() {
		this.io.disconnect();
		this.io.connect();
	}
}
