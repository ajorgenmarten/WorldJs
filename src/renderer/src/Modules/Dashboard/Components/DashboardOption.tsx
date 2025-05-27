import { Link } from 'react-router'
import { DashboardItem } from '../Pages/Dashboard'

export default function DashboardOption({ item }: DashboardOptionProps) {
  return (
    <Link
      className={`${item.bgColor} rounded-2xl p-8 cursor-pointer hover:scale-105 transition-transform duration-200 min-h-[200px] flex flex-col justify-center items-start`}
      to={item.href}
    >
      <div className={`${item.iconColor} mb-4`}>
        <item.icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-medium text-gray-800 mb-2">{item.title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
    </Link>
  )
}

interface DashboardOptionProps {
  item: DashboardItem
}
