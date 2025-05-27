import { Plus, Upload, Trash } from 'lucide-react'
import { Button } from '@renderer/Common/Components/ui/button'
import { Input } from '@renderer/Common/Components/ui/input'
import { Label } from '@renderer/Common/Components/ui/label'
import Header from '../Components/Header'
import Footer from '@renderer/Common/Components/Footer'
import Form from '../Components/Form'
import InputGroup from '../Components/InputGroup'
import SelectFolder from '../Components/SelectFolder'
import useCreateStaticService from '../Hooks/UseCreateStaticService'
import SwitchGroup from '../Components/SwitchGroup'

export default function CreateStaticService() {
  const {
    service,
    handleAddVar,
    handleRemoveVar,
    handleUpdateVar,
    handleChange,
    handleSelectFolder,
    handleLoadEnv,
    handleExposed,
    handleSubmit
  } = useCreateStaticService()

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="Crear Sitio Estático" subtitle="Configura tu nuevo sitio web estático" />

      {/* Form */}
      <Form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputGroup
            id="name"
            value={service.name}
            onChange={handleChange}
            label="Nombre del Proyecto"
            placeholder="My static web"
            required
          />

          <InputGroup
            id="port"
            value={service.port}
            onChange={handleChange}
            type="number"
            label="Puerto"
            placeholder="3000"
            required
          />

          <SelectFolder
            id="folderPath"
            value={service.folderPath}
            onChange={handleChange}
            handleSelectFolder={handleSelectFolder}
            placeholder="/ruta/a/mi/proyecto"
            required
          />

          <InputGroup
            id="rootDir"
            value={service.rootDir ?? ''}
            onChange={handleChange}
            label="Directorio Raíz"
            placeholder="./"
          />

          <InputGroup
            id="publishDir"
            value={service.publishDir ?? ''}
            onChange={handleChange}
            label="Directorio de publicación"
            placeholder="dist"
          />

          <InputGroup
            id="buildCommand"
            value={service.buildCommand ?? ''}
            onChange={handleChange}
            label="Comando de construcción"
            placeholder="npm run build"
          />

          <InputGroup
            id="url"
            value={service.url ?? ''}
            onChange={handleChange}
            label="URL para establecer localmente"
            placeholder="myweb.local.test"
          />

          <SwitchGroup
            label="Servicio expuesto"
            checked={service.exposed}
            onCheckedChange={handleExposed}
            checkedInfo="Público (accesible desde internet)"
            unCheckedInfo="Privado (solo interno)"
          />
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
                onClick={handleAddVar}
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
            onChange={handleLoadEnv}
            className="hidden"
          />

          <div className="space-y-3">
            {service.envVars?.map((envVar, index) => (
              <div key={index} className="flex gap-3 items-center">
                <Input
                  placeholder="VARIABLE_NAME"
                  value={envVar.key}
                  onChange={(e) => handleUpdateVar(index, 'key', e.target.value)}
                  className="border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                />
                <Input
                  placeholder="valor"
                  value={envVar.value}
                  onChange={(e) => handleUpdateVar(index, 'value', e.target.value)}
                  className="border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveVar(index)}
                  className="text-gray-400 hover:text-red-500 px-2"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Form>

      <Footer />
    </div>
  )
}
