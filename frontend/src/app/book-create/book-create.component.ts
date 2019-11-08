import {Component, OnInit, Inject, Output, EventEmitter} from '@angular/core';
import {BookFetchService} from '../bookFetch.service';
import {Book} from "./book";
import {Router, ActivatedRoute} from '@angular/router';
import {Commit} from "./commit";
import {AddNewSectionComponent} from "./add-new-section/add-new-section.component";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PreviewComponent} from "./preview/preview.component";
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ContentService } from '../content.service';

export interface EditorDialogData {
  name: string;
  price: string;
}


// let jsPDF = require('jspdf');
@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  private load: boolean = false;
  private username: String;
  private userEmail: String;
  private books: Book[] = [];
  private editor;
  private illustrator;
  // private author = false;
  // private editor_author = true;
  // private illustrator_author = true;
  private bookDetails;
  private chapterStatus = ['Writing Phase','Editing Phase','Designing Phase','Finished'];

  myEditorControl = new FormControl();
  options: string[] = ['Editor1', 'Editor2', 'Editor3'];
  filteredEditorOptions: Observable<string[]>;
  private chapterNames;

  constructor(private bookFetch: BookFetchService,
              private router: Router,
              private dialog: MatDialog,
              private _contentService: ContentService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    if(localStorage.getItem('role') == 'editor'){
      // this.author = false;
      // this.editor = true;
      // this.illustrator_author = false;
      this.chapterStatus = ['Editing Phase','Editing Done'];
    }else{
      if(localStorage.getItem('role') == 'designer'){
      // this.author = false;
      // this.illustrator = true;
      // this.editor_author = false;
      this.chapterStatus = ['Designing Phase','Designing Done'];
      }
    }
    this.username = this.bookFetch.getUsername();
    this.userEmail = this.bookFetch.getUserEmail();
  
    this.filteredEditorOptions = this.myEditorControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    //console.log(parseInt(this.route.snapshot.paramMap.get('name')));
    //this.getBookDetails(parseInt(this.route.snapshot.paramMap.get('id')));
    this.bookDetails = JSON.parse(localStorage.getItem('book'));
    console.log(this.bookDetails);
    this.bookFetch.getAllFiles()
      .subscribe(
        (data) => {
          for (let i = 0; i < data.length; i++) {
            console.log('All Files: ', data[i].name);
            this.books.push(new Book(data[i].name, data.sha, ""));
          }
          this.load = true;
        },
        error => {
        }
      );


  }

  downloadPdf() {
    // let doc = new jsPDF();
    // doc.addHTML(document.getElementById("bob"), function() {
    //    doc.save("obrz.pdf");
    // });
  }

  editFile(fileName: String) {
    console.log('editFile(): ', fileName);
    this.router.navigate(['/edit/' + fileName]).then();
  }

  addNewSection() {
    console.log('Add new Section');
    const dialogRef = this.dialog.open(AddNewSectionComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('New Section Name: ', result);
      let commit = new Commit("", this.bookFetch.getUsername(), this.bookFetch.getUserEmail(), "", "");
      this.bookFetch.createFile(result, commit)
        .subscribe(
          data => {
            console.log(data);
            this.books.push(new Book(result, "", ""));
          },
          error => {
            console.log(error);
          }
        );
    });
  }

  preview(sectionName: String) {
    this.bookFetch.getGit(sectionName)
      .subscribe(
        data => {
          console.log(data);
          let content = atob(data.content);
          const dialogRef = this.dialog.open(
            PreviewComponent,
            {
              data: content,
              height: '80%',
              width: '80%'
            }
          );
        },
        error => {

        }
      );
  }

  delete(sectionName: String) {
    this.bookFetch.getGit(sectionName)
      .subscribe(
        data => {
          console.log(data);
          let commit = new Commit('', this.bookFetch.getUsername(), this.bookFetch.getUserEmail(), data.sha, '');
          // this.bookFetch.deleteFile(sectionName, commit)
          //   .subscribe(
          //     data => {
          //       console.log('data', data);
          //     },
          //     error => {
          //       console.log('error', error);
          //     }
          //   );
        }
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  openSelectEditorDialog(): void {
    const dialogRef = this.dialog.open(SelectEditorDialog, {
      width: '70%',
      autoFocus: false,
      maxHeight: '90vh',
      height:'60%'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
    
    const dialogSubmitSubscription = dialogRef.componentInstance.selectEditorEvent.subscribe(
        result =>{
          this.editor = result;
          dialogSubmitSubscription.unsubscribe();
        }
    );
    
  }


  openSelectIllustratorDialog(): void {
    const dialogRef = this.dialog.open(SelectIllustratorDialog, {
      width: '70%',
      autoFocus: false,
      maxHeight: '90vh',
      height:'60%'
    });

    dialogRef.afterClosed().subscribe(result => {
    });

    const dialogSubmitSubscription = dialogRef.componentInstance.selectIllustratorEvent.subscribe(
      result =>{
        this.illustrator = result;
        dialogSubmitSubscription.unsubscribe();
      }
  );
  }

  openSetStatusDialog(): void{
    const dialogRef = this.dialog.open(SetStatusDialog, {
      width: '50%',
      autoFocus: false,
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe(result => {
    });

    const dialogSubmitSubscription = 
      dialogRef.componentInstance.chapterStatusEvent.subscribe(result => {
        console.log(result);
        this.chapterStatus = result;
      dialogSubmitSubscription.unsubscribe();
});
  }

  changeChapterStatus(status : String, i : number){
    console.log(status,i);
    this.bookDetails.status[i].status = status;
    console.log('status', this.bookDetails.status[i].status);
    this._contentService.saveContent(this.bookDetails).subscribe();
  }
  getBookDetails(id){
    console.log("fetching book details")
    this._contentService.getBookDetails(id).subscribe(
      result => {
        this.bookDetails = result;
        this.chapterNames = Array.from( this.bookDetails.status.keys() );
        console.log( this.chapterNames);
      }
    );
  }
}

@Component({
  selector: 'select-editor-dialog',
  templateUrl: 'select-editor-dialog.html',
  styleUrls: ['./book-create.component.css']
})
export class SelectEditorDialog implements OnInit{
  
  @Output() selectEditorEvent = new EventEmitter<any>();
  public editorList;
  constructor(
    public dialogRef: MatDialogRef<SelectEditorDialog>,
    @Inject(MAT_DIALOG_DATA) public editorData: String,
    private _contentService : ContentService) {}

  ngOnInit(): void {
    this.getEditors();
    }    
  onNoClick(): void {
    this.dialogRef.close();
  }

  selectEditor(editor){
    console.log("Selected Editor : " + editor);
    this.selectEditorEvent.emit(editor);
    this.dialogRef.close();
  }

  getEditors(){
    console.log("Fetching Editors")
    this._contentService.getEditorsOrIllustrators('editor').subscribe(
      result => this.editorList = result
    );
  }
}


@Component({
  selector: 'select-illustrator-dialog',
  templateUrl: 'select-illustrator-dialog.html',
  styleUrls: ['./book-create.component.css']
})
export class SelectIllustratorDialog implements OnInit{
  public illustratorList;
  @Output() selectIllustratorEvent = new EventEmitter<any>();
  constructor(
    public dialogRef: MatDialogRef<SelectIllustratorDialog>,
    @Inject(MAT_DIALOG_DATA) public editorData: String,
    private _contentService : ContentService) {}

  ngOnInit(): void {
      this.getIllustrators();
    }
  onNoClick(): void {
    this.dialogRef.close();
  }

  selectIllustrator(illustrator){
    console.log(illustrator);
    this.selectIllustratorEvent.emit(illustrator);
    this.dialogRef.close();
  }

  getIllustrators(){
    console.log("Fetching Illustrators");
    this._contentService.getEditorsOrIllustrators('illustrator').subscribe(
      result => this.illustratorList = result
    );
  }
}

@Component({
  selector: 'set-status-dialog',
  templateUrl: 'set-status-dialog.html',
  styleUrls: ['./book-create.component.css']
})
export class SetStatusDialog {
  @Output() chapterStatusEvent = new EventEmitter<any>();
  private chapterStatus='Status';
  constructor(
    public dialogRef: MatDialogRef<SetStatusDialog>,
    @Inject(MAT_DIALOG_DATA) public statusData: String) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  setChapterStatus(){
    console.log(this.chapterStatus);
    this.statusData = this.chapterStatus;
    this.chapterStatusEvent.emit(this.chapterStatus);
    this.dialogRef.close();
  }

}