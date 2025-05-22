import { useState } from 'react'
import { CreateStaticServiceOutput } from '../Ports/Outputs'

export default function useCreateStaticService() {
  const [staticService, setStaticService] = useState<CreateStaticServiceOutput>({
    name: '',
    projectPath: '',
    rootDir: '',
    buildCommand: '',
    publishDir: '',
    port: 0,
    envVars: []
  })

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setStaticService((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    alert(JSON.stringify(staticService))
    console.log('Formulario enviado')
  }

  const handleFolderSelect = () => {
    setStaticService((prevState) => ({
      ...prevState,
      projectPath: '/usuarios/proyectos/mi-proyecto'
    }))
  }

  const addEnvVar = () => {
    const newVars = [...staticService.envVars, { key: '', value: '' }]
    setStaticService((prevState) => ({ ...prevState, envVars: newVars }))
  }

  const removeEnvVar = (index: number) => {
    const newVars = [...staticService.envVars]
    newVars.splice(index, 1)
    setStaticService((prevState) => ({ ...prevState, envVars: newVars }))
  }

  const updateEnvVar = (index: number, field: 'key' | 'value', value: string) => {
    const newVars = [...staticService.envVars]
    newVars[index][field] = value
    setStaticService((prevState) => ({ ...prevState, envVars: newVars }))
  }

  return {
    staticService,
    handleOnInputChange,
    handleFolderSelect,
    handleSubmit,
    addEnvVar,
    removeEnvVar,
    updateEnvVar
  }
}
