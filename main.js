'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        height: 850,
        width: 1200
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html');
});
