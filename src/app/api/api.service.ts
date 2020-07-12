import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player, PlayerProfile } from '../../models/player';
import { WebResponse } from '../../models/response';
import { Game } from 'src/models/game';
import { PlayerLogin } from '../../models/player';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	constructor(
		private http: HttpClient,
		@Inject('API_URL') private apiUrl: string,
	) {}

	getUrl(url: string) {
		return this.apiUrl + url;
	}

	/**
	 * Post login credentials for authentication
	 * @param username Username
	 * @param password Password
	 */
	login(username: string, password: string) {
		const loginDetails = {username, password};

		return this.http.post<WebResponse<PlayerLogin>>(
			this.getUrl('login'),
			loginDetails
		);
	}

	startLobby(gameId: number) {
		return this.http.put<WebResponse<undefined>>(
			this.getUrl(`game/${gameId}/start`), {}
		);
	}

	/**
	 * Exchange a token for PlayerLogin
	 * @param User auth token
	 */
	authenticate(token: string) {
		return this.http.post<WebResponse<PlayerLogin>>(
			this.getUrl('authenticate'),
			{token: token}
		);
	}

	/**
	 * Pull the player listing
	 */
	playerList() {
		return this.http.get<WebResponse<Player[]>>(this.getUrl('player'));
	}

	/**
	 * Get a player's profile
	 *
	 * @param id Player ID
	 */
	getPlayerProfile(id: number | string) {
		return this.http.get<WebResponse<PlayerProfile>>(
			this.getUrl(`player/${id}`)
		);
	}

	/**
	 * Attempt to change password
	 *
	 * @param currentPassword Current password
	 * @param newPassword New password
	 */
	changePassword(currentPassword: string, newPassword: string) {
		const pwDetails = {currentPassword, newPassword};

		return this.http.put<WebResponse<undefined>>(
			this.getUrl('login'),
			pwDetails
		);
	}

	/**
	 * Attempt to create a new game (in lobby state)
	 *
	 * @param name Game name
	 */
	createGame(name: string) {
		return this.http.post<WebResponse<Game>>(
			this.getUrl('game'),
			{name: name}
		)
	}

	/**
	 * As an admin, attempt to force close a game
	 *
	 * @param gameId Game ID
	 */
	adminCloseGame(gameId: number) {
		return this.http.delete<WebResponse<boolean>>(
			this.getUrl('game/' + gameId + '/admin')
		)
	}

	/**
	 * Pull a game by ID
	 *
	 * @param gameId Game ID
	 */
	getGame(gameId: number) {
		return this.http.get<WebResponse<Game>>(
			this.getUrl('game/' + gameId)
		)
	}

	/* Join a game */
	joinGame(gameId: number) {
		return this.http.put<WebResponse<boolean>>(
			this.getUrl(`game/${gameId}/join`),
			{}
		);
	}

	// Leavea  game
	leaveGame(gameId: number) {
		return this.http.put<WebResponse<boolean>>(
			this.getUrl(`game/${gameId}/leave`), {}
		);
	}

	// Set ready = true
	gameSetReady(gameId: number) {
		return this.http.put<WebResponse<boolean>>(
			this.getUrl(`game/${gameId}/ready`), {}
		);
	}

	// Set ready = false
	gameSetUnready(gameId: number) {
		return this.http.put<WebResponse<boolean>>(
			this.getUrl(`game/${gameId}/unready`), {}
		)
	}
}
