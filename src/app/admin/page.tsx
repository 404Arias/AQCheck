"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Settings, 
  Users, 
  DollarSign, 
  Download, 
  BarChart3, 
  Eye, 
  EyeOff,
  Save,
  RefreshCw
} from "lucide-react"

interface Payment {
  id: string
  amount: number
  currency: string
  status: string
  createdAt: string
  testType: string
}

interface TestStat {
  type: string
  completed: number
  paid: number
}

interface Config {
  paypalClientId: string
  paypalSecret: string
  googleAnalyticsId: string
  paymentsEnabled: boolean
  freeResultsEnabled: boolean
  headScripts: string
  bodyScripts: string
}

export default function AdminPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [testStats, setTestStats] = useState<TestStat[]>([])
  const [config, setConfig] = useState<Config>({
    paypalClientId: "",
    paypalSecret: "",
    googleAnalyticsId: "",
    paymentsEnabled: true,
    freeResultsEnabled: false
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setPayments([
        { id: "1", amount: 1, currency: "USD", status: "COMPLETED", createdAt: "2024-01-15", testType: "AQ-10" },
        { id: "2", amount: 2, currency: "USD", status: "COMPLETED", createdAt: "2024-01-15", testType: "AQ-50" },
        { id: "3", amount: 1, currency: "USD", status: "PENDING", createdAt: "2024-01-16", testType: "AQ-10" },
        { id: "4", amount: 2, currency: "USD", status: "COMPLETED", createdAt: "2024-01-16", testType: "AQ-50" },
        { id: "5", amount: 1, currency: "USD", status: "FAILED", createdAt: "2024-01-17", testType: "AQ-10" }
      ])

      setTestStats([
        { type: "AQ-10", completed: 150, paid: 120 },
        { type: "AQ-50", completed: 75, paid: 60 }
      ])

      setConfig({
        paypalClientId: "your_paypal_client_id",
        paypalSecret: "your_paypal_secret",
        googleAnalyticsId: "GA-XXXXXXXXX",
        paymentsEnabled: true,
        freeResultsEnabled: false,
        headScripts: "",
        bodyScripts: ""
      })

      setLoading(false)
    }, 1000)
  }, [])

  const handleSaveConfig = async () => {
    setSaving(true)
    try {
      // Save each config value separately
      const configs = [
        { key: 'paypalClientId', value: config.paypalClientId },
        { key: 'paypalSecret', value: config.paypalSecret },
        { key: 'googleAnalyticsId', value: config.googleAnalyticsId },
        { key: 'paymentsEnabled', value: config.paymentsEnabled.toString() },
        { key: 'freeResultsEnabled', value: config.freeResultsEnabled.toString() },
        { key: 'headScripts', value: config.headScripts },
        { key: 'bodyScripts', value: config.bodyScripts }
      ]

      for (const { key, value } of configs) {
        await fetch('/api/config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key, value })
        })
      }

      alert("Configuración guardada exitosamente")
    } catch (error) {
      console.error('Error saving config:', error)
      alert("Error al guardar la configuración")
    } finally {
      setSaving(false)
    }
  }

  const handleExportData = (format: 'csv' | 'excel') => {
    // Simulate data export
    alert(`Exportando datos en formato ${format.toUpperCase()}`)
  }

  const totalRevenue = payments
    .filter(p => p.status === "COMPLETED")
    .reduce((sum, p) => sum + p.amount, 0)

  const totalTests = testStats.reduce((sum, stat) => sum + stat.completed, 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Cargando datos del panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Settings className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
                <p className="text-sm text-gray-600">Gestiona tu aplicación de tests AQ</p>
              </div>
            </div>
            <Button onClick={() => window.location.href = "/"}>
              Volver al Sitio
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTests}</div>
              <p className="text-xs text-muted-foreground">
                Tests completados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue}</div>
              <p className="text-xs text-muted-foreground">
                Total ingresos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AQ-10</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{testStats[0]?.completed || 0}</div>
              <p className="text-xs text-muted-foreground">
                Completados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AQ-50</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{testStats[1]?.completed || 0}</div>
              <p className="text-xs text-muted-foreground">
                Completados
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="config" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="config">Configuración</TabsTrigger>
            <TabsTrigger value="payments">Pagos</TabsTrigger>
            <TabsTrigger value="stats">Estadísticas</TabsTrigger>
            <TabsTrigger value="export">Exportar</TabsTrigger>
          </TabsList>

          {/* Configuration Tab */}
          <TabsContent value="config">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de la Aplicación</CardTitle>
                <CardDescription>
                  Gestiona las claves de API y configuraciones de la aplicación
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* PayPal Configuration */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">PayPal</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="paypalClientId">Client ID</Label>
                      <Input
                        id="paypalClientId"
                        value={config.paypalClientId}
                        onChange={(e) => setConfig(prev => ({ ...prev, paypalClientId: e.target.value }))}
                        placeholder="PayPal Client ID"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paypalSecret">Secret</Label>
                      <Input
                        id="paypalSecret"
                        type="password"
                        value={config.paypalSecret}
                        onChange={(e) => setConfig(prev => ({ ...prev, paypalSecret: e.target.value }))}
                        placeholder="PayPal Secret"
                      />
                    </div>
                  </div>
                </div>

                {/* Google Analytics Configuration */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Google Analytics</h3>
                  <div className="space-y-2">
                    <Label htmlFor="googleAnalyticsId">Analytics ID</Label>
                    <Input
                      id="googleAnalyticsId"
                      value={config.googleAnalyticsId}
                      onChange={(e) => setConfig(prev => ({ ...prev, googleAnalyticsId: e.target.value }))}
                      placeholder="GA-XXXXXXXXX"
                    />
                  </div>
                </div>

                {/* App Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Configuración de la App</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Habilitar Pagos</Label>
                        <p className="text-sm text-muted-foreground">
                          Permite a los usuarios pagar para ver resultados
                        </p>
                      </div>
                      <Switch
                        checked={config.paymentsEnabled}
                        onCheckedChange={(checked) => setConfig(prev => ({ ...prev, paymentsEnabled: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Resultados Gratuitos</Label>
                        <p className="text-sm text-muted-foreground">
                          Permite ver resultados sin pagar (modo desarrollo)
                        </p>
                      </div>
                      <Switch
                        checked={config.freeResultsEnabled}
                        onCheckedChange={(checked) => setConfig(prev => ({ ...prev, freeResultsEnabled: checked }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Custom Scripts */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Scripts Personalizados</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="headScripts">Scripts en Head (&lt;head&gt;)</Label>
                      <p className="text-xs text-muted-foreground mb-2">
                        Scripts que se ejecutan en el head del documento (Meta Pixel, Google Tag Manager, etc.)
                      </p>
                      <textarea
                        id="headScripts"
                        value={config.headScripts}
                        onChange={(e) => setConfig(prev => ({ ...prev, headScripts: e.target.value }))}
                        placeholder="<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'TU_PIXEL_ID');
fbq('track', 'PageView');
</script>"
                        className="w-full h-32 p-3 border border-gray-300 rounded-md text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bodyScripts">Scripts en Body (final &lt;body&gt;)</Label>
                      <p className="text-xs text-muted-foreground mb-2">
                        Scripts que se ejecutan al final del body (Google Analytics, Google Ads, etc.)
                      </p>
                      <textarea
                        id="bodyScripts"
                        value={config.bodyScripts}
                        onChange={(e) => setConfig(prev => ({ ...prev, bodyScripts: e.target.value }))}
                        placeholder="<!-- Google Analytics -->
<script async src='https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID'></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>"
                        className="w-full h-32 p-3 border border-gray-300 rounded-md text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <h4 className="font-semibold text-sm text-blue-900 mb-1">Ejemplos de Scripts Soportados:</h4>
                      <ul className="text-xs text-blue-800 space-y-1">
                        <li>• Meta Pixel (Facebook)</li>
                        <li>• Google Analytics 4</li>
                        <li>• Google Ads Conversion</li>
                        <li>• Google Tag Manager</li>
                        <li>• Hotjar</li>
                        <li>• Cualquier script de terceros</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button onClick={handleSaveConfig} disabled={saving} className="w-full">
                  {saving ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Guardando...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Guardar Configuración
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Pagos</CardTitle>
                <CardDescription>
                  Visualiza todos los pagos realizados en la aplicación
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Test</TableHead>
                      <TableHead>Monto</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Fecha</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-mono text-sm">{payment.id}</TableCell>
                        <TableCell>{payment.testType}</TableCell>
                        <TableCell>${payment.amount} {payment.currency}</TableCell>
                        <TableCell>
                          <Badge variant={
                            payment.status === "COMPLETED" ? "default" :
                            payment.status === "PENDING" ? "secondary" : "destructive"
                          }>
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{payment.createdAt}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas de Tests</CardTitle>
                  <CardDescription>
                    Resumen de tests completados y pagados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {testStats.map((stat) => (
                      <div key={stat.type} className="flex justify-between items-center p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{stat.type}</h4>
                          <p className="text-sm text-muted-foreground">
                            {stat.completed} completados
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{stat.paid}</div>
                          <div className="text-sm text-muted-foreground">pagados</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Google Analytics</CardTitle>
                  <CardDescription>
                    Integración con Google Analytics para seguimiento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Estado de la Integración</h4>
                      <div className="flex items-center space-x-2">
                        {config.googleAnalyticsId ? (
                          <>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-green-700">Conectado</span>
                          </>
                        ) : (
                          <>
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-red-700">No configurado</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">ID de Analytics</h4>
                      <p className="text-sm text-muted-foreground font-mono">
                        {config.googleAnalyticsId || "No configurado"}
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Métricas Disponibles</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Visitas a la página principal</li>
                        <li>• Inicios de test AQ-10</li>
                        <li>• Inicios de test AQ-50</li>
                        <li>• Tasa de conversión de pagos</li>
                        <li>• Tiempo promedio en el sitio</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Export Tab */}
          <TabsContent value="export">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Exportar Datos</CardTitle>
                  <CardDescription>
                    Descarga los datos de la aplicación en diferentes formatos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Exportar Tests Completados</h4>
                    <p className="text-sm text-muted-foreground">
                      Incluye respuestas, puntuaciones y fechas
                    </p>
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => handleExportData('csv')}
                        variant="outline"
                        className="flex-1"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Exportar CSV
                      </Button>
                      <Button 
                        onClick={() => handleExportData('excel')}
                        variant="outline"
                        className="flex-1"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Exportar Excel
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Exportar Pagos</h4>
                    <p className="text-sm text-muted-foreground">
                      Historial completo de transacciones
                    </p>
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => handleExportData('csv')}
                        variant="outline"
                        className="flex-1"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Exportar CSV
                      </Button>
                      <Button 
                        onClick={() => handleExportData('excel')}
                        variant="outline"
                        className="flex-1"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Exportar Excel
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Exportar Estadísticas</h4>
                    <p className="text-sm text-muted-foreground">
                      Resumen de métricas y análisis
                    </p>
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => handleExportData('csv')}
                        variant="outline"
                        className="flex-1"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Exportar CSV
                      </Button>
                      <Button 
                        onClick={() => handleExportData('excel')}
                        variant="outline"
                        className="flex-1"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Exportar Excel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Información de Exportación</CardTitle>
                  <CardDescription>
                    Detalles sobre los datos exportados
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-semibold text-sm mb-1">Tests Completados</h5>
                      <p className="text-xs text-muted-foreground">
                        Incluye: ID del test, tipo, respuestas, puntuación, fecha, usuario
                      </p>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <h5 className="font-semibold text-sm mb-1">Pagos</h5>
                      <p className="text-xs text-muted-foreground">
                        Incluye: ID de pago, monto, estado, fecha, método, test asociado
                      </p>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <h5 className="font-semibold text-sm mb-1">Estadísticas</h5>
                      <p className="text-xs text-muted-foreground">
                        Incluye: totales, promedios, gráficos, tendencias temporales
                      </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <h5 className="font-semibold text-sm text-blue-900 mb-1">Nota</h5>
                      <p className="text-xs text-blue-800">
                        Los datos se exportan de forma anónima, protegiendo la privacidad de los usuarios.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}