const { resolve } = require('path')
const { Tray } = require('electron')

const iconPath = resolve(__dirname, '../', 'assets', 'cancelar.png')

function createTray() {
  const tray = new Tray(iconPath)
  return tray
}

module.exports = createTray()