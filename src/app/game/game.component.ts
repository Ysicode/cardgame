import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddplayerComponent } from '../dialog-addplayer/dialog-addplayer.component';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  gameId: string;
  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params['identifier'])
      this.gameId = params['identifier'];
      this
        .firestore
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game: any) => {
          console.log('Gameupdate', game);

          this.game.current_player = game.current_player;
          this.game.played_card = game.played_card;
          this.game.players = game.players;
          this.game.stack = game.stack;
          this.game.currentCard = game.currentCard;
          this.game.pickCardAnimation = game.pickCardAnimation;
        })
    });
  }


  newGame() {
    this.game = new Game();
  }


  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      
      this.game.current_player++
      this.game.current_player = this.game.current_player % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.played_card.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1500)
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddplayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }

  saveGame() {
    this
        .firestore
        .collection('games')
        .doc(this.gameId)
        .update(this.game.toJson())
  }

}