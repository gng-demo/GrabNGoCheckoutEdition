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

import {Injectable} from '@angular/core';
import {MatSort} from '@angular/material';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Checkout, CheckoutApiParams} from '../models/checkout';

import {ApiService} from './api';

/** Class to connect to the backend's Device Service API methods. */
@Injectable({
    providedIn: 'root'
})
export class CheckoutService extends ApiService {
  /** Implements ApiService's apiEndpoint requirement. */
  apiEndpoint = 'checkout';


  /**
   * Enrolls a particular device into the Grab n Go Loaners program.
   * @param newDevice Device that will be enrolled in the program.
   */
  create(newDevice: Checkout) {
    return this.post<void>('create', newDevice.toApiMessage()).pipe(tap(() => {
      this.snackBar.open(`Device  enrolled.`);
    }));
  }

}
