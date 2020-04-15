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

const routes: Routes = [
	// Homepage -> Available lobbies
	{ path: '', component: LobbylistComponent },

	// Player login
	{ path: 'login', component: LoginComponent },

	// View game history
	{ path: 'game', component: GamehistoryComponent },
	// Redirects depending on state
	// Game -> Game or home if not auth
	// Lobby -> LobbyComponent
	// Ended -> Gamestats
	{ path: 'game/:id', component: LobbyComponent },
	{ path: 'game/:id/stats', component: GamestatsComponent },
	{ path: 'game/:id/active', component: GameComponent },
	{ path: 'game/:id/lobby', component: LobbyComponent },

	// View player list or specific
	{ path: 'user', component: PlayerlistComponent },
	{ path: 'user/:id', component: PlayerprofileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
