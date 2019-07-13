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

"""A model representing a device."""

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

import collections
import datetime

from absl import logging

from google.appengine.api import datastore_errors
from google.appengine.ext import deferred
from google.appengine.ext import ndb

from loaner.web_app import constants
from loaner.web_app.backend.api import permissions
from loaner.web_app.backend.clients import directory
from loaner.web_app.backend.lib import events
from loaner.web_app.backend.lib import user as user_lib
from loaner.web_app.backend.models import base_model
from loaner.web_app.backend.models import config_model
from loaner.web_app.backend.models import user_model




class CheckoutM():
  """Datastore model representing a device.

  Attributes:
    first Name:
    Last Name
  """
  first_name = ""
  last_name = ""


  @property
  def is_assigned(self):
    return str(self.assigned_user)


  @classmethod
  def createUser(fn, ln,user_email):
    directory_client = directory.DirectoryApiClient(user_email)
    directory_device_object = directory_client.CreateUser(fn,ln)
