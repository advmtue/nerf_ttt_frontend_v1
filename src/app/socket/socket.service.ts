import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { API_URL } from '../config';
import { UserService } from '../user/user.service';

@Injectable({
	providedIn: 'root'
})
export class SocketService {
	public io: SocketIOClient.Socket;
	public authed = false;

	constructor(private userService: UserService) {
		this.io = io(API_URL);
		this.io.on('connect', this.connected)
		this.io.on('auth', this.auth);
		this.io.on('debug', console.log);
	}

	/**
	 * On connection, attempt to auth the websocket
	 */
	connected = () => {
		this.io.emit('auth', this.userService.jwtString)
	}

	/**
	 * Server response from auth
	 *
	 * @param status Auth status
	 */
	auth = (status: boolean) => {
		if (status) {
			console.log('Successfully authed websocket');
			this.authed = true;
		} else {
			console.log('Failed to auth websocket');
		}
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
}
