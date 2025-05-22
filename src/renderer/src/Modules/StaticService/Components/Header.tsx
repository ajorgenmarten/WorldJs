import { ROUTES } from '@renderer/Router/Routes'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'

export default function Header() {
  return (
    <header className="mb-8">
      <Link
        to={ROUTES.DASHBOARD}
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
  )
}
