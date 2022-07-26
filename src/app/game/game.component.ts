import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddplayerComponent } from '../dialog-addplayer/dialog-addplayer.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  gameId: string;
  gameOver = false;
  gameStart = true;
  addedPlayer = false;
  nextPlayer = false;
  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId = params['identifier'];
    
      this
        .firestore
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game: any) => {
          this.game.current_player = game.current_player;
          this.game.played_card = game.played_card;
          this.game.players = game.players;
          this.game.player_images = game.player_images;
          this.game.stack = game.stack;
          this.game.currentCard = game.currentCard;
          this.game.pickCardAnimation = game.pickCardAnimation;
        })
    });
    setTimeout(() => {
      this.checkGameIsStarted();
    }, 700);
  }

  newGame() {
    this.game = new Game();
    setInterval(() => {
      this.setnewStyle();
    }, 5);
  }

  checkGameIsStarted() {
    if (this.game.players.length > 0) {
      this.gameStart = true;
    } else {
      this.gameStart = false;
    }
  }

  takeCard() {
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.game.current_player++
      this.game.current_player = this.game.current_player % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.played_card.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 20);
    }

    setTimeout(() => {
      this.nextPlayer = false;
    }, 2000);
  }

  closeInfo() {
    this.nextPlayer = true;
  }

  openInfo() {
    this.nextPlayer = false;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddplayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_images.push('male.png');
        this.saveGame();
        this.addedPlayer = true;
      }
    });
  }

  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((image: string) => {
      if (image) {
        if (image == 'Delete') {
          this.game.player_images.splice(playerId, 1);
          this.game.players.splice(playerId, 1);
          setTimeout(() => {
            window.location.reload();
          }, 500)
        } else {
          this.game.player_images[playerId] = image;
        }
        this.saveGame();
      }
    });
  }

  setnewStyle() {
    let player = Array.from(document.getElementsByClassName('players'));
    this.setLeftPlayers(player);
    this.setRightPlayers(player);
  }

  setRightPlayers(player: any) {
    for (let i = 0; i < player.length; i += 2) {
      let playerName = player[i];
      playerName.classList.add(`margin_top${i}`);
      setTimeout(() => {
        playerName.classList.add('opacity');
      }, 200);
    }
  }

  setLeftPlayers(player: any) {
    for (let i = 1; i < player.length; i += 2) {
      let playerName = player[i];
      playerName.classList.add('players_left');
      playerName.classList.add(`margin_top${i}`);
      setTimeout(() => {
        playerName.classList.add('opacity');
      }, 200);
    }
  }

  saveGame() {
    this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson())
  }

  playGame() {
    this.gameStart = true;
    this.checkGameIsStarted();
  }

}