import { useState } from 'react'
import { Plus, Upload, X, FolderOpen } from 'lucide-react'
import { Button } from '@renderer/Common/Components/ui/button'
import { Input } from '@renderer/Common/Components/ui/input'
import { Label } from '@renderer/Common/Components/ui/label'
import Header from '../Components/Header'
import Footer from '@renderer/Common/Components/Footer'

interface EnvVar {
  key: string
  value: string
}

export default function CreateStaticService() {
  const [formData, setFormData] = useState({
    name: '',
    port: '',
    folderPath: '',
    rootDir: '',
    buildCommand: '',
    url: '',
    publishDir: ''
  })

  const [envVars, setEnvVars] = useState<EnvVar[]>([{ key: '', value: '' }])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleDirectorySelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      // Obtener la ruta del primer archivo para extraer el directorio
      const firstFile = files[0]
      const fullPath = firstFile.webkitRelativePath || firstFile.name
      // Extraer solo la ruta del directorio (sin el nombre del archivo)
      const directoryPath = fullPath.substring(0, fullPath.lastIndexOf('/')) || fullPath
      setFormData((prev) => ({ ...prev, folderPath: directoryPath }))
    }
  }

  const addEnvVar = () => {
    setEnvVars((prev) => [...prev, { key: '', value: '' }])
  }

  const removeEnvVar = (index: number) => {
    setEnvVars((prev) => prev.filter((_, i) => i !== index))
  }

  const updateEnvVar = (index: number, field: 'key' | 'value', value: string) => {
    setEnvVars((prev) => prev.map((env, i) => (i === index ? { ...env, [field]: value } : env)))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        const lines = content.split('\n')
        const newEnvVars: EnvVar[] = []

        lines.forEach((line) => {
          const trimmed = line.trim()
          if (trimmed && !trimmed.startsWith('#')) {
            const [key, ...valueParts] = trimmed.split('=')
            if (key && valueParts.length > 0) {
              newEnvVars.push({
                key: key.trim(),
                value: valueParts.join('=').trim()
              })
            }
          }
        })

        if (newEnvVars.length > 0) {
          setEnvVars(newEnvVars)
        }
      }
      reader.readAsText(file)
    }
  }

  const handleSubmit = () => {
    console.log('Form Data:', formData)
    console.log('Environment Variables:', envVars)
    // Aquí iría la lógica para crear el servicio
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Crear Sitio Estático" subtitle="Configura tu nuevo sitio web estático" />

      {/* Form */}
      <div className="max-w-4xl mx-auto px-8 pb-16">
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Nombre del Proyecto
              </Label>
              <Input
                id="name"
                placeholder="mi-sitio-web"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="border-gray-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>

            {/* Port */}
            <div className="space-y-2">
              <Label htmlFor="port" className="text-gray-700 font-medium">
                Puerto
              </Label>
              <Input
                id="port"
                placeholder="3000"
                value={formData.port}
                onChange={(e) => handleInputChange('port', e.target.value)}
                className="border-gray-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>

            {/* Folder Path with Directory Selector */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="folderPath" className="text-gray-700 font-medium">
                Ruta de la Carpeta del Proyecto
              </Label>
              <div className="flex gap-2">
                <Input
                  id="folderPath"
                  placeholder="/ruta/a/tu/proyecto"
                  value={formData.folderPath}
                  onChange={(e) => handleInputChange('folderPath', e.target.value)}
                  className="border-gray-200 focus:border-blue-400 focus:ring-blue-400 flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('directory-selector')?.click()}
                  className="border-gray-200 text-gray-600 hover:bg-gray-50 px-4"
                >
                  <FolderOpen className="w-4 h-4 mr-2" />
                  Explorar
                </Button>
                <input
                  id="directory-selector"
                  type="file"
                  multiple
                  onChange={handleDirectorySelect}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-gray-500">
                Selecciona la carpeta que contiene tu proyecto
              </p>
            </div>

            {/* Root Dir */}
            <div className="space-y-2">
              <Label htmlFor="rootDir" className="text-gray-700 font-medium">
                Directorio Raíz
              </Label>
              <Input
                id="rootDir"
                placeholder="./"
                value={formData.rootDir}
                onChange={(e) => handleInputChange('rootDir', e.target.value)}
                className="border-gray-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>

            {/* Build Command */}
            <div className="space-y-2">
              <Label htmlFor="buildCommand" className="text-gray-700 font-medium">
                Comando de Build
              </Label>
              <Input
                id="buildCommand"
                placeholder="npm run build"
                value={formData.buildCommand}
                onChange={(e) => handleInputChange('buildCommand', e.target.value)}
                className="border-gray-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>

            {/* Publish Dir */}
            <div className="space-y-2">
              <Label htmlFor="publishDir" className="text-gray-700 font-medium">
                Directorio de Publicación
              </Label>
              <Input
                id="publishDir"
                placeholder="dist"
                value={formData.publishDir}
                onChange={(e) => handleInputChange('publishDir', e.target.value)}
                className="border-gray-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>

            {/* URL */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="url" className="text-gray-700 font-medium">
                URL para establecer localmente
              </Label>
              <Input
                id="url"
                placeholder="project.test.server"
                value={formData.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
                className="border-gray-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Environment Variables Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Label className="text-gray-700 font-medium text-base">Variables de Entorno</Label>
                <p className="text-gray-600 text-sm mt-1">
                  Configura las variables de entorno para tu aplicación
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('env-file')?.click()}
                  className="border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Cargar .env
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addEnvVar}
                  className="border-gray-200 text-gray-600 hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar
                </Button>
              </div>
            </div>

            <input
              id="env-file"
              type="file"
              accept=".env"
              onChange={handleFileUpload}
              className="hidden"
            />

            <div className="space-y-3">
              {envVars.map((envVar, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <Input
                    placeholder="VARIABLE_NAME"
                    value={envVar.key}
                    onChange={(e) => updateEnvVar(index, 'key', e.target.value)}
                    className="border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                  />
                  <Input
                    placeholder="valor"
                    value={envVar.value}
                    onChange={(e) => updateEnvVar(index, 'value', e.target.value)}
                    className="border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                  />
                  {envVars.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEnvVar(index)}
                      className="text-gray-400 hover:text-red-500 px-2"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 mt-8 pt-8 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Cancelar
            </Button>
            <Button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white">
              Crear Sitio Estático
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
