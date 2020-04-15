import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserProfile } from '../models/user';
import { Lobby } from '../models/lobby';
import { LoginResponse } from '../models/auth';


@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor(private http: HttpClient) { }

	getUrl(url: string) {
		return 'http://localhost:8080/' + url;
	}

	/* POST /login { username: string, password: string } */
	login(username: string, password: string) {
		let loginDetails = {username: username, password: password};

		return this.http.post<LoginResponse>(
			this.getUrl('login'),
			loginDetails
		)
	}

	/* GET /player */
	playerList() {
		return this.http.get<User[]>(this.getUrl('player'));
	}

	/* GET /player/:id */
	playerProfile(id: string) {
		return this.http.get<UserProfile>(this.getUrl('player/' + id));
	}

	/* Get /lobby */
	lobbyList() {
		return this.http.get<Lobby[]>(this.getUrl('lobby'));
	}
}
