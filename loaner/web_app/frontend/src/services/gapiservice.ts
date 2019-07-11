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

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of, ReplaySubject, throwError} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

//import {User} from '../app/user';

import {ApiService} from './api';
import {AuthService} from './auth';
import {LoanerSnackBar} from './snackbar';


// tslint:disable-next-line:no-any Declaration of window.gapi for gapi client.
const gapi = (window as any)['gapi'];


@Injectable({
  providedIn: 'root'
})
export class GapiService {
  // Will pass 0 for passed, 1 for duplicate, 2 for potentially network issue.
   passOrFail = 0;
   private created = 0;
   private addresses = ['Operational-Admins@gng-demo.com','Technicians@gng-demo.com','Technical-Admins@gng-demo.com'];


  constructor(private readonly authService: AuthService,
              snackbar: LoanerSnackBar,) {
               }



  CreateUser(fName:string, lName:string)
  {
    console.log("Fnam: "+fName+" "+lName);
    return gapi.client.directory.orgunits.list({
        'customerId': 'my_customer',
        'maxResults': 10,
      }).then(function(response : any) {
        //Grabbin Result and parsing the object to be readable
        var res = response.result;
        res = JSON.parse(JSON.stringify(res));
        //sifting through the Organization Unit property which is an array
        //Seeing if the Grab n Go OU exist.
        console.log(res.organizationUnits);
        console.log(res["kind"]);
        if(res && res.organizationUnits.length >0)
        {

          for (var i of res.organizationUnits) {

              if((i.name+"") == "Grab n Go")
              {
                return 0
              }
          }
          return 1;

        }

      },(error: any) => { return 3; })

    }
      /*
    gapi.client.directory.users.insert({
      "name": {
       "familyName": fName,
       "givenName": lName
     },
     "password": "GrabNGo123",
     "primaryEmail": (fName.substring(1,2)+""+lName+"@gng-demo.com")
   }).then(function(response:any){

          console.log(JSON.stringify(response));
        },(error: any) => { console.log(JSON.stringify(error)); });

  }
     gapi.client.directory.users.list({
          'customer': 'my_customer',
          'maxResults': 10,
          'orderBy': 'email'
        }).then(function(response:any) {
          var users = response.result.users;
          users = JSON.parse(JSON.stringify(users));
          if (users && users.length > 0) {
            for (var i of users) {
              var user = i;
              console.log('-' + user.primaryEmail + ' (' + user.name.fullName + ')');
            }
          } else {
            console.log('No users found.');
          }
        });*/









}
