"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Users, Brain, CheckCircle, Star } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">AQ Test</h1>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-8">
                <a href="#tests" className="text-gray-700 hover:text-blue-600">Tests</a>
                <a href="#about" className="text-gray-700 hover:text-blue-600">Acerca de</a>
                <a href="#examples" className="text-gray-700 hover:text-blue-600">Ejemplos</a>
              </nav>
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Descubre tu perfil de autismo con los tests AQ
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Tests científicamente validados para evaluar rasgos autistas. AQ-10 y AQ-50 desarrollados por el Cambridge Autism Research Centre.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/test/aq10">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                Comenzar AQ-10 Gratis
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/test/aq50">
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                Ver AQ-50 Completo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="tests" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Nuestros Tests</h3>
            <p className="text-lg text-gray-600">Elige el test que mejor se adapte a tus necesidades</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* AQ-10 Card */}
            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">AQ-10</CardTitle>
                  <Badge variant="secondary">Gratis</Badge>
                </div>
                <CardDescription className="text-base">
                  Versión corta de 10 preguntas para evaluación rápida
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>10 preguntas tipo Likert</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>5-10 minutos de duración</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Resultados inmediatos</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>≥6 respuestas sugieren evaluación profesional</span>
                  </li>
                </ul>
                <Link href="/test/aq10">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Comenzar Test AQ-10
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* AQ-50 Card */}
            <Card className="border-2 border-purple-200 hover:border-purple-400 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">AQ-50</CardTitle>
                  <Badge variant="secondary">$2 USD</Badge>
                </div>
                <CardDescription className="text-base">
                  Versión completa de 50 preguntas para evaluación detallada
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>50 preguntas tipo Likert</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>20-30 minutos de duración</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Análisis detallado</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>≥32 puntos sugieren rasgos autistas</span>
                  </li>
                </ul>
                <Link href="/test/aq50">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Comenzar Test AQ-50
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Personajes Exitosos con Autismo</h3>
            <p className="text-lg text-gray-600">El autismo no es un límite, es una forma diferente de ver el mundo</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Elon Musk */}
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <Star className="h-12 w-12 text-gray-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Elon Musk</h4>
                <p className="text-gray-600 mb-4">CEO de Tesla y SpaceX</p>
                <p className="text-sm text-gray-500">
                  "Creo que la mayoría de la gente probablemente tiene un poco de autismo. 
                  Me diagnosticaron con Asperger."
                </p>
              </CardContent>
            </Card>

            {/* Anthony Hopkins */}
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <Star className="h-12 w-12 text-gray-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Anthony Hopkins</h4>
                <p className="text-gray-600 mb-4">Actor ganador del Oscar</p>
                <p className="text-sm text-gray-500">
                  "Fui diagnosticado con Asperger, pero no lo veo como una discapacidad. 
                  Es una ventaja."
                </p>
              </CardContent>
            </Card>

            {/* Dan Aykroyd */}
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <Star className="h-12 w-12 text-gray-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Dan Aykroyd</h4>
                <p className="text-gray-600 mb-4">Actor y comediante</p>
                <p className="text-sm text-gray-500">
                  "Fui diagnosticado con síndrome de Asperger. 
                  Me obsesiono con cosas y eso me hace bueno en lo que hago."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Acerca de los Tests AQ</h3>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div>
              <h4 className="text-xl font-semibold mb-4 text-blue-600">¿Qué es el AQ?</h4>
              <p className="text-gray-600 mb-4">
                El Autism Spectrum Quotient (AQ) es un cuestionario desarrollado por el 
                Cambridge Autism Research Centre para evaluar rasgos autistas en adultos.
              </p>
              <p className="text-gray-600">
                No es un diagnóstico médico, pero puede indicar si una evaluación 
                profesional podría ser beneficiosa.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4 text-purple-600">¿Cómo funciona?</h4>
              <p className="text-gray-600 mb-4">
                Responde preguntas sobre tus preferencias y comportamientos utilizando 
                una escala de Likert de 4 puntos.
              </p>
              <p className="text-gray-600">
                Tus respuestas se analizan y recibes una puntuación con interpretación 
                basada en investigación científica.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">¿Listo para descubrir tu perfil?</h3>
          <p className="text-xl text-blue-100 mb-8">
            Comienza con el test AQ-10 gratuito o salta directamente al análisis completo con AQ-50
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/test/aq10">
              <Button size="lg" variant="secondary" className="px-8 py-3 text-lg">
                Comenzar AQ-10 Gratis
              </Button>
            </Link>
            <Link href="/test/aq50">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg">
                Ver AQ-50 Completo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Brain className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-semibold">AQ Test</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">
                © 2024 AQ Test. Todos los derechos reservados.
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Los tests no reemplazan diagnóstico médico profesional.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}