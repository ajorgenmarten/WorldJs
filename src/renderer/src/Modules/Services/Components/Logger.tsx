import { Button } from '@renderer/Common/Components/ui/button'
import { Download } from 'lucide-react'

export default function Logger({ logs }: LoggerProps) {
  const getLogLevelStyle = (level: string) => {
    switch (level) {
      case 'info':
        return 'text-blue-400'
      case 'warn':
        return 'text-yellow-400'
      case 'error':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }
  // Función para extraer el nivel de log de un string
  const extractLogLevel = (logString: string): string => {
    const match = logString.match(/\[(INFO|WARN|ERROR)\]/)
    return match ? match[1].toLowerCase() : 'info'
  }

  // Función para extraer el timestamp de un string
  const extractTimestamp = (logString: string): string => {
    const match = logString.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})/)
    if (match) {
      const date = new Date(match[1])
      return date.toLocaleTimeString()
    }
    return new Date().toLocaleTimeString()
  }

  // Función para extraer el mensaje sin timestamp y nivel
  const extractMessage = (logString: string): string => {
    return logString.replace(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\s+\[(INFO|WARN|ERROR)\]\s+/, '')
  }
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-700 font-medium text-base">Logs del Servicio</h3>
        <Button
          variant="outline"
          size="sm"
          className="border-gray-200 text-gray-600 hover:bg-gray-50"
        >
          <Download className="w-4 h-4 mr-2" />
          Descargar
        </Button>
      </div>

      {/* Console */}
      <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm h-96 overflow-y-auto">
        {logs.map((logString, index) => {
          const level = extractLogLevel(logString)
          const timeString = extractTimestamp(logString)
          const message = extractMessage(logString)

          return (
            <div key={index} className="mb-1 flex">
              <span className="text-gray-500 mr-2">[{timeString}]</span>
              <span className={`mr-2 ${getLogLevelStyle(level)}`}>[{level.toUpperCase()}]</span>
              <span className="text-gray-200">{message}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface LoggerProps {
  logs: string[]
}
