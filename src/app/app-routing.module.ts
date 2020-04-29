import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PlayerlistComponent } from './playerlist/playerlist.component';
import { GamehistoryComponent } from './gamehistory/gamehistory.component';
import { GamestatsComponent } from './gamestats/gamestats.component';
import { GameComponent } from './game/game.component';
import { LobbylistComponent } from './lobbylist/lobbylist.component';
import { LobbyComponent } from './lobby/lobby.component';
import { PlayerprofileComponent } from './playerprofile/playerprofile.component';
import { LogoutComponent } from './logout/logout.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';

import { LoginGuard } from './login.guard';
import { PasswordresetGuard } from './passwordreset.guard';

const routes: Routes = [
	// Homepage -> Available lobbies
	{ path: '', component: LobbylistComponent, canActivate: [LoginGuard]},

	// Player login
	{ path: 'login', component: LoginComponent },

	// Logout
	{ path: 'logout', component: LogoutComponent},

	// View game history
	{ path: 'game', component: GamehistoryComponent, canActivate: [LoginGuard] },
	// Redirects depending on state
	// Game -> Game or home if not auth
	// Lobby -> LobbyComponent
	// Ended -> Gamestats
	{ path: 'game/:id', component: LobbyComponent, canActivate: [LoginGuard] },
	{ path: 'game/:id/stats', component: GamestatsComponent, canActivate: [LoginGuard] },
	{ path: 'game/:id/active', component: GameComponent, canActivate: [LoginGuard] },
	{ path: 'game/:id/lobby', component: LobbyComponent, canActivate: [LoginGuard] },

	// View player list or specific
	{ path: 'user', component: PlayerlistComponent, canActivate: [LoginGuard] },
	{ path: 'user/:id', component: PlayerprofileComponent, canActivate: [LoginGuard] },

	// Reset password
	{ path: 'passwordreset', component: PasswordresetComponent, canActivate: [PasswordresetGuard]}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
