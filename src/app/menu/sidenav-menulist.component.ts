import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav-menulist',
  templateUrl: './sidenav-menulist.component.html',
  styleUrls: ['./sidenav-menulist.component.css']
})
export class SidenavMenulistComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

}
