import { Button } from '@renderer/Common/Components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function Header({ title, subtitle }: HeaderProps): JSX.Element {
  return (
    <div className="pt-8 pb-8">
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
        <h1 className="text-2xl font-normal text-gray-700">{title}</h1>
        {subtitle && <p className="text-gray-600 text-sm mt-2">{subtitle}</p>}
      </div>
    </div>
  )
}

interface HeaderProps {
  title: string
  subtitle?: string
}
