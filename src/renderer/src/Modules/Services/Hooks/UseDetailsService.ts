import { useEffect, useState } from 'react'
import { IService } from 'src/main/Common/entities.defs'

export default function useDetailService(id: string) {
  const [service, setService] = useState<IService | null>(null)
  const [logs, setLogs] = useState<string[]>([])

  async function getService() {
    const data = await window.electron.ipcRenderer.invoke('services:get-service', id)
    setService(() => {
      return data
    })
    window.electron.ipcRenderer.send('services:details:active-logger', data.slug)
  }

  useEffect(() => {
    window.electron.ipcRenderer.on('services:details:logs', (_event, arg) => {
      setLogs((prev) => {
        return [...prev, arg]
      })
    })
    return () => {
      window.electron.ipcRenderer.send('services:details:down-logger')
      window.electron.ipcRenderer.removeAllListeners('services:details:logs')
    }
  }, [])

  return { logs, service }
}
