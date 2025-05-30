import { Button } from '@renderer/Common/Components/ui/button'
import { Input } from '@renderer/Common/Components/ui/input'
import { Label } from '@renderer/Common/Components/ui/label'
import { EnvVar } from '@renderer/Common/Types/types.defs'
import { Plus, Trash, Upload } from 'lucide-react'

export default function EnvVars(props: EnvVarsProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <Label className="text-gray-700 font-medium text-base">Variables de Entorno</Label>
          <p className="text-gray-600 text-sm mt-1">
            Configura las variables de entorno para tu aplicación
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={props.handleLoadEnv}
            className="border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            <Upload className="w-4 h-4 mr-2" />
            Cargar .env
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={props.handleAddVar}
            className="border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {props.envVars?.map((envVar, index) => (
          <div key={`Create-Static-Service-EnvVar-${index}`} className="flex gap-3 items-center">
            <Input
              placeholder="VARIABLE_NAME"
              value={envVar.key}
              onChange={(e) => props.handleUpdateVar?.(index, 'key', e.target.value)}
              className="border-gray-200 focus:border-blue-400 focus:ring-blue-400"
              required
            />
            <Input
              placeholder="valor"
              value={envVar.value}
              onChange={(e) => props.handleUpdateVar?.(index, 'value', e.target.value)}
              className="border-gray-200 focus:border-blue-400 focus:ring-blue-400"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => props.handleRemoveVar?.(index)}
              className="text-gray-400 hover:text-red-500 px-2"
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </>
  )
}

interface EnvVarsProps {
  envVars?: EnvVar[]
  handleAddVar?: () => void
  handleRemoveVar?: (index: number) => void
  handleUpdateVar?: (index: number, field: 'key' | 'value', value: string) => void
  handleLoadEnv?: () => void | Promise<void>
}
