import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

const redirects = {
	'AUTH_PASSWORD_RESET': '/passwordreset',
	'AUTH_NONE': '/login',
}

@Injectable({
	providedIn: 'root'
})
export class RedirectGuard implements CanActivate {
	constructor (
		private auth: AuthService,
		private router: Router,
	) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Observable<boolean> {
		return new Observable<boolean>(observer => {
			this.auth.authStatus.subscribe(level => {
				// If there's a redirect for this auth level
				if (redirects[level] !== undefined) {
					// If we aren't on it
					if (state.url !== redirects[level]) {
						// Redirect
						this.router.navigate([redirects[level]]);
						observer.next(false);
						return;
					}
					observer.next(true);
					observer.complete();
				} else if (level === 'AUTH_FULL') {
					if (state.url === '/login' || state.url === '/passwordreset') {
						this.router.navigate(['/']);
						observer.next(false);
						return;
					}
					observer.next(true);
					observer.complete();
				}
			});
		});
	}
}
