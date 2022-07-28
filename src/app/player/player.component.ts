import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() name: string;
  @Input() playerActive: boolean = false;
  @Input() more4Player: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  

}
