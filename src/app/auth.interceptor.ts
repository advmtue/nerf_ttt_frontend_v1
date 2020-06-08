import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenService } from './token/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private token: TokenService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		// If a token is available, add it to all requests
		if (this.token.has) {
			request = request.clone({
				setHeaders: {
					authorization: this.token.get,
				}
			});
		}

		return next.handle(request);
	}
}
