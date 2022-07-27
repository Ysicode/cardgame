import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-addplayer',
  templateUrl: './dialog-addplayer.component.html',
  styleUrls: ['./dialog-addplayer.component.scss']
})
export class DialogAddplayerComponent implements OnInit {

  name: string = '';
  constructor(public dialogRef: MatDialogRef<DialogAddplayerComponent>) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
