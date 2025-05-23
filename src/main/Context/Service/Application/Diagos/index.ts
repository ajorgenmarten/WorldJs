import { BrowserWindow, dialog } from 'electron'
import { Injectable } from 'electron-di'

@Injectable()
export default class Dialogs {
  async getFolderPath() {
    const mainWindow = BrowserWindow.getAllWindows()[0]
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
      title: 'Selecciona la carpeta de tu proyecto'
    })

    if (!result.canceled && result.filePaths.length > 0) {
      return result.filePaths[0]
    }

    return null
  }
}
