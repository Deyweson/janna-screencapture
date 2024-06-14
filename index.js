const { app, Tray, Menu, nativeImage, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 200,
        height: 300,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    win.loadFile('index.html')
}


app.whenReady().then(() => {
    createWindow()
})