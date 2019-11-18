import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginService} from './login.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {ContentLayoutComponent} from './content-layout/content-layout.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {
  BookCreateComponent,
  SelectEditorDialog,
  SelectIllustratorDialog,
  SetStatusDialog
} from './book-create/book-create.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {QuillModule} from 'ngx-quill';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatIconModule,
  MatNativeDateModule,
  MatTreeModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatBadgeModule,
  MAT_DATE_LOCALE,
  MatPaginatorModule,
} from '@angular/material';
import {MatCardModule, MatDialogModule, MatStepperModule, MatSelectModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {DashboardComponent} from './dashboard/dashboard.component';
import {EditComponent} from './edit/edit.component';
import {BookdetailsComponent, SampleChapterDialog} from "./bookdetails/bookdetails.component";
import {MatTabsModule} from "@angular/material/tabs";
import {ContentService} from './content.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {FooterComponent} from './footer/footer.component';
import {AddNewSectionComponent} from './book-create/add-new-section/add-new-section.component';
import {PreviewComponent} from './book-create/preview/preview.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {ConversionComponent} from './conversion/conversion.component';
import {PageAfterLoginComponent} from './page-after-login/page-after-login.component';
import {LoadingComponent} from './loading/loading.component';
import {PaymentComponent} from './payment/payment.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {DownloadComponent} from './download/download.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NewIssueComponent} from './issues/new-issue/new-issue.component';
import {ReplyComponent} from './issues/reply/reply.component';
import {PublicationBookComponent} from './publication-book/publication-book.component';
import {SearchResultsComponent} from './search-results/search-results.component';
import { IssuesComponent } from './issues/issues.component';
import { FailureComponent } from './failure/failure.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    ContentLayoutComponent,
    BookCreateComponent,
    DashboardComponent,
    EditComponent,
    BookdetailsComponent,
    FooterComponent,
    AddNewSectionComponent,
    PreviewComponent,
    SelectEditorDialog,
    SelectIllustratorDialog,
    SampleChapterDialog,
    ConversionComponent,
    PageAfterLoginComponent,
    EditProfileComponent,
    PaymentComponent,
    LoadingComponent,
    DownloadComponent,
    NewIssueComponent,
    ReplyComponent,
    PublicationBookComponent,
    SearchResultsComponent,
    IssuesComponent,
    FailureComponent
  ],

  imports: [
    NgxSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatCardModule,
    MatDialogModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatSelectModule,
    QuillModule.forRoot(),
    MatTreeModule,
    MatCheckboxModule,
    MatButtonModule,
    MatButtonToggleModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatGridListModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatBadgeModule,
    DragDropModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatPaginatorModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
  entryComponents: [
    LoginComponent,
    AddNewSectionComponent,
    PreviewComponent,
    SelectEditorDialog,
    SelectIllustratorDialog,
    SampleChapterDialog,
    PublicationBookComponent,
    NewIssueComponent,
    ReplyComponent,
    IssuesComponent,
    FailureComponent
  ],
  providers: [
    LoginService,
    ContentService,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}


