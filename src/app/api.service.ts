import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

		return this.http.post(
			this.getUrl('login'),
			loginDetails
		)
	}

	/* GET /player */
	playerList() {
		return this.http.get(this.getUrl('player'));
	}

	/* GET /player/:id */
	playerProfile(id: string) {
		return this.http.get(this.getUrl('player/' + id));
	}

	/* Get /lobby */
	lobbyList() {
		return this.http.get(this.getUrl('lobby'));
	}
}
