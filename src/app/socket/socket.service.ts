import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { API_URL } from '../config';

@Injectable({
	providedIn: 'root'
})
export class SocketService {
	public io: SocketIOClient.Socket;

	constructor() {
		this.io = io(API_URL);
	}

	/* add route for a given event name */
	bindRoute(name: string, fn: (d: any) => any) {
		this.io.on(name, fn);
	}

	/* remove routes for a given name */
	clearRoute(name: string) {
		this.io.off(name);
	}

	sendMsg(name: string, data: any = {}) {
		this.io.emit(name, data);
	}
}
