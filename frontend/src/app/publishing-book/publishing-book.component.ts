import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA}from '@angular/material/dialog';


@Component({
  selector: 'app-publishing-book',
  templateUrl: './publishing-book.component.html',
  styleUrls: ['./publishing-book.component.css']
})
export class PublishingBookComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PublishingBookComponent>,
  @Inject (MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  console.log(this.data)
  }

}
