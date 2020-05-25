import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserProfile } from '../../models/user';
import { Lobby, CreateLobbyResponse } from '../../models/lobby';
import { LoginResponse, PasswordResetResponse } from '../../models/auth';
import { UserService } from '../user/user.service';
import { API_URL } from '../config';

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

	/* Get group permissions */
	groupPermissions(group: string) {
		return this.http.get<string[]>(this.getUrl(`group/${group}/permissions`));
	}

	/* POST /login { username: string, password: string } */
	login(username: string, password: string) {
		const loginDetails = {username, password};

		return this.http.post<LoginResponse>(
			this.getUrl('login'),
			loginDetails
		);
	}

	/* GET /player */
	playerList() {
		return this.http.get<User[]>(this.getUrl('player'));
	}

	/* GET /player/:id */
	playerProfile(id: string) {
		return this.http.get<UserProfile>(this.getUrl('player/' + id));
	}

	// Change a users password
	changePassword(currentPassword: string, newPassword: string) {
		const pwDetails = {currentPassword, newPassword};

		return this.http.post<PasswordResetResponse>(
			this.getUrl('passwordreset'),
			pwDetails
		);
	}

	createLobby(lobbyName: string) {
		return this.http.post<CreateLobbyResponse>(
			this.getUrl('lobby'),
			{name: lobbyName}
		)
	}

	adminCloseLobby(lobbyId: number) {
		return this.http.delete<boolean>(
			this.getUrl('lobby/' + lobbyId + '/admin')
		)
	}

	getLobby(lobbyId: number) {
		return this.http.get<Lobby>(
			this.getUrl('lobby/' + lobbyId)
		)
	}

	getLobbyPlayers(lobbyId: number) {
		return this.http.get<User[]>(
			this.getUrl('lobby/' + lobbyId + '/players')
		)
	}

	joinLobby(lobbyId: number) {
		return this.http.get<boolean>(
			this.getUrl(`lobby/${lobbyId}/join`)
		);
	}

	leaveLobby(lobbyId: number) {
		return this.http.get<boolean>(
			this.getUrl(`lobby/${lobbyId}/leave`)
		);
	}
}
