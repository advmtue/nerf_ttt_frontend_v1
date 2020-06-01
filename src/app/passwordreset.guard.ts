import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user/user.service';

@Injectable({
	providedIn: 'root'
})
export class PasswordresetGuard implements CanActivate {
	constructor(private userService: UserService) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
			if (this.userService.jwtInfo) {
				return this.userService.jwtInfo.password_reset;
			} else {
				return false;
			}
		}

}
