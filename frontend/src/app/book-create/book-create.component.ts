import {Component, OnInit, Inject, Output, EventEmitter} from '@angular/core';
import {BookFetchService} from '../bookFetch.service';
import {Book} from './book';
import {Router, ActivatedRoute} from '@angular/router';
import {Commit} from './commit';
import {AddNewSectionComponent} from './add-new-section/add-new-section.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PreviewComponent} from './preview/preview.component';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import {ContentService} from '../content.service';
import { notification } from '../notification';
import { NotificationService } from '../notification.service';

export interface EditorDialogData {
  name: string;
  price: string;
}


@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})

export class BookCreateComponent implements OnInit {

  private editor;
  private illustrator;
  private bookDetails;
  private chapterStatus = [];
  private showEditButton: boolean[] = [];
  private selectHelper = true;

  options: string[] = ['Editor1', 'Editor2', 'Editor3'];
  private chapterNames;

  constructor(private bookFetch: BookFetchService,
              private router: Router,
              private dialog: MatDialog,
              private contentService: ContentService,
              private route: ActivatedRoute,
              private notificationService : NotificationService) {
                if (!localStorage.getItem('token')) {
                  this.router.navigate(['/home']).then();
                }
            }
            
  ngOnInit() {
    if (localStorage.getItem('role') == 'editor') {
      this.chapterStatus = ['Editing Phase', 'Editing Done'];
    } else if (localStorage.getItem('role') == 'designer') {
      this.chapterStatus = ['Designing Phase', 'Designing Done'];
    } else {
      this.chapterStatus = ['Writing Phase', 'Editing Phase', 'Designing Phase', 'Finished'];
    }
    this.bookDetails = JSON.parse(localStorage.getItem('book'));
    this.showEditButton = [this.bookDetails.status.length];
    this.setShowEditButton();
    console.log('book details: ', this.bookDetails);
  }

  ifAuthor(): boolean {
    return localStorage.getItem('role') === 'reader/author';
  }

  editFile(fileName: String) {
    console.log('editFile(): ', fileName);
    this.router.navigate(['/edit/' + fileName]).then();
  }

  addNewSection() {
    console.log('Add new Section');
    const dialogRef = this.dialog.open(AddNewSectionComponent);

    dialogRef.afterClosed().subscribe(
      result => {
        console.log('New Section Name: ', result);
        const commit = new Commit('', localStorage.getItem('fullName'), localStorage.getItem('email'), '', '');
        this.bookFetch.createFile(result, commit)
          .subscribe(
            data => {
              console.log(data);
              if (this.bookDetails.status === null) {
                this.bookDetails.status = [];
              }
              this.bookDetails.status.push(
                {
                  chapterName: result,
                  status: 'Writing Phase'
                }
              );
              localStorage.setItem('book', JSON.stringify(this.bookDetails));
              console.log(this.bookDetails);
              this.contentService.saveContent(this.bookDetails)
                .subscribe(
                  data2 => {
                    console.log('Update Content data2: ', data2);
                  },
                  error2 => {
                    console.log('Update Content error2: ', error2);
                  }
                );
            },
            error => {
              console.log(error);
            }
          );
      });
  }

  preview(sectionName: String) {
    console.log('section name', sectionName);
    this.bookFetch.getGit(this.bookDetails.id, sectionName)
      .subscribe(
        data => {
          console.log(data);
          const content = atob(data.content);
          const dialogRef = this.dialog.open(
            PreviewComponent,
            {
              data: content,
              height: '80%',
              width: '80%'
            }
          );
        },
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
      height: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
    });

    const dialogSubmitSubscription = dialogRef.componentInstance.selectEditorEvent.subscribe(
      result => {
        this.editor = result;
        this.sendNotification(this.editor, localStorage.getItem('username') + " has requested you to edit " + this.bookDetails.title + ".");
        dialogSubmitSubscription.unsubscribe();
      }
    );

  }


  openSelectIllustratorDialog(): void {
    const dialogRef = this.dialog.open(SelectIllustratorDialog, {
      width: '70%',
      autoFocus: false,
      maxHeight: '90vh',
      height: '60%'
    });

    dialogRef.afterClosed().subscribe(result => {
    });

    const dialogSubmitSubscription = dialogRef.componentInstance.selectIllustratorEvent.subscribe(
      result => {
        this.illustrator = result;
        this.sendNotification(this.illustrator, localStorage.getItem('username') + " has requested you to illustrate " + this.bookDetails.title + ".");
        dialogSubmitSubscription.unsubscribe();
      }
    );
  }

  openSetStatusDialog(): void {
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

  setShowEditButton() {
    for (let i = 0; i < this.bookDetails.status.length; i++) {
      const chapter = this.bookDetails.status[i].chapterName;
      const status = this.bookDetails.status[i].status;
      let cond = false;
      // author
      if (localStorage.getItem('role') === 'reader/author') {
        if (status === 'Writing Phase') {
          cond = true;
        }
      }
      // editor
      if (localStorage.getItem('role') === 'editor') {
        if (status === 'Editing Phase') {
          cond = true;
        }
      }
      // illustrator
      if (localStorage.getItem('role') === 'illustrator') {
        if (status === 'Designing Phase') {
          cond = true;
        }
      }
      // console.log(chapter, status, cond);
      this.showEditButton[i] = cond;
    }
  }

  getShowEditButton(index: number) {
    // console.log('returning: ', this.bookDetails.status[index].chapterName, this.showEditButton[index]);
    return this.showEditButton[index];
  }

  changeChapterStatus(status: String, i: number) {
    if (window.confirm('Change the Status of chapter' + this.bookDetails.status[i].chapterName + ' to :' + status)) {
      console.log(status, i);
      this.bookDetails.status[i].status = status;
      console.log('status changed to :', this.bookDetails.status[i].status);
      localStorage.setItem('book', JSON.stringify(this.bookDetails));
      this.contentService.saveContent(this.bookDetails)
        .subscribe(
          data => {
            console.log('status changed data: ', data);
            this.setShowEditButton();
            // this.ngOnInit();
          },
          error => {
            console.log('status changed error: ', error);
          }
        );
    }
  }

  getBookDetails(id) {
    console.log('fetching book details');
    this.contentService.getBookDetails(id).subscribe(
      result => {
        this.bookDetails = result;
        this.chapterNames = Array.from(this.bookDetails.status.keys());
        console.log(this.chapterNames);
      }
    );
  }

  sendNotification(receiver,message){
    const newNotification: notification = new notification();
    newNotification.sender = localStorage.getItem('username');
    newNotification.receiver = receiver;
    newNotification.message = message; 
    // newNotification.status = true;
    this.notificationService.sendNotification(newNotification).subscribe();
  }
}

@Component({
  selector: 'select-editor-dialog',
  templateUrl: 'select-editor-dialog.html',
  styleUrls: ['./book-create.component.css']
})
export class SelectEditorDialog implements OnInit {

  @Output() selectEditorEvent = new EventEmitter<any>();
  public editorList;

  constructor(
    public dialogRef: MatDialogRef<SelectEditorDialog>,
    @Inject(MAT_DIALOG_DATA) public editorData: String,
    private contentService: ContentService) {
  }

  ngOnInit(): void {
    this.getEditors();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectEditor(editor) {
    console.log('Selected Editor : ' + editor);
    
    this.selectEditorEvent.emit(editor);
    this.dialogRef.close();
  }

  getEditors() {
    console.log('Fetching Editors');
    this.contentService.getEditorsOrIllustrators('editor').subscribe(
      result => this.editorList = result
    );
  }
}


@Component({
  selector: 'select-illustrator-dialog',
  templateUrl: 'select-illustrator-dialog.html',
  styleUrls: ['./book-create.component.css']
})
export class SelectIllustratorDialog implements OnInit {
  public illustratorList;
  @Output() selectIllustratorEvent = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<SelectIllustratorDialog>,
    @Inject(MAT_DIALOG_DATA) public editorData: String,
    private contentService: ContentService) {
  }

  ngOnInit(): void {
    this.getIllustrators();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectIllustrator(illustrator) {
    console.log(illustrator);
    this.selectIllustratorEvent.emit(illustrator);
    this.dialogRef.close();
  }

  getIllustrators() {
    console.log('Fetching Illustrators');
    this.contentService.getEditorsOrIllustrators('illustrator').subscribe(
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
  private chapterStatus = 'Status';

  constructor(
    public dialogRef: MatDialogRef<SetStatusDialog>,
    @Inject(MAT_DIALOG_DATA) public statusData: String) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setChapterStatus() {
    console.log(this.chapterStatus);
    this.statusData = this.chapterStatus;
    this.chapterStatusEvent.emit(this.chapterStatus);
    this.dialogRef.close();
  }

}
