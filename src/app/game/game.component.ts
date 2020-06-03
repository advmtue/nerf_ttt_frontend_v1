import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Game } from '../../models/game';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  public game: Game | undefined = undefined;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    public user: UserService,
  ) {
    this.route.paramMap.subscribe(params => {
      this.gameId = Number(params.get('id'));
    })
  }

  set gameId(id: number) {
    this.api.getGame(id)
    .subscribe(response => {
      if (response.status.success) {
        this.game = response.data;
      }
    });
  }

  ngOnInit(): void {
  }

}
