import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import {EditComponent} from "./edit/edit.component";
import { IllustratorDashboardComponent } from './illustrator-dashboard/illustrator-dashboard.component';
import { EditorDashboardComponent } from './editor-dashboard/editor-dashboard.component';


const  routes: Routes = [
    {path: '', redirectTo:'/home',pathMatch : 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'register', component: RegistrationComponent},
    {path: 'edit', component: EditComponent},
    {path: 'illustrator-dashboard', component: IllustratorDashboardComponent},
    {path: 'editor-dashboard', component: EditorDashboardComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const routingComponents = [HomeComponent,DashboardComponent,RegistrationComponent];
