import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-new-issue',
  templateUrl: './new-issue.component.html',
  styleUrls: ['./new-issue.component.css']
})
export class NewIssueComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewIssueComponent>,
              @Inject(MAT_DIALOG_DATA)public data: string) { }

  ngOnInit() {
  }

}
