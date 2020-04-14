import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	loggedIn: boolean = false;
	user: any;
	sessionId: string;

	constructor(private apiService: ApiService) {
		this.getSessionFromLocal();
	}

	getSessionFromLocal() {
	}

	validateSession() {
	}
}
