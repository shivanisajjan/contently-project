import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import {EditComponent} from "./edit/edit.component";
import {BookdetailsComponent} from "./bookdetails/bookdetails.component";
import { ContentLayoutComponent } from './content-layout/content-layout.component';
import { BookCreateComponent } from './book-create/book-create.component';



const  routes: Routes = [
    {path: '', redirectTo:'/home',pathMatch : 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'register', component: RegistrationComponent},
    {path: 'edit/:fileName', component: EditComponent},
    {path: 'book-details', component: BookdetailsComponent},
    {path:'contentLayout',component:ContentLayoutComponent},
    {path:'bookCreate',component:BookCreateComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const routingComponents = [HomeComponent,DashboardComponent,RegistrationComponent];
