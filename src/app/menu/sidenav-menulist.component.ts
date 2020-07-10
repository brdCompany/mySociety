import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sidenav-menulist',
  templateUrl: './sidenav-menulist.component.html',
  styleUrls: ['./sidenav-menulist.component.css']
})
export class SidenavMenulistComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();
  userAuthenticated = false;

  private authLitenerSubs: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userAuthenticated = this.authService.getIsAuth();
    this.authLitenerSubs = this.authService.getAuthStatusLitener().subscribe(isAuthenticated => {
      this.userAuthenticated = isAuthenticated;
    });
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authLitenerSubs.unsubscribe();
  }

}
