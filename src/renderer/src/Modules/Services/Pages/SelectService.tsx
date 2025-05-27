import { MessageSquare, Database, Zap, Code } from 'lucide-react'
import { ROUTES } from '@renderer/Router/Routes'
import SelectServiceOption from '../Components/SelectServiceOption'
import Footer from '@renderer/Common/Components/Footer'
import Header from '../Components/Header'

export default function SelectService() {
  const serviceTypes = [
    {
      title: 'NATS',
      description: 'Sistema de mensajería distribuida para microservicios',
      icon: MessageSquare,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      href: ROUTES.NEW_NATS
    },
    {
      title: 'PostgreSQL',
      description: 'Base de datos relacional avanzada y confiable',
      icon: Database,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      href: ROUTES.NEW_POSTGRES
    },
    {
      title: 'Redis',
      description: 'Base de datos en memoria para cache y almacenamiento rápido',
      icon: Zap,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      href: ROUTES.NEW_REDIS
    },
    {
      title: 'Node.js',
      description: 'Runtime de JavaScript para aplicaciones del lado del servidor',
      icon: Code,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      href: ROUTES.NEW_NODEJS
    }
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        title="Crear Servicio Dinámico"
        subtitle="Selecciona el tipo de servicio que deseas crear"
      />

      {/* Main Grid */}
      <div className="max-w-4xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {serviceTypes.map((service, index) => (
            <SelectServiceOption key={`Select-service-${index}`} service={service} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
