import { ArrowLeft, MessageSquare, Database, Zap, Code } from 'lucide-react'
import { Button } from '@renderer/Common/Components/ui/button'

export default function SelectServiceType() {
  const serviceTypes = [
    {
      title: 'NATS',
      description: 'Sistema de mensajería distribuida para microservicios',
      icon: MessageSquare,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      action: () => console.log('Crear servicio NATS')
    },
    {
      title: 'PostgreSQL',
      description: 'Base de datos relacional avanzada y confiable',
      icon: Database,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      action: () => console.log('Crear servicio PostgreSQL')
    },
    {
      title: 'Redis',
      description: 'Base de datos en memoria para cache y almacenamiento rápido',
      icon: Zap,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      action: () => console.log('Crear servicio Redis')
    },
    {
      title: 'Node.js',
      description: 'Runtime de JavaScript para aplicaciones del lado del servidor',
      icon: Code,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      action: () => console.log('Crear servicio Node.js')
    }
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="pt-8 pb-12">
        <div className="max-w-4xl mx-auto px-8">
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
          <h1 className="text-center text-2xl font-normal text-gray-700">
            Crear Servicio Dinámico
          </h1>
          <p className="text-center text-gray-600 text-sm mt-2">
            Selecciona el tipo de servicio que deseas crear
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-4xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {serviceTypes.map((service, index) => (
            <div
              key={index}
              className={`${service.bgColor} rounded-2xl p-8 cursor-pointer hover:scale-105 transition-transform duration-200 min-h-[200px] flex flex-col justify-center items-start`}
              onClick={service.action}
            >
              <div className={`${service.iconColor} mb-4`}>
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 pb-8">
        © 2025 • Diseñado con simplicidad
      </div>
    </div>
  )
}
