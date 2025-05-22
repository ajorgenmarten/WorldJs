import { useState } from 'react'
import { ArrowLeft, Folder, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router'

export default function AddStaticService() {
  const [projectPath, setProjectPath] = useState('')
  const [envVars, setEnvVars] = useState<{ key: string; value: string }[]>([{ key: '', value: '' }])

  const addEnvVar = () => {
    setEnvVars([...envVars, { key: '', value: '' }])
  }

  const removeEnvVar = (index: number) => {
    const newVars = [...envVars]
    newVars.splice(index, 1)
    setEnvVars(newVars.length ? newVars : [{ key: '', value: '' }])
  }

  const updateEnvVar = (index: number, field: 'key' | 'value', value: string) => {
    const newVars = [...envVars]
    newVars[index][field] = value
    setEnvVars(newVars)
  }

  const handleSelectFolder = () => {
    // En una implementación real, esto se conectaría con una API del sistema
    // o un selector de archivos nativo
    const mockSelectedPath = '/usuarios/proyectos/mi-proyecto'
    setProjectPath(mockSelectedPath)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para procesar el formulario
    console.log('Formulario enviado')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-[#0f0f0f] dark:to-[#050505]">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <Link
            to="/"
            className="mb-6 inline-flex items-center text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al panel
          </Link>
          <h1 className="text-3xl font-extralight tracking-tight text-gray-900 dark:text-white">
            Agregar Sitio Estático
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Configura los detalles para tu nuevo sitio web estático
          </p>
        </header>

        <main>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm dark:from-blue-950/20 dark:to-indigo-950/20 dark:shadow-gray-950/10">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="service-name"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Nombre del servicio
                  </label>
                  <input
                    type="text"
                    id="service-name"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/50"
                    placeholder="mi-sitio-web"
                    required
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
                      id="project-folder"
                      className="w-full rounded-l-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/50"
                      placeholder="Selecciona la carpeta de tu proyecto"
                      value={projectPath}
                      readOnly
                    />
                    <button
                      type="button"
                      onClick={handleSelectFolder}
                      className="inline-flex items-center rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      <Folder className="mr-2 h-4 w-4" />
                      Explorar
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="root-dir"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Directorio raíz
                  </label>
                  <input
                    type="text"
                    id="root-dir"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/50"
                    placeholder="/"
                  />
                </div>

                <div>
                  <label
                    htmlFor="build-command"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Build command
                  </label>
                  <input
                    type="text"
                    id="build-command"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/50"
                    placeholder="npm run build"
                  />
                </div>

                <div>
                  <label
                    htmlFor="publish-dir"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Publish directory
                  </label>
                  <input
                    type="text"
                    id="publish-dir"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/50"
                    placeholder="dist"
                  />
                </div>

                <div>
                  <label
                    htmlFor="port"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Puerto
                  </label>
                  <input
                    type="number"
                    id="port"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/50"
                    placeholder="3000"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                      Variables de entorno
                    </label>
                    <button
                      type="button"
                      onClick={addEnvVar}
                      className="inline-flex items-center rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
                    >
                      <Plus className="mr-1 h-3.5 w-3.5" />
                      Añadir
                    </button>
                  </div>

                  <div className="space-y-3">
                    {envVars.map((variable, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={variable.key}
                          onChange={(e) => updateEnvVar(index, 'key', e.target.value)}
                          className="w-2/5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/50"
                          placeholder="CLAVE"
                        />
                        <input
                          type="text"
                          value={variable.value}
                          onChange={(e) => updateEnvVar(index, 'value', e.target.value)}
                          className="w-3/5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/50"
                          placeholder="valor"
                        />
                        <button
                          type="button"
                          onClick={() => removeEnvVar(index)}
                          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                          aria-label="Eliminar variable"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
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
