import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OwnerAddComponent } from './owners/owner-add/owner-add.component';
import { OwnerListComponent } from './owners/owner-list/owner-list.component';
import { AuthGuard } from './auth/auth-guard';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'addowner', component: OwnerAddComponent, canActivate: [AuthGuard] },
  { path: 'owner-list', component: OwnerListComponent, canActivate: [AuthGuard] },
  { path: 'edit/:ownerId', component: OwnerAddComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
