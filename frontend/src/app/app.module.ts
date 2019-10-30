import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { LoginService } from "./login.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ContentLayoutComponent } from './content-layout/content-layout.component';
import { BookCreateComponent } from './book-create/book-create.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { QuillModule } from "ngx-quill";
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatIconModule, MatNativeDateModule, MatTreeModule, MatCheckboxModule} from '@angular/material';
import { IllustratorDashboardComponent, UploadFileDialog } from './illustrator-dashboard/illustrator-dashboard.component';
import { EditorDashboardComponent, ChaptersDialog } from './editor-dashboard/editor-dashboard.component';
import {
  MatCardModule,
  MatDialogModule,
  MatStepperModule,
  MatSelectModule

} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditComponent } from './edit/edit.component';
import {BookdetailsComponent} from "./bookdetails/bookdetails.component";
import {MatTabsModule} from "@angular/material/tabs";
import { ContentService } from './content.service';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    ContentLayoutComponent,
    BookCreateComponent,
    DashboardComponent,
    EditComponent,
    IllustratorDashboardComponent,
    UploadFileDialog,
    EditorDashboardComponent,
    ChaptersDialog,
    BookdetailsComponent,
    FooterComponent
  ],

  imports: [BrowserModule,
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
    MatListModule
  ],
  entryComponents: [ UploadFileDialog,
    ChaptersDialog,
    LoginComponent],
  providers: [LoginService,ContentService],
  bootstrap: [AppComponent]
})
export class AppModule {}
