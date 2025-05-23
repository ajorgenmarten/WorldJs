import { Folder } from 'lucide-react'
import { Link } from 'react-router'
import Header from '../../../Common/Components/Header'
import EnvVars from '../Components/EnvVars'
import InputGroup from '../Components/InputGroup'
import useCreateStaticService from '../Hooks/UseCreateStaticService'

export function AddStaticService() {
  const {
    staticService,
    handleOnInputChange,
    handleFolderSelect,
    handleSubmit,
    addEnvVar,
    removeEnvVar,
    updateEnvVar
  } = useCreateStaticService()

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-[#0f0f0f] dark:to-[#050505]">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Header
          title="Agregar Sitio Estático"
          subtitle="Configura los detalles para tu nuevo sitio web estático"
        />

        <main>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm dark:from-blue-950/20 dark:to-indigo-950/20 dark:shadow-gray-950/10">
              <div className="space-y-6">
                <div className="grid w-full grid-cols-6 gap-2">
                  <InputGroup
                    className="col-span-4"
                    label="Nombre del servicio"
                    id="service-name"
                    name="name"
                    type="text"
                    placeholder="mi-sitio-web"
                    onChange={handleOnInputChange}
                    value={staticService.name}
                    required
                  />

                  <InputGroup
                    className="col-span-2"
                    label="Puerto"
                    type="number"
                    id="port"
                    name="port"
                    placeholder="3000"
                    onChange={handleOnInputChange}
                    value={staticService.port}
                  />
                </div>

                <div className="grid w-full grid-cols-2 gap-2">
                  <InputGroup label="Directorio raíz" id="root-dir" placeholder="/" type="text" />

                  <InputGroup
                    label="Publish directory"
                    type="text"
                    id="publish-dir"
                    name="publishDir"
                    placeholder="dist"
                    onChange={handleOnInputChange}
                    value={staticService.publishDir}
                  />
                </div>

                <div>
                  <label
                    htmlFor="project-folder"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Carpeta del proyecto
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="project-path"
                      name="projectPath"
                      className="w-full rounded-l-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/50"
                      placeholder="Selecciona la carpeta de tu proyecto"
                      value={staticService.projectPath}
                      readOnly
                    />
                    <button
                      type="button"
                      onClick={handleFolderSelect}
                      className="inline-flex items-center rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      <Folder className="mr-2 h-4 w-4" />
                      Explorar
                    </button>
                  </div>
                </div>

                <InputGroup
                  label="Build command"
                  type="text"
                  id="build-command"
                  name="buildCommand"
                  placeholder="npm run build"
                  onChange={handleOnInputChange}
                  value={staticService.buildCommand}
                />

                <EnvVars
                  envs={staticService.envVars}
                  onAddVar={addEnvVar}
                  onUpdateVar={updateEnvVar}
                  onRemoveVar={removeEnvVar}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Link
                to="/"
                className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                Crear sitio
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
