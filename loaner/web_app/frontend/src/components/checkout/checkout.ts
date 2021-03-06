// Copyright 2018 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {HttpErrorResponse} from '@angular/common/http';
import {LoaderView} from '../../../../../shared/components/loader';
import {CONFIG} from '../../app.config';
import {AuthService} from '../../services/auth';
import {MatStepperModule, MatInputModule, MatButtonModule, MatFormFieldModule} from '@angular/material'
import { MatStepper } from '@angular/material';
import {GapiService} from '../../services/gapiservice';
import {Checkout, CheckoutOnAction, Status} from '../../models/checkout';
import {CheckoutService} from '../../services/checkout';



export interface AccountInfo {
  username: string;
  password: string;
}

/**
 * Component that renders the Authorization flow of the application.
 */
@Component({
  preserveWhitespaces: true,
  selector: 'loaner-checkout',
  styleUrls: ['checkout.scss'],
  templateUrl: 'checkout.ng.html',
})
export class CheckoutDetails extends LoaderView implements OnInit {
  /** Title for the component. */
  private readonly title = `Authorization - ${CONFIG.appName}`;
  /** Url to be redirected after login. */
  private returnUrl!: string;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  checkout:Checkout;
  accounts: AccountInfo[] = [{username:"",password:""}];
  sortedData: AccountInfo[];


  constructor(
      private readonly authService: AuthService,
      private readonly route: ActivatedRoute,
      private readonly router: Router,
      private readonly titleService: Title,
      private _formBuilder: FormBuilder,
      private readonly gapiservice:GapiService,
      private readonly checkoutService: CheckoutService,
  ) {
    super(true);
    this.checkoutService.whenCreated().subscribe(() => {
      console.log("Created");
      var firstPart= this.firstFormGroup.get('firstCtrl').value.substring(0,1)
      var secondPart = this.checkout.lastName = this.firstFormGroup.get('LastNameCtrl').value+"";
      var finalPart = firstPart+""+secondPart+"@gng-demo.com"
      this.accounts[0] = {username:finalPart,password:"GngDemo123"};
    });

  }

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      LastNameCtrl: ['', Validators.required],
      EmailCtrl: ['', Validators.required],

    });
    this.secondFormGroup = this._formBuilder.group({

    });
    this.thirdFormGroup = this._formBuilder.group({

    });


  }

  login()
  {
    console.log("Testing");
  }

  createAccount()
  {

    console.log("creating account");
    this.checkout = new Checkout();
    let checkoutOnAction: CheckoutOnAction;
    const handleSuccess = () => {
      checkoutOnAction.status = Status.READY;
      checkoutOnAction.message = `Successfully Deployed`;
      console.log("sucess");
    };
    const handleError = (error: HttpErrorResponse) => {
      checkoutOnAction.status = Status.ERROR;
      checkoutOnAction.message = error.error.error.message;
      console.log("error "+ checkoutOnAction.message);
    };
    this.checkout.firstName = this.firstFormGroup.get('firstCtrl').value+"";
    this.checkout.lastName = this.firstFormGroup.get('LastNameCtrl').value+"";
    console.log("Creds "+this.checkout.firstName + " " +this.checkout.lastName);
    //var test = await this.checkoutService.create(this.checkout);
    this.checkoutService.create(this.checkout).subscribe(handleSuccess, handleError);
    //console.log(test);

  }


}
