const { app } = require('electron')
const controlWindow = require('./controlWindow')

function App() {

    const win = require('./createWindow')
    const tray = require('./tray')

    const { toggle } = controlWindow(win, tray)

    tray.on('click', toggle)
}

app.whenReady().then(App)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

