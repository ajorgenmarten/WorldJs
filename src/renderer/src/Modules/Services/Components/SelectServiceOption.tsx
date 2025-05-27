import { Link } from 'react-router'

export default function SelectServiceOption({ service }: SelectServiceOptionProps) {
  return (
    <Link
      to={service.href}
      className={`${service.bgColor} rounded-2xl p-8 cursor-pointer hover:scale-105 transition-transform duration-200 min-h-[200px] flex flex-col justify-center items-start`}
    >
      <div className={`${service.iconColor} mb-4`}>
        <service.icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-medium text-gray-800 mb-2">{service.title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
    </Link>
  )
}

interface SelectServiceOptionProps {
  service: {
    title: string
    description: string
    icon: React.ComponentType<{ className?: string }>
    bgColor: string
    iconColor: string
    href: string
  }
}
