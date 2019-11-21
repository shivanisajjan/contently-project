import {Component, Inject, OnInit, } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-add-new-section',
  templateUrl: './add-new-section.component.html',
  styleUrls: ['./add-new-section.component.css']
})
export class AddNewSectionComponent implements OnInit {

  constructor(
              public dialogRef: MatDialogRef<AddNewSectionComponent>,
              @Inject(MAT_DIALOG_DATA)public data: String) { }

  ngOnInit() {
  }
}
