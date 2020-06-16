import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PlayerlistComponent } from './playerlist/playerlist.component';
import { GamehistoryComponent } from './gamehistory/gamehistory.component';
import { GameComponent } from './game/game.component';
import { LobbyComponent } from './lobby/lobby.component';
import { PlayerprofileComponent } from './playerprofile/playerprofile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LobbylistComponent } from './lobbylist/lobbylist.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { LogoutComponent } from './logout/logout.component';

import { ApiService } from './api/api.service';
import { UserService } from './user/user.service';
import { SocketService } from './socket/socket.service';
import { AuthService } from './auth/auth.service';
import { TokenService } from './token/token.service';

import { AuthInterceptor } from './auth.interceptor';
import { PlayerNameComponent } from './player-name/player-name.component';
import { GameviewComponent } from './gameview/gameview.component';
import { PlayerNameGameComponent } from './player-name-game/player-name-game.component';
import { GameIngameComponent } from './game-ingame/game-ingame.component';
import { DateCountdownComponent } from './date-countdown/date-countdown.component';
import { SecondCountdownComponent } from './second-countdown/second-countdown.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		PlayerlistComponent,
		GamehistoryComponent,
		GameComponent,
		LobbyComponent,
		PlayerprofileComponent,
		NavbarComponent,
		LobbylistComponent,
		LogoutComponent,
		PasswordresetComponent,
		PlayerNameComponent,
		GameviewComponent,
		PlayerNameGameComponent,
		GameIngameComponent,
		DateCountdownComponent,
		SecondCountdownComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule
	],
	providers: [
		ApiService,
		UserService,
		SocketService,
		AuthService,
		TokenService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
