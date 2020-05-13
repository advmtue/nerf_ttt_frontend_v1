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
import { GamestatsComponent } from './gamestats/gamestats.component';
import { LobbyComponent } from './lobby/lobby.component';
import { PlayerprofileComponent } from './playerprofile/playerprofile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LobbylistComponent } from './lobbylist/lobbylist.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { LogoutComponent } from './logout/logout.component';

import { ApiService } from './api/api.service';
import { UserService } from './user/user.service';
import { SocketService } from './socket/socket.service';

import { AuthInterceptor } from './auth.interceptor';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		PlayerlistComponent,
		GamehistoryComponent,
		GameComponent,
		GamestatsComponent,
		LobbyComponent,
		PlayerprofileComponent,
		NavbarComponent,
		LobbylistComponent,
		LogoutComponent,
		PasswordresetComponent
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
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
