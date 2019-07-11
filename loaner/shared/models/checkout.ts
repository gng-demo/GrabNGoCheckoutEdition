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

import * as moment from 'moment';


/**
 * Interface with fields that come from our device API.
 */
export declare interface CheckoutApiParams {
  firstName?: string;
  lastName?: string;
}




/** A device model with all its properties and methods. */
export class Checkout {
  /** Serial number of the device. */
  firstName = '';
  /** Asset tag of the device. */
  lastName = '';


  constructor(device: CheckoutApiParams = {}) {
    this.firstName = device.firstName || this.firstName;
    this.lastName = device.lastName || this.lastName;

  }


  /** Translates the Device model object to the API message. */
  toApiMessage(): CheckoutApiParams {
    return {
      firstName: this.firstName,
      lastName: this.lastName,

    };
  }


}
