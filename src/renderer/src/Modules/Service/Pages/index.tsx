import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Database, Server, Zap, Code } from 'lucide-react'
import { Link } from 'react-router'

type ServiceType = 'postgres' | 'nats' | 'redis' | 'nodejs' | null

export default function AddService() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<ServiceType>(null)

  const handleServiceSelect = (service: ServiceType) => {
    setSelectedService(service)
  }

  const goToNextStep = () => {
    setStep(2)
  }

  const goToPreviousStep = () => {
    setStep(1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para procesar el formulario
    console.log('Servicio creado:', selectedService)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-[#0f0f0f] dark:to-[#050505]">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <Link
            to="/"
            className="mb-6 inline-flex items-center text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al panel
          </Link>
          <h1 className="text-3xl font-extralight tracking-tight text-gray-900 dark:text-white">
            Agregar Servicio
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Configura un nuevo servicio para tu infraestructura
          </p>
        </header>

        <main>
          {/* Stepper */}
          <div className="mb-8">
            <div className="flex items-center justify-center">
              <div className="flex w-full max-w-xs items-center">
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                    step >= 1
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                      : 'border-2 border-gray-300 dark:border-gray-700'
                  }`}
                >
                  {step > 1 ? <Check className="h-5 w-5" /> : <span>1</span>}
                </div>
                <div className="flex-auto border-t-2 border-gray-300 dark:border-gray-700"></div>
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${
                    step >= 2
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                      : 'border-2 border-gray-300 dark:border-gray-700'
                  }`}
                >
                  {step > 2 ? <Check className="h-5 w-5" /> : <span>2</span>}
                </div>
              </div>
            </div>
            <div className="mt-2 flex justify-center">
              <div className="flex w-full max-w-xs justify-between text-xs">
                <span className="font-medium text-gray-900 dark:text-white">
                  Seleccionar servicio
                </span>
                <span
                  className={`${
                    step >= 2
                      ? 'font-medium text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  Configurar
                </span>
              </div>
            </div>
          </div>

          {/* Step 1: Select Service Type */}
          {step === 1 && (
            <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-sm dark:from-emerald-950/20 dark:to-teal-950/20 dark:shadow-gray-950/10">
              <h2 className="mb-6 text-xl font-medium text-gray-900 dark:text-white">
                Selecciona el tipo de servicio
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    id: 'postgres',
                    name: 'PostgreSQL',
                    description: 'Base de datos relacional SQL potente y de código abierto',
                    icon: <Database className="h-6 w-6" strokeWidth={1.5} />,
                    color:
                      'from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30',
                    hoverColor:
                      'group-hover:from-blue-200 group-hover:to-indigo-200 dark:group-hover:from-blue-900/40 dark:group-hover:to-indigo-900/40'
                  },
                  {
                    id: 'nats',
                    name: 'NATS',
                    description: 'Sistema de mensajería para microservicios, IoT y cloud native',
                    icon: <Zap className="h-6 w-6" strokeWidth={1.5} />,
                    color:
                      'from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30',
                    hoverColor:
                      'group-hover:from-amber-200 group-hover:to-yellow-200 dark:group-hover:from-amber-900/40 dark:group-hover:to-yellow-900/40'
                  },
                  {
                    id: 'redis',
                    name: 'Redis',
                    description:
                      'Almacén de estructura de datos en memoria, caché y broker de mensajes',
                    icon: <Server className="h-6 w-6" strokeWidth={1.5} />,
                    color: 'from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30',
                    hoverColor:
                      'group-hover:from-red-200 group-hover:to-rose-200 dark:group-hover:from-red-900/40 dark:group-hover:to-rose-900/40'
                  },
                  {
                    id: 'nodejs',
                    name: 'Node.js Service',
                    description: 'Servicio personalizado basado en Node.js para tu aplicación',
                    icon: <Code className="h-6 w-6" strokeWidth={1.5} />,
                    color:
                      'from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30',
                    hoverColor:
                      'group-hover:from-green-200 group-hover:to-emerald-200 dark:group-hover:from-green-900/40 dark:group-hover:to-emerald-900/40'
                  }
                ].map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleServiceSelect(service.id as ServiceType)}
                    className={`group flex flex-col rounded-lg border-2 p-5 transition-all ${
                      selectedService === service.id
                        ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50 dark:border-emerald-600 dark:from-emerald-950/30 dark:to-teal-950/30'
                        : 'border-transparent bg-gradient-to-br hover:border-gray-200 dark:hover:border-gray-700'
                    } ${service.color} ${service.hoverColor}`}
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div
                        className={`rounded-full p-2 ${
                          selectedService === service.id
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                            : 'bg-white/80 text-gray-700 dark:bg-gray-800/80 dark:text-gray-300'
                        }`}
                      >
                        {service.icon}
                      </div>
                      {selectedService === service.id && (
                        <div className="rounded-full bg-emerald-100 p-1 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <h3 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
                      {service.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {service.description}
                    </p>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={goToNextStep}
                  disabled={!selectedService}
                  className={`inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
                    selectedService
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700'
                      : 'cursor-not-allowed bg-gray-300 dark:bg-gray-700'
                  }`}
                >
                  Siguiente
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Configure Service */}
          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-sm dark:from-emerald-950/20 dark:to-teal-950/20 dark:shadow-gray-950/10">
                <h2 className="mb-6 text-xl font-medium text-gray-900 dark:text-white">
                  Configurar {selectedService === 'postgres' && 'PostgreSQL'}
                  {selectedService === 'nats' && 'NATS'}
                  {selectedService === 'redis' && 'Redis'}
                  {selectedService === 'nodejs' && 'Node.js Service'}
                </h2>

                {/* PostgreSQL Configuration */}
                {selectedService === 'postgres' && (
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="postgres-name"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Nombre del servicio
                      </label>
                      <input
                        type="text"
                        id="postgres-name"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400 dark:focus:ring-emerald-400/50"
                        placeholder="mi-postgres-db"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="postgres-version"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Versión
                      </label>
                      <select
                        id="postgres-version"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400 dark:focus:ring-emerald-400/50"
                        required
                      >
                        <option value="">Seleccionar versión</option>
                        <option value="15">PostgreSQL 15</option>
                        <option value="14">PostgreSQL 14</option>
                        <option value="13">PostgreSQL 13</option>
                        <option value="12">PostgreSQL 12</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="postgres-port"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Puerto
                      </label>
                      <input
                        type="number"
                        id="postgres-port"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400 dark:focus:ring-emerald-400/50"
                        placeholder="5432"
                        defaultValue="5432"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="postgres-user"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Usuario
                      </label>
                      <input
                        type="text"
                        id="postgres-user"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400 dark:focus:ring-emerald-400/50"
                        placeholder="postgres"
                        defaultValue="postgres"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="postgres-password"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Contraseña
                      </label>
                      <input
                        type="password"
                        id="postgres-password"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400 dark:focus:ring-emerald-400/50"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* NATS Configuration */}
                {selectedService === 'nats' && (
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="nats-name"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Nombre del servicio
                      </label>
                      <input
                        type="text"
                        id="nats-name"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400 dark:focus:ring-emerald-400/50"
                        placeholder="mi-nats-service"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="nats-version"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Versión
                      </label>
                      <select
                        id="nats-version"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400 dark:focus:ring-emerald-400/50"
                        required
                      >
                        <option value="">Seleccionar versión</option>
                        <option value="2.9">NATS 2.9</option>
                        <option value="2.8">NATS 2.8</option>
                        <option value="2.7">NATS 2.7</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="nats-port"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Puerto
                      </label>
                      <input
                        type="number"
                        id="nats-port"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400 dark:focus:ring-emerald-400/50"
                        placeholder="4222"
                        defaultValue="4222"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="nats-cluster"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Modo Cluster
                      </label>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="cluster"
                            value="false"
                            defaultChecked
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">No</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="cluster"
                            value="true"
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500"
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Sí</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Redis Configuration */}
                {selectedService === 'redis' && (
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="redis-name"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Nombre del servicio
                      </label>
                      <input
                        type="text"
                        id="redis-name"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400 dark:focus:ring-emerald-400/50"
                        placeholder="mi-redis-cache"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="redis-version"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Versión
                      </label>
                      <select
                        id="redis-version"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400 dark:focus:ring-emerald-400/50"
                        required
                      >
                        <option value="">Seleccionar versión</option>
                        <option value="7.0">Redis 7.0</option>
                        <option value="6.2">Redis 6.2</option>
                        <option value="6.0">Redis 6.0</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="redis-port"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Puerto
                      </label>
                      <input
                        type="number"
                        id="redis-port"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400 dark:focus:ring-emerald-400/50"
                        placeholder="6379"
                        defaultValue="6379"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="redis-password"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Contraseña (opcional)
                      </label>
                      <input
                        type="password"
                        id="redis-password"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400 dark:focus:ring-emerald-400/50"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                )}

                {/* Node.js Service Configuration */}
                {selectedService === 'nodejs' && (
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="nodejs-name"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Nombre del servicio
                      </label>
                      <input
                        type="text"
                        id="nodejs-name"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400 dark:focus:ring-emerald-400/50"
                        placeholder="mi-nodejs-api"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="nodejs-version"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Versión de Node.js
                      </label>
                      <select
                        id="nodejs-version"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400 dark:focus:ring-emerald-400/50"
                        required
                      >
                        <option value="">Seleccionar versión</option>
                        <option value="20">Node.js 20 LTS</option>
                        <option value="18">Node.js 18 LTS</option>
                        <option value="16">Node.js 16 LTS</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="nodejs-port"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Puerto
                      </label>
                      <input
                        type="number"
                        id="nodejs-port"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400 dark:focus:ring-emerald-400/50"
                        placeholder="3000"
                        defaultValue="3000"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="nodejs-command"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Comando de inicio
                      </label>
                      <input
                        type="text"
                        id="nodejs-command"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400 dark:focus:ring-emerald-400/50"
                        placeholder="npm start"
                        defaultValue="npm start"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="nodejs-repo"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                      >
                        Repositorio Git (opcional)
                      </label>
                      <input
                        type="text"
                        id="nodejs-repo"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-emerald-400 dark:focus:ring-emerald-400/50"
                        placeholder="https://github.com/usuario/repo.git"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Anterior
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  Crear servicio
                  <Check className="ml-2 h-4 w-4" />
                </button>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  )
}
