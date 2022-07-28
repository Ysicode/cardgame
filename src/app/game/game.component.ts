import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddplayerComponent } from '../dialog-addplayer/dialog-addplayer.component';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  item$: Observable<any[]>;
  pickCardAnimation = false;
  todos$: Observable<any>;
  game: Game;
  currentCard: string = '';
  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params['identifier'])
      this
        .firestore
        .collection('games')
        .doc(params['identifier'])
        .valueChanges()
        .subscribe((alw: any) => {
          console.log('Gameupdate', alw);

          this.game.current_player = alw.current_player;
          this.game.played_card = alw.played_card;
          this.game.players = alw.players;
          this.game.stack = alw.stack;
        })
    });
  }


  newGame() {
    this.game = new Game();
    //this.firestore
    //.collection('games')
    //.add({'Hallo': 'Welt'})
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