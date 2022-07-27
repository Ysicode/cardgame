import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddplayerComponent } from '../dialog-addplayer/dialog-addplayer.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;

  game: Game;
  currentCard: string = '';
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      this.game.played_card.push(this.currentCard);
      this.game.current_player++
      this.game.current_player = this.game.current_player % this.game.players.length;

      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 1500)
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddplayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
      
    });
  }

}
