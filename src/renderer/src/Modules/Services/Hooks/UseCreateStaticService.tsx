import { StaticService } from '@renderer/Common/Hooks/types.defs'
import { useState } from 'react'

export default function useCreateStaticService() {
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
    console.log('Hola mundo')
  }
  const handleLoadEnv = async () => {
    console.log('Env loaded')
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
    console.log(service)
  }

  return {
    service,
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

type CreateStaticServiceRequest = Omit<StaticService, 'id' | 'slug' | 'createdAt' | 'updatedAt'>
