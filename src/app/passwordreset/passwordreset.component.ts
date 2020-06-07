import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-passwordreset',
	templateUrl: './passwordreset.component.html',
	styleUrls: ['./passwordreset.component.scss']
})

export class PasswordresetComponent implements OnInit {

	public currentPassword = '';
	public currentPasswordError = 'valid';

	public newPassword = '';
	public newPasswordError = 'valid';

	public confirmPassword = '';
	public confirmPasswordError = 'valid';

	constructor(
		private api: ApiService,
		private user: UserService,
		private router: Router,
	) { }

	ngOnInit(): void {
	}

	get passwordsFilledOut(): boolean {
		return this.currentPassword !== '' &&
			this.newPassword !== '' &&
			this.confirmPassword !== '';
	}

	submitChangePassword() {
		// Set errors for any missing inputs
		if (this.currentPassword === '') {
			this.currentPasswordError = 'Please enter current password';
		}

		if (this.newPassword === '') {
			this.newPasswordError = 'Please enter new password';
		}

		if (this.confirmPassword === '') {
			this.confirmPasswordError = 'Please enter password confirmation';
		}

		// Ensure that after this, all password inputs have got some input
		if (!this.passwordsFilledOut) {
			return;
		}

		// If the new password and confirmations don't match, fail
		if (this.newPassword !== this.confirmPassword) {
			this.confirmPasswordError = 'New password and confirmation do not match';
			return;
		}

		// Attempt to reset password
		this.api.changePassword(this.currentPassword, this.newPassword)
			.subscribe(response => {
				if (!response.status.success) {
					this.currentPasswordError = 'Current password does not match records';
					console.log('Passwor change error...');
					console.log(response.status.msg);
					return;
				}

				this.user.player.password_reset = false;

				// Redirect to the homepage
				// TODO: Redirect to originally requested page?
				this.router.navigate(['/']);
			});
	}
}
