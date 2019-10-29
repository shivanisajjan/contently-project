import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-editor-dashboard',
  templateUrl: './editor-dashboard.component.html',
  styleUrls: ['./editor-dashboard.component.css']
})
export class EditorDashboardComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  editDialog(): void{
    const dialogRef = this.dialog.open(ChaptersDialog, {
      width: '70%',
      autoFocus: false,
      maxHeight: '90vh',
      height:'60%'

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}


@Component({
  selector: 'chapters-dialog',
  templateUrl: 'chapters-dialog.html',
  styleUrls: ['./chapters-dialog.component.css']

})
export class ChaptersDialog {
  percentDone: number;
  uploadSuccess: boolean;
  constructor(
    public dialogRef: MatDialogRef<ChaptersDialog>,
    private http: HttpClient,
    private router: Router) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  upload(files: File){
   
  }

  editChapter(): void{
    this.dialogRef.close();
    this.router.navigate(['/edit']);
  }
}
