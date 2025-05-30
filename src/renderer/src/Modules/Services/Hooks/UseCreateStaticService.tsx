import { CreateStaticServiceRequest } from '@ports/services.ports'
import { useState } from 'react'

export default function useCreateStaticService() {
  const [loading, setLoading] = useState(false)
  const [service, setService] = useState<CreateStaticServiceRequest>({
    name: '',
    port: 80,
    url: '',
    folderPath: '',
    rootDir: '',
    publishDir: '',
    buildCommand: '',
    exposed: true,
    envVars: []
  })
  const handleExposed = (e: boolean) => {
    setService((prev) => {
      prev.exposed = e
      return { ...prev }
    })
  }
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const ObjectKey = e.target.id
    const ObjectValue = e.target.value
    setService((prev) => {
      prev[ObjectKey] = ObjectValue
      return { ...prev }
    })
  }
  const handleSelectFolder = async () => {
    const path = await window.electron.ipcRenderer.invoke('services:select-folder')
    if (!path) return
    setService((prev) => {
      prev.folderPath = path
      return { ...prev }
    })
  }
  const handleLoadEnv = async () => {
    const data = await window.electron.ipcRenderer.invoke('services:load-envs')
    if (!data) return
    setService((prev) => {
      prev.envVars = data
      return { ...prev }
    })
  }
  const handleAddVar = () => {
    setService((prev) => {
      if (!prev.envVars) prev.envVars = [{ key: '', value: '' }]
      else prev.envVars = [...prev.envVars, { key: '', value: '' }]
      return { ...prev }
    })
  }
  const handleRemoveVar = async (index: number) => {
    setService((prev) => {
      const newEvnVars = prev.envVars?.filter((_, i) => i !== index)
      prev.envVars = newEvnVars || []
      return { ...prev }
    })
  }
  const handleUpdateVar = async (index: number, field: 'key' | 'value', value: string) => {
    setService((prev) => {
      if (!prev.envVars) prev.envVars = []
      if (!prev.envVars[index]) prev.envVars[index] = { key: '', value: '' }
      else prev.envVars[index][field] = value
      return { ...prev }
    })
  }
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = await window.electron.ipcRenderer.invoke('services:add-static-service', service)
    setLoading(false)
    if (data && data.success == false) {
      alert(data.details.message || data.reason)
    }
  }

  return {
    service,
    loading,
    handleChange,
    handleExposed,
    handleSelectFolder,
    handleLoadEnv,
    handleAddVar,
    handleRemoveVar,
    handleUpdateVar,
    handleSubmit
  }
}
