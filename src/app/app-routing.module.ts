import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PlayerlistComponent } from './playerlist/playerlist.component';
import { GamehistoryComponent } from './gamehistory/gamehistory.component';
import { LobbylistComponent } from './lobbylist/lobbylist.component';
import { PlayerprofileComponent } from './playerprofile/playerprofile.component';
import { LogoutComponent } from './logout/logout.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { GameviewComponent } from './gameview/gameview.component';

/**
 * Guards
 */
import { LoginGuard } from './login.guard';
import { LogoutGuard } from './logout.guard';
import { PasswordresetGuard } from './passwordreset.guard'
import { RedirectGuard } from './redirect.guard';

const routes: Routes = [
	// Homepage -> Available lobbies
	{ path: 'lobby', component: LobbylistComponent, canActivate: [RedirectGuard, LoginGuard] },
	{ path: '', pathMatch: 'full', redirectTo: '/lobby' },

	// Authentication specific
	{ path: 'login', component: LoginComponent, canActivate: [RedirectGuard, LogoutGuard] },
	{ path: 'logout', component: LogoutComponent },
	{ path: 'passwordreset', component: PasswordresetComponent, canActivate: [RedirectGuard, PasswordresetGuard] },

	// TODO Child routes
	{ path: 'game', component: GamehistoryComponent, canActivate: [RedirectGuard, LoginGuard] },
	{ path: 'game/:id', component: GameviewComponent, canActivate: [RedirectGuard, LoginGuard] },

	// TODO Child routes
	{ path: 'player', component: PlayerlistComponent, canActivate: [RedirectGuard, LoginGuard] },
	{ path: 'player/:id', component: PlayerprofileComponent, canActivate: [RedirectGuard, LoginGuard] },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
