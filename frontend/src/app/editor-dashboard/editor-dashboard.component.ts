import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ContentService } from '../content.service';
import { LoginService } from '../login.service';


@Component({
  selector: 'app-editor-dashboard',
  templateUrl: './editor-dashboard.component.html',
  styleUrls: ['./editor-dashboard.component.css']
})
export class EditorDashboardComponent implements OnInit {
  public contentlist;
  constructor(public dialog: MatDialog,
    private _contentService: ContentService,
    private _router: Router,
    private _loginService: LoginService) { }

  ngOnInit() {
    this.getContent();
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

  getContent(){
    this._contentService.getBooks().subscribe(data => this.contentlist = data);
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
