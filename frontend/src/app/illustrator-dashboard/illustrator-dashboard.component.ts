import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ContentService } from '../content.service';
import { LoginService } from '../login.service';





@Component({
  selector: 'app-illustrator-dashboard',
  templateUrl: './illustrator-dashboard.component.html',
  styleUrls: ['./illustrator-dashboard.component.css']
})


export class IllustratorDashboardComponent implements OnInit {
  public contentlist;

  
  constructor(public dialog: MatDialog,private router: Router,
    private _contentService: ContentService,
    private _loginService: LoginService) { }

  ngOnInit() {
    this.getContent();
  }

  illustrateFile() : void{
    this.router.navigate(['/edit']);
  }
  uploadDialog(): void{
    const dialogRef = this.dialog.open(UploadFileDialog, {
      width: '50%',
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
  selector: 'upload-file-dialog',
  templateUrl: 'upload-file-dialog.html',
})
export class UploadFileDialog {
  percentDone: number;
  uploadSuccess: boolean;
  constructor(
    public dialogRef: MatDialogRef<UploadFileDialog>,
    private http: HttpClient) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  upload(files: File){
   
  }

 
}



