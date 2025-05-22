import { ROUTES } from '@renderer/Router/Routes'
import { Globe, LayoutGrid, Server, Settings } from 'lucide-react'
import { Link } from 'react-router'

type Option = {
  title: string
  icon: JSX.Element
  description: string
  href: string
  color: string
  iconBg: string
  hoverColor: string
}

const options: Option[] = [
  {
    title: 'Sitio Estático',
    icon: <Globe className="h-6 w-6" strokeWidth={1.5} />,
    description: 'Crear y configurar un nuevo sitio web estático',
    href: ROUTES.ADD_STATIC,
    color: 'from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20',
    iconBg: 'bg-blue-100 dark:bg-blue-900/20',
    hoverColor:
      'group-hover:from-blue-100 group-hover:to-indigo-100 dark:group-hover:from-blue-950/30 dark:group-hover:to-indigo-950/30'
  },
  {
    title: 'Servicio',
    icon: <Server className="h-6 w-6" strokeWidth={1.5} />,
    description: 'Añadir un nuevo servicio a tu infraestructura',
    href: ROUTES.ADD_SERVICE,
    color: 'from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/20',
    hoverColor:
      'group-hover:from-emerald-100 group-hover:to-teal-100 dark:group-hover:from-emerald-950/30 dark:group-hover:to-teal-950/30'
  },
  {
    title: 'Ver Todos',
    icon: <LayoutGrid className="h-6 w-6" strokeWidth={1.5} />,
    description: 'Visualiza todos tus sitios y servicios',
    href: '/todos',
    color: 'from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20',
    iconBg: 'bg-amber-100 dark:bg-amber-900/20',
    hoverColor:
      'group-hover:from-amber-100 group-hover:to-yellow-100 dark:group-hover:from-amber-950/30 dark:group-hover:to-yellow-950/30'
  },
  {
    title: 'Ajustes',
    icon: <Settings className="h-6 w-6" strokeWidth={1.5} />,
    description: 'Configura las preferencias de tu aplicación',
    href: '/ajustes',
    color: 'from-purple-50 to-fuchsia-50 dark:from-purple-950/20 dark:to-fuchsia-950/20',
    iconBg: 'bg-purple-100 dark:bg-purple-900/20',
    hoverColor:
      'group-hover:from-purple-100 group-hover:to-fuchsia-100 dark:group-hover:from-purple-950/30 dark:group-hover:to-fuchsia-950/30'
  }
]

export function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-[#0f0f0f] dark:to-[#050505]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-3xl font-extralight tracking-tight text-gray-900 dark:text-white">
            Workspace
          </h1>
        </header>

        <main>
          <div className="grid gap-8 md:grid-cols-2">
            {options.map((item, index) => (
              <Link
                key={'Dashboard-Item-' + index}
                to={item.href}
                className={`group flex h-full flex-col rounded-xl bg-gradient-to-br ${item.color} ${item.hoverColor} p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:shadow-gray-950/10`}
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${item.iconBg} text-gray-700 dark:text-gray-200`}
                >
                  {item.icon}
                </div>
                <h2 className="mb-2 text-xl font-medium text-gray-900 dark:text-white">
                  {item.title}
                </h2>
                <p className="mt-auto text-sm text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </main>

        <footer className="mt-16 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} • Diseñado con simplicidad</p>
        </footer>
      </div>
    </div>
  )
}
