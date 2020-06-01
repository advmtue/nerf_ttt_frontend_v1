import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player, PlayerProfile, LobbyPlayer } from '../../models/player';
import { Lobby } from '../../models/lobby';
import { UserService } from '../user/user.service';
import { API_URL } from '../config';
import { WebResponse } from '../../models/response';
import { InitialLogin } from '../../models/auth';

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
	 * Pull the permission list as a string array for a given group name 
	 * @param group Group name
	 */
	groupPermissions(group: string) {
		return this.http.get<WebResponse<string[]>>(this.getUrl(`group/${group}/permissions`));
	}

	/**
	 * Post login credentials for authentication
	 * @param username Username
	 * @param password Password
	 */
	login(username: string, password: string) {
		const loginDetails = {username, password};

		return this.http.post<WebResponse<InitialLogin>>(
			this.getUrl('login'),
			loginDetails
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
		return this.http.get<WebResponse<PlayerProfile>>(this.getUrl('player/' + id));
	}

	/**
	 * Attempt to change password
	 * 
	 * @param currentPassword Current password
	 * @param newPassword New password
	 */
	changePassword(currentPassword: string, newPassword: string) {
		const pwDetails = {currentPassword, newPassword};

		return this.http.put<WebResponse<InitialLogin>>(
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
		return this.http.get<WebResponse<Lobby>>(
			this.getUrl('lobby/' + lobbyId)
		)
	}

	/**
	 * Pull playerlist for a lobby
	 * 
	 * @param lobbyId Lobby ID
	 */
	getLobbyPlayers(lobbyId: number) {
		return this.http.get<WebResponse<LobbyPlayer[]>>(
			this.getUrl('lobby/' + lobbyId + '/players')
		)
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
}
