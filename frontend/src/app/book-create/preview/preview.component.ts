import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";


@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<PreviewComponent>,
              @Inject(MAT_DIALOG_DATA)private data) {
  }

  ngOnInit() {
    console.log(this.data);
    document.getElementById("preview").innerHTML = this.data;
  }

}
