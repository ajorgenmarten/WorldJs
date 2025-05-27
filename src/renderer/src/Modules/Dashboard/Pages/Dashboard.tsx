import { Globe, Server, Grid3X3, Settings, LucideProps } from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'
import DashboardOption from '../Components/DashboardOption'
import { ROUTES } from '@renderer/Router/Routes'
import Footer from '@renderer/Common/Components/Footer'

export type DashboardItem = {
  title: string
  description: string
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
  bgColor: string
  iconColor: string
  href: string
}

const DashboardItems: DashboardItem[] = [
  {
    title: 'Sitio Estático',
    description: 'Crear y configurar un nuevo sitio web estático',
    icon: Globe,
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    href: ROUTES.NEW_STATIC
  },
  {
    title: 'Servicio',
    description: 'Añadir un nuevo servicio a tu infraestructura',
    icon: Server,
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
    href: ROUTES.NEW_SERVICE
  },
  {
    title: 'Ver Todos',
    description: 'Visualiza todos tus sitios y servicios',
    icon: Grid3X3,
    bgColor: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
    href: ROUTES.ALL_SERVICES
  },
  {
    title: 'Ajustes',
    description: 'Configura las preferencias de tu aplicación',
    icon: Settings,
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    href: ROUTES.SETTINGS
  }
]

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="pt-16 pb-12">
        <h1 className="text-center text-2xl font-normal text-gray-700">Workspace</h1>
      </div>

      {/* Main Grid */}
      <div className="max-w-4xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {DashboardItems.map((item, index) => (
            <DashboardOption key={`Dashboard-Options-${index}`} item={item} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
