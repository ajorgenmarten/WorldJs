import { useState } from 'react'
import Header from '../../../Common/Components/Header'
import { PlayCircle, StopCircle, RefreshCcwDot, Terminal, Settings, Trash2 } from 'lucide-react'
import { Link } from 'react-router'

export default function ServiceDetails() {
  const [serviceStatus, setServiceStatus] = useState('inactive')
  const [serviceType] = useState('static')
  const [serviceName] = useState('Mi Servicio')
  const [logs, setLogs] = useState([
    '> Iniciando servicio...',
    '> Configurando puerto 3000',
    '> Servidor listo en http://localhost:3000'
  ])

  const handleStart = () => setServiceStatus('active')
  const handleStop = () => setServiceStatus('inactive')
  const handleRestart = () => {
    setServiceStatus('inactive')
    setTimeout(() => setServiceStatus('active'), 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-[#0f0f0f] dark:to-[#050505]">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <Header title="Detalles" subtitle="Información del servicio" />

        <main className="space-y-6">
          <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm dark:from-blue-950/20 dark:to-indigo-950/20 dark:shadow-gray-950/10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {serviceName}
                </h1>
                <div className="mt-1 flex items-center space-x-2">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30">
                    {serviceType}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${serviceStatus === 'active' ? 'animate-pulse bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                    />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {serviceStatus === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handleStart}
                  className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 p-2 text-white shadow-sm hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50"
                  title="Iniciar"
                  disabled={serviceStatus === 'active'}
                >
                  <PlayCircle className="h-5 w-5" />
                </button>
                <button
                  onClick={handleStop}
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white p-2 text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 disabled:opacity-50"
                  title="Detener"
                  disabled={serviceStatus === 'inactive'}
                >
                  <StopCircle className="h-5 w-5" />
                </button>
                <button
                  onClick={handleRestart}
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white p-2 text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 disabled:opacity-50"
                  title="Reiniciar"
                  disabled={serviceStatus === 'inactive'}
                >
                  <RefreshCcwDot className="h-5 w-5" />
                </button>
                <Link
                  to="/edit"
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white p-2 text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  title="Editar configuración"
                >
                  <Settings className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-gray-900 shadow-sm dark:shadow-gray-950/50">
            <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
              <div className="flex items-center">
                <Terminal className="mr-2 h-4 w-4 text-gray-400" />
                <h2 className="text-sm font-medium text-gray-200">Logs del Servicio</h2>
              </div>
              <button
                onClick={() => setLogs([])}
                className="rounded p-1 text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                title="Limpiar logs"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="font-mono">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className="border-b border-gray-800 px-4 py-2 text-sm text-emerald-400 last:border-0"
                >
                  {log}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
