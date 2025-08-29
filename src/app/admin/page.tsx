"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [showLogin, setShowLogin] = useState(true)
  const router = useRouter()

  const ADMIN_PASSWORD = "admin123" // In production, use environment variables

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setShowLogin(false)
      toast.success("Acceso autorizado")
    } else {
      toast.error("Contraseña incorrecta")
      setPassword("")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setShowLogin(true)
    setPassword("")
    router.push("/")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Dialog open={showLogin} onOpenChange={() => {}}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">Panel de Administración</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña de Administrador</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Ingresa la contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
              </div>
              <Button onClick={handleLogin} className="w-full">
                Ingresar
              </Button>
              <Button variant="outline" onClick={() => router.push("/")} className="w-full">
                Volver al Inicio
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Panel de Administración</h1>
            <p className="text-slate-600 mt-2">Gestiona la configuración y estadísticas del sistema</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Cerrar Sesión
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sistema Simplificado</CardTitle>
              <CardDescription>
                Panel de administración básico para monitoreo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <div className="text-2xl font-bold text-blue-600">AQ-10</div>
                    <div className="text-sm text-slate-600">Test rápido disponible</div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-2xl font-bold text-purple-600">AQ-50</div>
                    <div className="text-sm text-slate-600">Test completo disponible</div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-2xl font-bold text-green-600">Free</div>
                    <div className="text-sm text-slate-600">Descarga gratuita</div>
                  </Card>
                </div>
                
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-semibold text-green-800">Estado del Sistema</h3>
                  <p className="text-green-700 text-sm mt-1">
                    ✅ Tests funcionando correctamente<br/>
                    ✅ Descarga gratuita habilitada<br/>
                    ✅ No se requieren pagos
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}