import { Button } from '@renderer/Common/Components/ui/button'
import { cn } from '@renderer/Common/Lib/utils'

export default function Form({ children, className, ...props }: FormProps) {
  return (
    <div className={cn('max-w-4xl mx-auto px-8 pb-16', className)}>
      <form {...props} className="bg-white rounded-2xl p-8 shadow-sm">
        {children}
        <Actions />
      </form>
    </div>
  )
}

function Actions() {
  return (
    <div className="flex justify-end gap-4 mt-8 pt-8 border-t border-gray-200">
      <Button
        variant="outline"
        onClick={() => window.history.back()}
        className="border-gray-200 text-gray-600 hover:bg-gray-50"
      >
        Cancelar
      </Button>
      <Button className="bg-blue-500 hover:bg-blue-600 text-white">Crear</Button>
    </div>
  )
}

interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode
}
