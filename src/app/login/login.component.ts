import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { WebResponse } from '../../models/response';
import { PlayerLogin } from '../../models/player';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

	public username: string;
	public password: string;

	public usernameError = 'valid';
	public passwordError = 'valid';
	public error = 'valid';

	constructor(
		private apiService: ApiService,
		private userService: UserService,
		private router: Router
	) { }

	ngOnInit(): void {
	}

	submitLogin() {

		let shouldFail = false;

		// Basic validation
		if (!(this.username) || this.username === '') {
			this.usernameError = 'Please enter username';
			shouldFail = true;
		} else {
			this.usernameError = 'valid';
		}

		if (!(this.password) || this.password === '') {
			this.passwordError = 'Please enter password';
			shouldFail = true;
		} else {
			this.passwordError = 'valid';
		}

		if (shouldFail) {
			return;
		}

		// Reset error
		this.error = '';

		// Login returns a user JWT
		this.apiService.login(this.username, this.password)
		.subscribe(this.getLogin);
	}

	/**
	 * Get the InitialLogin package
	 *
	 * Setups the the user service, then requests redirects
	 */
	getLogin = (response: WebResponse<PlayerLogin>) => {
		if (!response.status.success) {
			// Login failed
			this.error = 'Invalid credentials';
			return;
		}

		// Assign the JWT to the user service
		this.userService.jwt = response.data.token;

		// Assign the player to the user service
		this.userService.player = response.data.player;

		// Determine the login state
		if (this.userService.authLevel === 'AUTHED') {
			// Navigate home
			console.log('Successful authentication. Redirecting home');
			this.router.navigate(['/']);
		} else {
			// Redirect to the password reset page
			console.log('Successful authentication. Password reset required');
			this.router.navigate(['/passwordreset']);
		}

	}
}
