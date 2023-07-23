const { BrowserWindow } = require('electron')
var path = require('path')
var newWin;
module.exports = {
    screenShot: screenShot
}
function screenShot() {
    console.log('begin to screenShot')
    newWin = new BrowserWindow({ width: 1920, height: 1080, frame: false,transparent: true, movable: true})
    console.log(path.resolve(__dirname, './template/screenShot.html'));
    newWin.loadURL(path.resolve(__dirname, './template/screenShot.html'));
    newWin.webContents.openDevTools()
    newWin.setMovable(true)
    newWin.setMaximizable(true)
}