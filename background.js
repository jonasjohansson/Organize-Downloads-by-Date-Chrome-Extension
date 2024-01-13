/**
* Author: Lucas Bustamante
* Website: https://www.lucasbustamante.com.br
* Updated by: Jonas Johansson
* Website: https://www.jonasjohansson.se
*/

// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

chrome.downloads.onDeterminingFilename.addListener(function(item, __suggest) {
  function suggest(filename, conflictAction) {
    __suggest({
      filename: filename,
      conflictAction: conflictAction,
      conflict_action: conflictAction
    });
    // conflict_action was renamed to conflictAction in
    // https://chromium.googlesource.com/chromium/src/+/f1d784d6938b8fe8e0d257e41b26341992c2552c
    // which was first picked up in branch 1580.
  }

  var d = new Date();
  var day = ('0' + d.getUTCDate()).slice(-2);
  var month = ('0' + (d.getUTCMonth() + 1)).slice(-2); // index starts at 0, so we have to add 1
  var year = d.getUTCFullYear();

  // Get the file extension
  var fileExtension = item.filename.split('.').pop().toLowerCase();

  // Define arrays to group file extensions
  var extensionGroups = [
    { extensions: ['jpeg', 'jpg', 'png'], folder: 'image' },
    { extensions: ['mp4', 'mkv', 'avi', 'mov'], folder: 'video' },
    { extensions: ['mp3', 'wav', 'ogg'], folder: 'audio' },
    { extensions: ['exe', 'dmg', 'app', 'pkg'], folder: 'apps' },
    { extensions: ['doc', 'docx', 'pdf', 'txt', 'md'], folder: 'text' },
    { extensions: ['zip', 'rar'], folder: 'archive' }
    // Add more extension groups as needed
  ];

  // Find the corresponding folder for the file extension
  var folder = extensionGroups.find(group => group.extensions.includes(fileExtension))?.folder || 'other';

  // Include the folder information in the suggested filename
  suggest(year + '/' + month + '/' + day + '/' + folder + '/' + item.filename, 'uniquify');
  return;
});
