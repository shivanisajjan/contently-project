import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import {EditComponent} from "./edit/edit.component";
import {BookdetailsComponent} from "./bookdetails/bookdetails.component";



const  routes: Routes = [
    {path: '', redirectTo:'/home',pathMatch : 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'register', component: RegistrationComponent},
    {path: 'edit', component: EditComponent},
    {path: 'book-details', component: BookdetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const routingComponents = [HomeComponent,DashboardComponent,RegistrationComponent];
