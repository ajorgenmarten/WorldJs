import { useState } from 'react'
import {
  ArrowLeft,
  Edit,
  Trash2,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { Button } from '@renderer/Common/Components/ui/button'
import { Badge } from '@renderer/Common/Components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@renderer/Common/Components/ui/tabs'
import { Switch } from '@renderer/Common/Components/ui/switch'
import Footer from '@renderer/Common/Components/Footer'
import { useParams } from 'react-router'
import useDetailService from '../Hooks/UseDetailsService'
import Header from '../Components/Header'
import Logger from '../Components/Logger'

// Datos de ejemplo para el servicio
const serviceData = {
  id: 'srv-1234567890',
  name: 'api-backend',
  type: 'Node.js',
  status: 'active', // active, inactive, error
  uptime: '5d 12h 30m',
  cpu: '2.3%',
  memory: '256MB / 512MB',
  created: '12 Mayo, 2025',
  port: 3000,
  url: 'https://api-backend.example.com',
  version: 'Node.js v18.15.0',
  lastRestart: '10 Mayo, 2025 - 14:30',
  environment: 'production'
}

// Logs de ejemplo
const sampleLogs = [
  { timestamp: '2025-05-12T14:30:45', level: 'info', message: 'Server started on port 3000' },
  {
    timestamp: '2025-05-12T14:30:46',
    level: 'info',
    message: 'Connected to database successfully'
  },
  { timestamp: '2025-05-12T14:35:22', level: 'warn', message: 'High memory usage detected (75%)' },
  {
    timestamp: '2025-05-12T14:40:15',
    level: 'error',
    message: 'Failed to process request: Invalid token'
  },
  {
    timestamp: '2025-05-12T14:40:16',
    level: 'error',
    message: 'Error details: JWT verification failed'
  },
  { timestamp: '2025-05-12T14:41:05', level: 'info', message: 'Request processed successfully' },
  { timestamp: '2025-05-12T14:45:30', level: 'info', message: 'Database query completed in 235ms' },
  { timestamp: '2025-05-12T14:50:12', level: 'info', message: 'Cache refreshed successfully' },
  {
    timestamp: '2025-05-12T14:55:45',
    level: 'warn',
    message: 'Slow query detected (query_id: 12345)'
  },
  {
    timestamp: '2025-05-12T15:00:00',
    level: 'info',
    message: 'Scheduled task started: cleanup_sessions'
  },
  {
    timestamp: '2025-05-12T15:01:22',
    level: 'info',
    message: 'Scheduled task completed: cleanup_sessions'
  },
  {
    timestamp: '2025-05-12T15:05:18',
    level: 'info',
    message: 'Health check passed: All systems operational'
  }
]

export default function ServiceDetails() {
  const { id } = useParams()
  const { logs, service } = useDetailService(id as string)
  const [isRunning, setIsRunning] = useState(serviceData.status === 'active')
  const [_activeTab, setActiveTab] = useState('overview')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleToggleService = () => {
    setIsRunning(!isRunning)
    // Aquí iría la lógica para iniciar/detener el servicio
  }

  const handleRestart = () => {
    // Aquí iría la lógica para reiniciar el servicio
    console.log('Restarting service...')
  }

  const handleDelete = () => {
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    // Aquí iría la lógica para eliminar el servicio
    console.log('Deleting service...')
    setShowDeleteConfirm(false)
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(false)
  }

  const handleEdit = () => {
    // Aquí iría la lógica para editar el servicio
    console.log('Editing service...')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500'
      case 'inactive':
        return 'bg-gray-500'
      case 'error':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header title={`Detalles sobre ${service?.name}`} />
      <div className="pt-8 pb-8">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-800"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(serviceData.status)}`}></div>
              <h1 className="text-2xl font-normal text-gray-700">{serviceData.name}</h1>
              <Badge variant="outline" className="text-gray-600 bg-gray-100">
                {serviceData.type}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              {!showDeleteConfirm ? (
                <>
                  <div className="flex items-center mr-2">
                    <Switch
                      id="service-status"
                      checked={isRunning}
                      onCheckedChange={handleToggleService}
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      {isRunning ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRestart}
                    className="border-gray-200 text-gray-600 hover:bg-gray-50"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reiniciar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEdit}
                    className="border-gray-200 text-gray-600 hover:bg-gray-50"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDelete}
                    className="border-gray-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-2 bg-red-50 p-2 rounded-md">
                  <span className="text-sm text-red-600">¿Eliminar este servicio?</span>
                  <Button size="sm" variant="destructive" onClick={confirmDelete}>
                    Confirmar
                  </Button>
                  <Button size="sm" variant="ghost" onClick={cancelDelete}>
                    Cancelar
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 pb-16">
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="config">Configuración</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Status Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-gray-700 font-medium text-base mb-4">Estado</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Estado</span>
                    <Badge
                      className={`${
                        isRunning ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      } rounded-full`}
                    >
                      {isRunning ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Tiempo activo</span>
                    <span className="text-gray-800 text-sm font-medium">{serviceData.uptime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Último reinicio</span>
                    <span className="text-gray-800 text-sm font-medium">
                      {serviceData.lastRestart}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Entorno</span>
                    <Badge
                      variant="outline"
                      className="bg-purple-50 text-purple-800 border-purple-200"
                    >
                      {serviceData.environment}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Resources Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-gray-700 font-medium text-base mb-4">Recursos</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-600 text-sm">CPU</span>
                      <span className="text-gray-800 text-sm font-medium">{serviceData.cpu}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-600 text-sm">Memoria</span>
                      <span className="text-gray-800 text-sm font-medium">
                        {serviceData.memory}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Puerto</span>
                      <span className="text-gray-800 text-sm font-medium">{serviceData.port}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 text-sm">Versión</span>
                      <span className="text-gray-800 text-sm font-medium">
                        {serviceData.version}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Events Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-gray-700 font-medium text-base mb-4">Eventos Recientes</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-gray-800 text-sm font-medium">Servicio iniciado</p>
                      <p className="text-gray-500 text-xs">Hoy, 14:30</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-gray-800 text-sm font-medium">Alto uso de memoria</p>
                      <p className="text-gray-500 text-xs">Hoy, 13:45</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <XCircle className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <p className="text-gray-800 text-sm font-medium">Error de autenticación</p>
                      <p className="text-gray-500 text-xs">Hoy, 12:15</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <RefreshCw className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-gray-800 text-sm font-medium">Servicio reiniciado</p>
                      <p className="text-gray-500 text-xs">Ayer, 18:20</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Logs Tab */}
          <TabsContent value="logs">
            <Logger logs={logs} />
          </TabsContent>

          {/* Configuration Tab */}
          <TabsContent value="config">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-gray-700 font-medium text-base mb-4">
                Configuración del Servicio
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">ID del Servicio</p>
                    <p className="text-gray-800 font-medium">{serviceData.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Nombre</p>
                    <p className="text-gray-800 font-medium">{serviceData.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Tipo</p>
                    <p className="text-gray-800 font-medium">{serviceData.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Creado</p>
                    <p className="text-gray-800 font-medium">{serviceData.created}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">URL</p>
                    <p className="text-gray-800 font-medium">{serviceData.url}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Puerto</p>
                    <p className="text-gray-800 font-medium">{serviceData.port}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Versión</p>
                    <p className="text-gray-800 font-medium">{serviceData.version}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Entorno</p>
                    <p className="text-gray-800 font-medium">{serviceData.environment}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-gray-700 font-medium mb-4">Variables de Entorno</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm">NODE_ENV</span>
                      <span className="text-gray-800 text-sm font-medium">production</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm">PORT</span>
                      <span className="text-gray-800 text-sm font-medium">3000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm">DATABASE_URL</span>
                      <span className="text-gray-800 text-sm font-medium">******</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm">API_KEY</span>
                      <span className="text-gray-800 text-sm font-medium">******</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
