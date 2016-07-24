'use strict';

const Electorn = require('electron');

const Tray = Electorn.Tray;
const Menu = Electron.Menu;
const app = Electron.app;

const BrowserWindow = Electron.BrowserWindow;

const path = require('path');

const config = require('./config/app');

var mainWindow = null;

var appIcon = null;
var forceQuit = false;

app.on('window-all-closed', () => {
    if(process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', () => {

    mainWindow = new BrowserWindow({
        title : config.title,
        width : config.width,
        height : config.height
        //webPreference : {
        //
        //}
    });

    var contextMenu = Menu.buildFromTemplate([
        {
            label : '열기', click : reopenMainWindow
        },
        {
            label : '종료', click : closeMainWindow
        }
    ]);
    appIcon.setToolTip(`${config.title}입니다.`);
    appIcon.setContextMenu(contextMenu);

    appIcon.on('click', (e, b) => {
        reopenMainWindow();
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.on('close', () => {
        if(!forceQuit) {

            e.preventDefault();
            mainWindow.hide();
        }
    });

});

function reopenMainWindow(e) {
    if(!mainWindow.isVisible()) {
        mainWindow.show();
    }
}

function closeMainWindow() {
    forceQuit = true;
    app.quit();
}