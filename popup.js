// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let changeColor = document.getElementById('changeColor');
let domainInput = document.getElementById('domain');
let tokenInput = document.getElementById('token');
let uuidInput = document.getElementById('uuid');
let saveBtn = document.getElementById('saveBtn');
let connectBtn = document.getElementById('connectBtn');
var isConnected = false;

chrome.storage.sync.get('domain', function(data) {
  console.log(data);
  if (data.domain != undefined) {
    domainInput.value = data.domain;
  }
});
chrome.storage.sync.get('token', function(data) {
  if (data.token != undefined) {
    tokenInput.value = data.token;
  }
});
chrome.storage.sync.get('uuid', function(data) {
  if (data.uuid != undefined) {
    uuidInput.value = data.uuid;
  }
});
chrome.storage.sync.get('isConnected', function(data) {
  if (data.isConnected != undefined) {
    isConnected = data.isConnected;
  }

  if (isConnected) {
    connectBtn.innerText = 'Disconnect';
  } else {
    connectBtn.innerText = 'Connect';
  }
});

saveBtn.onclick = function(element) {
  chrome.storage.sync.set({'domain': domainInput.value}, function() {});
  chrome.storage.sync.set({'token': tokenInput.value}, function() {
    tokenInput.setAttribute('value', tokenInput.value);
  });
  chrome.storage.sync.set({'uuid': uuidInput.value}, function() {});
};

connectBtn.onclick = function(element) {
  if (isConnected) {
    chrome.storage.sync.set({'isConnected': false}, function() {
      isConnected = false;
      connectBtn.innerText = 'Connect';
    });
  } else {
    chrome.storage.sync.set({'isConnected': true}, function() {
      isConnected = true;
      connectBtn.innerText = 'Disconnect';
    });
  }
};
