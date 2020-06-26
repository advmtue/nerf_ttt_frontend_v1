import { Component, OnInit, Input } from '@angular/core';
import { GamePlayer } from '../../models/game';

@Component({
	selector: 'app-game-ingame-reveal',
	templateUrl: './game-ingame-reveal.component.html',
	styleUrls: ['./game-ingame-reveal.component.scss']
})
export class GameIngameRevealComponent implements OnInit {
	@Input('player') player: GamePlayer;

	constructor() { }

	ngOnInit(): void {
	}
}
