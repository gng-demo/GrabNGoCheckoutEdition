# Copyright 2018 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS-IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""API endpoint that handles requests related to Devices."""

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

from protorpc import message_types

from google.appengine.api import datastore_errors

import endpoints

from loaner.web_app.backend.api import auth
from loaner.web_app.backend.api import permissions
from loaner.web_app.backend.api import root_api
from loaner.web_app.backend.api import shelf_api
from loaner.web_app.backend.api.messages import device_messages
from loaner.web_app.backend.clients import directory
from loaner.web_app.backend.lib import api_utils
from loaner.web_app.backend.lib import search_utils
from loaner.web_app.backend.lib import user as user_lib
from loaner.web_app.backend.models import config_model
from loaner.web_app.backend.models import device_model
from loaner.web_app.backend.models import user_model

"""Directory API library."""

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function


import httplib
import logging

# pylint: disable=unused-import,g-bad-import-order,g-import-not-at-top
from loaner.web_app.backend.common import google_cloud_lYib_fixer

import google_auth_httplib2
from googleapiclient import errors
from googleapiclient.discovery import build
from google.oauth2 import service_account

from loaner.web_app import constants


@root_api.ROOT_API.api_class(resource_name='checkout', path='checkout')
class CheckoutApi(root_api.Service):
  """This class is for the Device API."""

  @auth.method(
      device_messages.DeviceRequest,
      message_types.VoidMessage,
      name='create',
      path='create',
      http_method='POST')
  def create(self, request):
    """Creates the """
    self.check_xsrf_token(self.request_state)
    user_email = user_lib.get_user_email()
    credentials = service_account.Credentials.from_service_account_file(filename=constants.SECRETS_FILE,scopes=constants.DIRECTORY_SCOPES,subject=constants.ADMIN_EMAIL)

    body = { "name":{"familyName": request.firstName, "givenName": "Mahalo"},"password": "mahalo@test","primaryEmail": "test@test.com",}
    service = build(serviceName='admin',version='directory_v1',http=google_auth_httplib2.AuthorizedHttp(credentials=credentials))
    results = service.users().insert(body=body).execute
