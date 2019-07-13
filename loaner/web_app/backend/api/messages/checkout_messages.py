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

"""Datastore messages for Bootstrap API."""

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

from protorpc import messages


class CheckoutRequest(messages.Message):
  """General Device request ProtoRPC message with several identifiers.

  Attributes:
    asset_tag: str, The asset tag of the Chrome device.
    chrome_device_id: str, The Chrome device id of the Chrome device.
    serial_number: str, The serial number of the Chrome device.
    urlkey: str, The URL-safe key of a device.
    identifier: str, Either an asset tag or serial number of the device.
  """
  firstName = messages.StringField(1)
  lastName = messages.StringField(2)
