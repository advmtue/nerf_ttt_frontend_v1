import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {


	username: string;
	password: string;

	usernameError: string = "valid";
	passwordError: string = "valid";

	loginStatus: string = "Login";

	constructor() { }

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

		this.loginStatus = "Logging in...";

		// Perform submission....
		// TODO: Add service worker
		loginform.reset()
	}

}
