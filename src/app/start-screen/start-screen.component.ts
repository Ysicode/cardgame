import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
  gameId: string;
  constructor(private firestore: AngularFirestore, private router: Router) { }

  buttonAnimation = false;
  ngOnInit(): void {
    this.animateButton();
  }


  newGame() {
    let game = new Game();
    this.firestore
      .collection('games')
      .add(game.toJson())
      .then((gameInfo: any) => {
        this.router.navigateByUrl(gameInfo.id);
        this.gameId = gameInfo.id; 
      });

  }

  animateButton() {
    this.buttonAnimation = true;
    setTimeout(() => {
      this.buttonAnimation = false;
    }, 1000);
    setTimeout(() => {
      this.animateButton();
    }, 2000);
  }
}

