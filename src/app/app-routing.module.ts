import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OwnerAddComponent } from './owners/owner-add/owner-add.component';
import { OwnerListComponent } from './owners/owner-list/owner-list.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'addowner', component: OwnerAddComponent },
  { path: 'owner-list', component: OwnerListComponent },
  { path: 'edit/:ownerId', component: OwnerAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
