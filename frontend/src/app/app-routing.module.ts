import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import {EditComponent} from "./edit/edit.component";
import {BookdetailsComponent} from "./bookdetails/bookdetails.component";
import { ContentLayoutComponent } from './content-layout/content-layout.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { ConversionComponent } from './conversion/conversion.component';
import { PageAfterLoginComponent } from './page-after-login/page-after-login.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LoadingComponent } from './loading/loading.component';
import { PaymentComponent } from './payment/payment.component';
import { DownloadComponent } from './download/download.component';



const  routes: Routes = [
    {path: '', redirectTo:'/home',pathMatch : 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'register', component: RegistrationComponent},
    {path: 'edit/:fileName', component: EditComponent},
    {path: 'book-details', component: BookdetailsComponent},
    {path:'contentLayout',component:ContentLayoutComponent},
    {path:'bookCreate',component:BookCreateComponent},
    {path:'conversion',component:ConversionComponent},
    {path:'afterLogin',component:PageAfterLoginComponent},
    {path:'editProfile',component:EditProfileComponent},
    {path:'pay',component:PaymentComponent},
    {path:'loading',component:LoadingComponent},
    {path:'download',component:DownloadComponent}
    


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const routingComponents = [HomeComponent,DashboardComponent,RegistrationComponent];
