import { useState } from 'react'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { Button } from '@renderer/Common/Components/ui/button'
import { Input } from '@renderer/Common/Components/ui/input'
import { Label } from '@renderer/Common/Components/ui/label'
import { Switch } from '@renderer/Common/Components/ui/switch'

export default function CreatePostgresService() {
  const [formData, setFormData] = useState({
    name: '',
    port: '5432',
    user: '',
    password: '',
    database: '',
    exposed: false
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    console.log('PostgreSQL Service Data:', formData)
    // Aquí iría la lógica para crear el servicio PostgreSQL
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="pt-8 pb-8">
        <div className="max-w-4xl mx-auto px-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-800"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </div>
          <h1 className="text-2xl font-normal text-gray-700">Crear Servicio PostgreSQL</h1>
          <p className="text-gray-600 text-sm mt-2">Configura tu nueva base de datos PostgreSQL</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-8 pb-16">
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Nombre del Servicio
              </Label>
              <Input
                id="name"
                placeholder="mi-postgres-db"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="border-gray-200 focus:border-green-400 focus:ring-green-400"
              />
            </div>

            {/* Port */}
            <div className="space-y-2">
              <Label htmlFor="port" className="text-gray-700 font-medium">
                Puerto
              </Label>
              <Input
                id="port"
                placeholder="5432"
                value={formData.port}
                onChange={(e) => handleInputChange('port', e.target.value)}
                className="border-gray-200 focus:border-green-400 focus:ring-green-400"
              />
              <p className="text-xs text-gray-500">Puerto por defecto: 5432</p>
            </div>

            {/* User */}
            <div className="space-y-2">
              <Label htmlFor="user" className="text-gray-700 font-medium">
                Usuario de la Base de Datos
              </Label>
              <Input
                id="user"
                placeholder="postgres"
                value={formData.user}
                onChange={(e) => handleInputChange('user', e.target.value)}
                className="border-gray-200 focus:border-green-400 focus:ring-green-400"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="border-gray-200 focus:border-green-400 focus:ring-green-400 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Usa una contraseña segura para proteger tu base de datos
              </p>
            </div>

            {/* Database */}
            <div className="space-y-2">
              <Label htmlFor="database" className="text-gray-700 font-medium">
                Nombre de la Base de Datos
              </Label>
              <Input
                id="database"
                placeholder="mi_aplicacion"
                value={formData.database}
                onChange={(e) => handleInputChange('database', e.target.value)}
                className="border-gray-200 focus:border-green-400 focus:ring-green-400"
              />
              <p className="text-xs text-gray-500">Base de datos que se creará automáticamente</p>
            </div>

            {/* Exposed */}
            <div className="space-y-2">
              <Label htmlFor="exposed" className="text-gray-700 font-medium">
                Acceso Externo
              </Label>
              <div className="flex items-center space-x-3">
                <Switch
                  id="exposed"
                  checked={formData.exposed}
                  onCheckedChange={(checked) => handleInputChange('exposed', checked)}
                />
                <span className="text-sm text-gray-600">
                  {formData.exposed
                    ? 'Accesible desde internet (usar con precaución)'
                    : 'Solo acceso interno (recomendado)'}
                </span>
              </div>
              {formData.exposed && (
                <p className="text-xs text-yellow-600 bg-yellow-50 p-2 rounded">
                  ⚠️ Exponer PostgreSQL públicamente puede ser un riesgo de seguridad
                </p>
              )}
            </div>
          </div>

          {/* Database Configuration Info */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-gray-700 font-medium text-base mb-3">
                Información de Configuración
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Versión:</span>
                  <span className="ml-2 text-gray-800">PostgreSQL 15</span>
                </div>
                <div>
                  <span className="text-gray-600">Almacenamiento:</span>
                  <span className="ml-2 text-gray-800">10GB inicial</span>
                </div>
                <div>
                  <span className="text-gray-600">Backup automático:</span>
                  <span className="ml-2 text-gray-800">Diario</span>
                </div>
                <div>
                  <span className="text-gray-600">Conexiones máximas:</span>
                  <span className="ml-2 text-gray-800">100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Connection String Preview */}
          {formData.name && formData.user && formData.database && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Label className="text-gray-700 font-medium text-base">Cadena de Conexión</Label>
              <p className="text-gray-600 text-sm mt-1 mb-3">
                Usa esta cadena para conectarte a tu base de datos
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <code className="text-sm text-gray-800 break-all">
                  {`postgresql://${formData.user}:${formData.password ? '[PASSWORD]' : '[PASSWORD]'}@${formData.name}:${formData.port}/${formData.database}`}
                </code>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-4 mt-8 pt-8 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Cancelar
            </Button>
            <Button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 text-white">
              Crear Base de Datos PostgreSQL
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 pb-8">
        © 2025 • Diseñado con simplicidad
      </div>
    </div>
  )
}
