import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../../models/auth';
import { WebResponse } from '../../models/response';

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

		this.apiService.login(this.username, this.password)
		.subscribe((response) => {
			if (response.status.success) {
				this.userService.jwt = response.data.token;
				this.userService.passwordReset = response.data.passwordReset;
				this.userService.performRedirects();
			} else {
				this.error = 'Invalid credentials';
			}
		});
	}
}
