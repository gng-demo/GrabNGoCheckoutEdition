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
from loaner.web_app.backend.api.messages import checkout_messages
from loaner.web_app.backend.clients import directory
from loaner.web_app.backend.lib import api_utils
from loaner.web_app.backend.lib import search_utils
from loaner.web_app.backend.lib import user as user_lib
from loaner.web_app.backend.models import config_model
from loaner.web_app.backend.models import device_model
from loaner.web_app.backend.models import user_model
from loaner.web_app.backend.models import checkout_model


@root_api.ROOT_API.api_class(resource_name='checkout', path='checkout')
class CheckoutApi(root_api.Service):
  """This class is for the Device API."""

  @auth.method(
      checkout_messages.CheckoutRequest,
      message_types.VoidMessage,
      name='create',
      path='create',
      http_method='POST')
  def create(self, request):
    """Creates the """
    self.check_xsrf_token(self.request_state)
    user_email = user_lib.get_user_email()
    try:
        checkout_model.CheckoutM.createUser(fn=request.firstName,ln="request.lastName",user_email=user_email)
    except(datastore_errors.BadValueError)as error:
        raise endpoints.BadRequestException(str(error))
    return message_types.VoidMessage()
