const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path')
const ipc = ipcMain

app.on('ready', () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 600,
        resizable: true,
        frame: false,
        icon: __dirname + '/pages/assets/right.png',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true
        }
    });

    ipc.on('minimizeApp', () => {
        win.minimize()
    })

    ipc.on('maximizeRestoreApp', () => {
        if (win.isMaximized()) {
            win.restore()
        } else {
            win.maximize()
        }
    })

    win.on('maximize', () => {
        win.webContents.send('isMaximized')
    })

    win.on('unmaximize', () => {
        win.webContents.send('isRestored')
    })

    ipc.on('closeApp', () => {
        win.close()
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

<<<<<<< HEAD
    win.loadURL('http://127.0.0.1:5500/frontend/src/pages/perfil/index.html');
=======
    win.loadURL('http://127.0.0.1:5500/frontend/src/pages/login/index.html');
>>>>>>> 65b5de3aae1e979cf8ef0d63129b26fa0ca945d7
    // win.loadFile(__dirname + '/pages/index.hmtl')
});