import Header from '../Components/Header'
import Footer from '@renderer/Common/Components/Footer'
import Form from '../Components/Form'
import InputGroup from '../Components/InputGroup'
import SelectFolder from '../Components/SelectFolder'
import useCreateStaticService from '../Hooks/UseCreateStaticService'
import SwitchGroup from '../Components/SwitchGroup'
import EnvVars from '../Components/EnvVars'

export default function CreateStaticService() {
  const {
    service,
    loading,
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
      <Form onSubmit={handleSubmit} loading={loading}>
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
            id="exposed"
            label="Exponer servicio"
            checked={service.exposed}
            onCheckedChange={handleExposed}
            checkedInfo="Público (accesible desde internet)"
            unCheckedInfo="Privado (solo interno)"
          />
        </div>

        {/* Environment Variables Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <EnvVars
            envVars={service.envVars || undefined}
            handleAddVar={handleAddVar}
            handleRemoveVar={handleRemoveVar}
            handleUpdateVar={handleUpdateVar}
            handleLoadEnv={handleLoadEnv}
          />
        </div>
      </Form>

      <Footer />
    </div>
  )
}
