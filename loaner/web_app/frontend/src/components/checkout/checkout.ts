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


import {LoaderView} from '../../../../../shared/components/loader';
import {CONFIG} from '../../app.config';
import {AuthService} from '../../services/auth';
import {MatStepperModule, MatInputModule, MatButtonModule, MatFormFieldModule} from '@angular/material'
import { MatStepper } from '@angular/material';
import {GapiService} from '../../services/gapiservice';
import {Checkout} from '../../models/checkout';
import {CheckoutService} from '../../services/checkout';

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

  async createAccount()
  {
    console.log("creating account");
    this.checkout = new Checkout();
    this.checkout.firstName = this.firstFormGroup.get('firstCtrl').value+"";
    this.checkout.lastName = this.firstFormGroup.get('LastNameCtrl').value+"";
    console.log("Creds "+this.checkout.firstName + " " +this.checkout.lastName);
    var test = await this.checkoutService.create(this.checkout);
    console.log(test);
    //this.gapiservice.CreateUser(this.firstFormGroup.get('firstCtrl').value,this.firstFormGroup.get('LastNameCtrl').value)

  }


}
