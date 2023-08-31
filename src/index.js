const { app, BrowserWindow } = require('electron');

let mainWindow;
let APP_DIR = './pages/';

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 600,
        resizable: false,
        frame: false
    });

    mainWindow.loadURL('http://127.0.0.1:5501/src/pages/index.html');
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});