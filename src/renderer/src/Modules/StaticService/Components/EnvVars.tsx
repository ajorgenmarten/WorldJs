import { Plus, Trash2 } from 'lucide-react'
import { EnvVar } from '../types'

export default function EnvVars(props: EvnVarsProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Variables de entorno
        </label>
        <button
          type="button"
          onClick={props.onAddVar}
          className="inline-flex items-center rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
        >
          <Plus className="mr-1 h-3.5 w-3.5" />
          Añadir
        </button>
      </div>
      <div className="space-y-3">
        {props.envs.map((variable, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={variable.key}
              onChange={(e) => props.onUpdateVar?.(index, 'key', e.target.value)}
              className="w-2/5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/50"
              placeholder="CLAVE"
              required
            />
            <input
              type="text"
              value={variable.value}
              onChange={(e) => props.onUpdateVar?.(index, 'value', e.target.value)}
              className="w-3/5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/50"
              placeholder="valor"
              required
            />
            <button
              type="button"
              onClick={() => props.onRemoveVar?.(index, variable.key, variable.value)}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              aria-label="Eliminar variable"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

interface EvnVarsProps {
  envs: EnvVar[]
  onAddVar?: () => void
  onUpdateVar?: (index: number, field: 'key' | 'value', value: string) => void
  onRemoveVar?: (index: number, key: string, value: string) => void
}
