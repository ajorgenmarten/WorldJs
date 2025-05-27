import { Button } from '@renderer/Common/Components/ui/button'
import { Input } from '@renderer/Common/Components/ui/input'
import { Label } from '@renderer/Common/Components/ui/label'
import { FolderOpen } from 'lucide-react'

export default function SelectFolder({ handleSelectFolder, ...props }: SelectFolderProps) {
  return (
    <div className="space-y-2 md:col-span-2">
      <Label htmlFor="folderPath" className="text-gray-700 font-medium">
        Ruta de la Carpeta del Proyecto
      </Label>
      <div className="flex gap-2">
        <Input
          {...props}
          className="border-gray-200 focus:border-blue-400 focus:ring-blue-400 flex-1"
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleSelectFolder}
          className="border-gray-200 text-gray-600 hover:bg-gray-50 px-4"
        >
          <FolderOpen className="w-4 h-4 mr-2" />
          Explorar
        </Button>
      </div>
      <p className="text-xs text-gray-500">Selecciona la carpeta que contiene tu proyecto</p>
    </div>
  )
}

interface SelectFolderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  handleSelectFolder: () => void
}
