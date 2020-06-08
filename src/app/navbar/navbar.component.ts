import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
	public authLevel: string = 'AUTH_ZERO';

	constructor(
		public auth: AuthService
	) {
		// Subscribe to auth updates
		this.auth.authStatus.subscribe((level) => {
			if (
				level === 'AUTH_PASSWORD_RESET' ||
				level === 'AUTH_FULL' ||
				level === 'AUTH_NONE' ) {
				this.authLevel = level;
			}
		});
	}

	ngOnInit(): void {
	}

}
