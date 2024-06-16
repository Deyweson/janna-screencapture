const { app, Tray, Menu, nativeImage, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 300,
        height: 550,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        // resizable: false,
    })

    win.loadFile('index.html')
}


app.whenReady().then(() => {
    createWindow()
})