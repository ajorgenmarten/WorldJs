import { ArrowLeft, Construction } from 'lucide-react'
import { Button } from '@renderer/Common/Components/ui/button'
import Footer from './Footer'

export default function PageNotFound() {
  const handleGoBack = () => {
    window.history.back()
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="text-center max-w-md">
          {/* Icon */}
          <div className="mb-8">
            <div className="mx-auto w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <Construction className="w-10 h-10 text-gray-500" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-normal text-gray-700 mb-4">Página en Construcción</h1>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-8 leading-relaxed">
            Esta funcionalidad está siendo desarrollada y estará disponible pronto.
          </p>

          {/* Back Button */}
          <Button
            onClick={handleGoBack}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ir Atrás
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
