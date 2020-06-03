import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player, PlayerProfile } from '../../models/player';
import { Lobby, LobbyComplete } from '../../models/lobby';
import { UserService } from '../user/user.service';
import { API_URL } from '../config';
import { WebResponse } from '../../models/response';
import { Game } from 'src/models/game';
import { PlayerLogin } from '../../models/player';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	constructor(
		private http: HttpClient,
		private userService: UserService
	) {}

	getUrl(url: string) {
		return API_URL + url;
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

	getPlayer(playerId: number) {
		return this.http.get<WebResponse<Player>>(
			this.getUrl(`player/${playerId}`)
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
	playerProfile(id: number | string) {
		return this.http.get<WebResponse<PlayerProfile>>(
			this.getUrl(`player/${id}/profile`)
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
	 * Attempt to create a new lobby
	 * 
	 * @param lobbyName Lobby name
	 */
	createLobby(lobbyName: string) {
		return this.http.post<WebResponse<Lobby>>(
			this.getUrl('lobby'),
			{name: lobbyName}
		)
	}

	/**
	 * As an admin, attempt to force close a lobby
	 * 
	 * @param lobbyId ID of corresponding lobby
	 */
	adminCloseLobby(lobbyId: number) {
		return this.http.delete<WebResponse<boolean>>(
			this.getUrl('lobby/' + lobbyId + '/admin')
		)
	}

	/**
	 * Pull a lobby by ID
	 *
	 * @param lobbyId Lobby ID
	 */
	getLobby(lobbyId: number) {
		return this.http.get<WebResponse<LobbyComplete>>(
			this.getUrl('lobby/' + lobbyId)
		)
	}

	whoAmI() {
		return this.http.get<WebResponse<Player>>(
			this.getUrl('player/self')
		);
	}

	joinLobby(lobbyId: number) {
		return this.http.get<WebResponse<boolean>>(
			this.getUrl(`lobby/${lobbyId}/join`)
		);
	}

	leaveLobby(lobbyId: number) {
		return this.http.get<WebResponse<boolean>>(
			this.getUrl(`lobby/${lobbyId}/leave`)
		);
	}

	setReadyStatus(lobbyId: number, status: boolean) {
		const urlEnd = status ? 'ready' : 'unready';
		const endpoint = this.getUrl(`lobby/${lobbyId}/${urlEnd}`);

		return this.http.get<WebResponse<boolean>>(endpoint);
	}

	startLobby(lobbyId: number) {
		return this.http.put<WebResponse<undefined>>(
			this.getUrl(`lobby/${lobbyId}/start`), {}
		);
	}

	getGame(gameId: number) {
		return this.http.get<WebResponse<Game>>(
			this.getUrl(`game/${gameId}`)
		)
	}
}
