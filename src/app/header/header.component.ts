import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() public sidenavToggle = new EventEmitter();

  userAuthenticated = false;

  private authLitenerSubs: Subscription;

  constructor() {}

  onLogout() {

  }

  ngOnInit() {

      this.userAuthenticated = true;

  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  ngOnDestroy() {

  }


}
