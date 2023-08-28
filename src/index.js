const { app, BrowserWindow } = require('electron');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 700,
        resizable: false,
        // frame: false
    });

    mainWindow.loadURL('http://127.0.0.1:5500/src/pages/index.html');
    // mainWindow.loadURL('http://127.0.0.1:5500/src/pages/index.html');
});