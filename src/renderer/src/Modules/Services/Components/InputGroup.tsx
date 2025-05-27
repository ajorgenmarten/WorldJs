import { Input } from '@renderer/Common/Components/ui/input'
import { Label } from '@renderer/Common/Components/ui/label'
import { cn } from '@renderer/Common/Lib/utils'

export default function InputGroup({ label, className, ...props }: InputGroupProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label htmlFor="name" className="text-gray-700 font-medium">
        {label}
      </Label>
      <Input {...props} className="border-gray-200 focus:border-blue-400 focus:ring-blue-400" />
    </div>
  )
}

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}
