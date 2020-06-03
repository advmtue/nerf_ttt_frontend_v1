import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from './user/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private userService: UserService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		// If the user has a valid login state, add jwt to headers
		if(this.userService.jwtString !== '') {
			request = request.clone({
				setHeaders: {
					authorization: `${this.userService.jwtString}`
				}
			});
		}
		return next.handle(request);
	}
}
