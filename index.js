const { app, BrowserWindow } = require('electron');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 500,
        height: 500,
        resizable: false
    });

    mainWindow.loadFile('./index.html');
});