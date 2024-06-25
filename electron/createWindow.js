const { BrowserWindow } = require('electron')

function createWindow() {
  const win = new BrowserWindow({
    width: 300,
    height: 500,
    // show: true,
    // frame: true,
    // resizable: true,
    // fullscreen: false,
    // transparent: true,
    // skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  win.loadFile('index.html');

  return win
}

module.exports = createWindow()