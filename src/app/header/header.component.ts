import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() public sidenavToggle = new EventEmitter();

  userAuthenticated = false;

  private authLitenerSubs: Subscription;

  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.userAuthenticated = this.authService.getIsAuth();
    this.authLitenerSubs = this.authService.getAuthStatusLitener().subscribe(isAuthenticated => {
      this.userAuthenticated = isAuthenticated;
    });
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  ngOnDestroy() {
    this.authLitenerSubs.unsubscribe();
  }


}
