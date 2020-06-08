import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
	providedIn: 'root'
})
export class LoginGuard implements CanActivate {
	constructor (
		private auth: AuthService,
	) { }

	canActivate(): Observable<boolean> {
		return new Observable<boolean>((observer) => {
			this.auth.authStatus.subscribe(level => {
				if (level === 'AUTH_FULL') {
					observer.next(true);
					observer.complete();
				}
	 		});
		});
	}
}
