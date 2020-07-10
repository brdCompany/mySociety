import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Owner } from '../owner.model';
import { OwnerService } from '../owner.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']

})
export class OwnerListComponent implements OnInit, OnDestroy{
  owners: Owner[] = [];
  private ownersSub: Subscription;
  isLoading = false;

  userAuthenticated = false;
  private authLitenerSubs: Subscription;

  constructor(public ownerService: OwnerService, private authService: AuthService) {
    this.ownerService = ownerService;
  }

  ngOnInit() {
    this.isLoading = true;
    this.ownerService.getOwners();

    this.ownersSub = this.ownerService.getOwnerUpdateListener().subscribe(
      (owners: Owner[]) => {
        this.isLoading = false;
        this.owners = owners;
      });

      // this.userAuthenticated = this.authService.getIsAuth();
      // this.authLitenerSubs = this.authService.getAuthStatusLitener().subscribe(isAuthenticated => {
      //   this.userAuthenticated = isAuthenticated;
      // });
    console.log(this.owners);
  }

  onDelete(ownerId: string) {
    this.ownerService.deleteOwner(ownerId);
  }

  ngOnDestroy() {
    this.ownersSub.unsubscribe();
    // this.authLitenerSubs.unsubscribe();
  }
}
