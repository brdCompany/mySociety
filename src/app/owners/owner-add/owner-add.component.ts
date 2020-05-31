import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {OwnerService} from '../owner.service'
import { Owner } from '../owner.model';

@Component({
  selector: 'app-owner',
  templateUrl: './owner-add.component.html',
  styleUrls: ['./owner-add.component.css']
})
export class OwnerAddComponent implements OnInit{
  private mode= 'create';
  private ownerId: string;
  owner: Owner;
  isLoading = false;
  form: FormGroup;
  constructor(private ownerService: OwnerService, public route: ActivatedRoute) {}

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      coownername: new FormControl(null, {
        validators: []
      }),
      societyname: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      block: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),
      flatno: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(1)]
      }),
      primarymobile: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(9)]
      }),
      secondarymobile: new FormControl(null, {
        validators: []
      }),
      primaryemail: new FormControl(null, {
        validators: [Validators.required]
      }),
      isresident: new FormControl(null, {
        validators: []
      })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("ownerId")) {
        this.mode = "edit";
        this.ownerId = paramMap.get("ownerId");
        this.isLoading = true;
        this.ownerService.getOwner(this.ownerId).subscribe(ownerData => {
          this.isLoading = false;
          console.log("owners values:" + ownerData.coownername);
          this.owner = {
            id: ownerData._id,
            name: ownerData.name,
            coownername: ownerData.coownername,
            societyname: ownerData.societyname,
            block: ownerData.block,
            flatno: ownerData.flatno,
            primarymobile: ownerData.primarymobile,
            secondarymobile: ownerData.secondarymobile,
            primaryemail: ownerData.primaryemail,
            isresident: ownerData.isresident
          };
          this.form.setValue({
            name: ownerData.name,
            coownername: ownerData.coownername,
            societyname: ownerData.societyname,
            block: ownerData.block,
            flatno: ownerData.flatno,
            primarymobile: ownerData.primarymobile,
            secondarymobile: ownerData.secondarymobile,
            primaryemail: ownerData.primaryemail,
            isresident: ownerData.isresident
          });
        });
      } else {
        this.mode = "create";
        this.ownerId = null;
      }
    });
  }

  onSaveOwner() {

    if(this.form.invalid)
    return;
    this.isLoading = true;

    if(this.mode === "create") {
    this.ownerService.addOwner(this.form.value.name,
                              this.form.value.coownername,
                              this.form.value.societyname,
                              this.form.value.block,
                              this.form.value.flatno,
                              this.form.value.primarymobile,
                              this.form.value.secondarymobile,
                              this.form.value.primaryemail,
                              this.form.value.isresident
                              );
    this.isLoading = false;

    } else {
      this.ownerService.updateOwner(this.ownerId, this.form.value.name,
                              this.form.value.coownername,
                              this.form.value.societyname,
                              this.form.value.block,
                              this.form.value.flatno,
                              this.form.value.primarymobile,
                              this.form.value.secondarymobile,
                              this.form.value.primaryemail,
                              this.form.value.isresident);
    }
    this.form.reset();
  }
}
