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

import { LoginGuard } from './login.guard';
import { LogoutGuard } from './logout.guard';
import { PasswordresetGuard } from './passwordreset.guard'
import { RedirectGuard } from './redirect.guard';

const routes: Routes = [
	// Homepage -> Available lobbies
	{ path: '', component: LobbylistComponent, canActivate: [RedirectGuard, LoginGuard] },

	// Player login
	{ path: 'login', component: LoginComponent, canActivate: [RedirectGuard, LogoutGuard] },

	// Logout
	{ path: 'logout', component: LogoutComponent },

	// View game history
	{ path: 'game', component: GamehistoryComponent, canActivate: [RedirectGuard, LoginGuard] },

	// Redirects depending on state
	// Game -> Game or home if not auth
	// Lobby -> LobbyComponent
	{ path: 'game/:id', component: GameviewComponent, canActivate: [RedirectGuard, LoginGuard] },

	// View player list or specific
	{ path: 'user', component: PlayerlistComponent, canActivate: [RedirectGuard, LoginGuard] },
	{ path: 'user/:id', component: PlayerprofileComponent, canActivate: [RedirectGuard, LoginGuard] },

	// Reset password
	{ path: 'passwordreset', component: PasswordresetComponent, canActivate: [RedirectGuard, PasswordresetGuard] }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
