import { readFile } from 'node:fs/promises'
import { BrowserWindow, dialog } from 'electron'
import dotenv from 'dotenv'
import { Injectable } from 'electron-di'
import { IEnvVar } from '@main/Common/entities.defs'

@Injectable()
export default class Dialogs {
  private mainWindow = BrowserWindow.getAllWindows()[0]

  async selectFolder() {
    const { canceled, filePaths } = await dialog.showOpenDialog(this.mainWindow, {
      properties: ['openDirectory'],
      title: 'Seleccionar directorio',
      buttonLabel: 'Seleccionar'
    })
    if (!canceled && filePaths.length > 0) return filePaths[0]
    return null
  }

  async loadEnvVars() {
    const { canceled, filePaths } = await dialog.showOpenDialog(this.mainWindow, {
      properties: ['openFile'],
      title: 'Seleccionar archivo de variables de entorno (.env)',
      buttonLabel: 'Seleccionar',
      filters: [{ name: 'env', extensions: ['env'] }]
    })
    if (canceled || filePaths.length == 0) return null
    const envPath = filePaths[0]
    const file = await readFile(envPath, { encoding: 'utf-8' })
    const envObject = dotenv.parse(file)
    const envsArray: IEnvVar[] = []
    for (const key in envObject) envsArray.push({ key, value: envObject[key] })
    return envsArray
  }
}
