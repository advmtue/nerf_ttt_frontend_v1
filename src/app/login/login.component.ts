import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

	public username: string;
	public password: string;

	public usernameError: string = "valid";
	public passwordError: string = "valid";
	public error: string = "valid";

	constructor(
		private apiService: ApiService,
		private userService: UserService,
		private router: Router
	) { }

	ngOnInit(): void {
	}

	submitLogin() {

		let shouldFail: Boolean = false;

		// Basic validation
		if (!(this.username) || this.username === "") {
			this.usernameError = "Please enter username";
			shouldFail = true;
		} else {
			this.usernameError = "valid";
		}

		if (!(this.password) || this.password === "") {
			this.passwordError = "Please enter password";
			shouldFail = true;
		} else {
			this.passwordError = "valid"
		}

		if (shouldFail) return;

		this.userService.login(this.username, this.password, (result: Boolean) => {
			if (result) {
				this.router.navigate(['/']);
			} else {
				this.error = 'Invalid username/password';
			}
		});
	}

}
