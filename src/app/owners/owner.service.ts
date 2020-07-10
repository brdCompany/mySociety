import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Owner } from './owner.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OwnerService {

  owners: Owner[] = [];
  private ownerUpdated = new Subject<Owner[]>();
  constructor(private httpClient: HttpClient, private router: Router) {}

  addOwner(name: string,
         coownername: string,
         societyname: string,
         block: string,
         flatno: string,
         primarymobile: string,
         secondarymobile: string,
         primaryemail: string,
         isresident: string) {

    const owner: Owner = {id: null, name: name, coownername: coownername, societyname:societyname,
                          block:block, flatno:flatno, primarymobile:primarymobile,
                          secondarymobile:secondarymobile, primaryemail:primaryemail, isresident:isresident};

    this.httpClient.post('http://localhost:3000/api/user/addOwner', owner).subscribe(response => {
      console.log(response);
      this.router.navigate(['/owner-list']);
    });
  }

  updateOwner(ownerId: string,
         name: string,
         coownername: string,
         societyname: string,
         block: string,
         flatno: string,
         primarymobile: string,
         secondarymobile: string,
         primaryemail: string,
         isresident: string) {

        const owner: Owner = {id: ownerId, name: name, coownername: coownername, societyname:societyname,
            block:block, flatno:flatno, primarymobile:primarymobile,
            secondarymobile:secondarymobile, primaryemail:primaryemail, isresident:isresident};

        this.httpClient.put('http://localhost:3000/api/user/'+ownerId, owner).subscribe(
          (responseData) => {
            const updatedOwners = [...this.owners];
            const oldOwnerIndex = updatedOwners.findIndex(o => o.id === ownerId);
            updatedOwners[oldOwnerIndex] = owner;
            this.owners = updatedOwners;
            this.ownerUpdated.next([...this.owners]);
            this.router.navigate(['/owner-list']);
          });
      }

  getOwners() {
    this.httpClient.get<{message:string, owners:any}>('http://localhost:3000/api/user')
    .pipe(map((ownerData) => {
      return ownerData.owners.map(owner => {
        return {
          name: owner.name,
          coownername: owner.coownername,
          societyname: owner.societyname,
          block: owner.block,
          flatno: owner.flatno,
          primarymobile: owner.primarymobile,
          secondarymobile: owner.secondarymobile,
          primaryemail: owner.primaryemail,
          isresident: owner.isresident,
          id: owner._id
        };
      });
  }))
  .subscribe(transFormedOwner => {
    this.owners = transFormedOwner;
    this.ownerUpdated.next([...this.owners]);
    });
  }

  getOwner(ownerId: string) {
    console.log('ownerService.getOwner()'+ownerId);
    return this.httpClient.get<{ _id: string; name: string; coownername: string, societyname: string,
                                block:string, flatno:string, primarymobile: string, secondarymobile: string,
                                primaryemail:string, isresident:string }>(
      "http://localhost:3000/api/user/" + ownerId
    );
  }

  getOwnerUpdateListener() {
    return this.ownerUpdated.asObservable();
  }

  deleteOwner(ownerId: string) {
    this.httpClient.delete('http://localhost:3000/api/user/' + ownerId)
      .subscribe(() => {
        console.log('Owner Deleted...!');
        const updatedOwner = this.owners.filter(owner => owner.id != ownerId);
        this.owners = updatedOwner;
        this.ownerUpdated.next([...this.owners]);
      });
  }
  sendEmail() {
    const temp = {email:'bulbul.alamgir@gmail.com', password:'pass'};
    this.httpClient.post('http://localhost:3000/api/user/sendmail', temp)
      .subscribe(() => {
        console.log('Email sent...');

      });
  }
}
