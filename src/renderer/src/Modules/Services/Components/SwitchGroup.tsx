import { SwitchProps } from '@radix-ui/react-switch'
import { Label } from '@renderer/Common/Components/ui/label'
import { Switch } from '@renderer/Common/Components/ui/switch'

export default function SwitchGroup({
  label,
  checked,
  checkedInfo,
  unCheckedInfo,
  ...props
}: SwitchGroupProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="exposed" className="text-gray-700 font-medium">
        {label}
      </Label>
      <div className="flex items-center space-x-3">
        <Switch {...props} checked={checked} />
        <span className="text-sm text-gray-600">{checked ? checkedInfo : unCheckedInfo}</span>
      </div>
    </div>
  )
}

interface SwitchGroupProps extends SwitchProps {
  label: string
  checkedInfo?: string
  unCheckedInfo?: string
}
