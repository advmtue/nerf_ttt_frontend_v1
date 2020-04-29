import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from './user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private userService: UserService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		// If the user has a valid login state, add jwt to headers
		if (this.userService.loginState > 0) {
			request = request.clone({
				setHeaders: {
					authorization: `${this.userService.jwt}`
				}
			});
		}
		return next.handle(request);
	}
}