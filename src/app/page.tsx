"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Users, Brain, CheckCircle, Star } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 bg-white/98 backdrop-blur-md shadow-xl border-b border-blue-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-4 group">
              <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-green-600 p-3 rounded-xl shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-105">
                <Brain className="h-9 w-9 text-white" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-green-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-green-600 bg-clip-text text-transparent">
                  AQ Test
                </h1>
                <p className="text-sm text-slate-600 font-medium">
                  Evaluación profesional del espectro autista
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              <a
                href="#tests"
                className="relative px-4 py-2 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 font-medium group"
              >
                <span className="relative z-10">Tests</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </a>
              <a
                href="#about"
                className="relative px-4 py-2 rounded-lg text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 font-medium group"
              >
                <span className="relative z-10">Acerca de</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </a>
              <a
                href="#examples"
                className="relative px-4 py-2 rounded-lg text-slate-700 hover:text-green-600 hover:bg-green-50 transition-all duration-300 font-medium group"
              >
                <span className="relative z-10">Ejemplos</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </a>
              
              {/* CTA Button */}
              <div className="ml-6 pl-6 border-l border-slate-200">
                <a
                  href="#tests"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
                >
                  Comenzar Test
                </a>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-blue-100/50 shadow-lg animate-slide-up">
            <div className="px-4 py-4 space-y-2">
              <a
                href="#tests"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 font-medium"
              >
                Tests
              </a>
              <a
                href="#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 font-medium"
              >
                Acerca de
              </a>
              <a
                href="#examples"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-slate-700 hover:text-green-600 hover:bg-green-50 transition-all duration-300 font-medium"
              >
                Ejemplos
              </a>
              <div className="pt-4 border-t border-slate-200">
                <a
                  href="#tests"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-lg font-semibold text-center shadow-lg"
                >
                  Comenzar Test
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-400 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-20 left-20 w-8 h-8 bg-blue-400 rounded-full opacity-20 animate-bounce"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute top-40 right-32 w-6 h-6 bg-purple-400 rounded-full opacity-20 animate-bounce"
            style={{ animationDelay: "1.5s" }}
          ></div>
          <div
            className="absolute bottom-32 left-1/4 w-4 h-4 bg-cyan-400 rounded-full opacity-20 animate-bounce"
            style={{ animationDelay: "2.5s" }}
          ></div>
          <div
            className="absolute bottom-20 right-20 w-5 h-5 bg-green-400 rounded-full opacity-20 animate-bounce"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative">
          <div className="mb-12 animate-fade-in">
            <Badge className="mb-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg text-base font-medium">
              <Star className="w-4 h-4 mr-2" />
              Validado Científicamente por Cambridge Autism Research Centre
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight animate-scale-in">
            <span className="bg-gradient-to-r from-slate-900 via-blue-700 to-purple-700 bg-clip-text text-transparent">
              Descubre tu perfil del
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              espectro autista
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-up px-4">
            Tests{" "}
            <span className="font-semibold text-blue-600">
              científicamente validados
            </span>{" "}
            desarrollados por investigadores de Cambridge. Evaluación
            profesional y confidencial de rasgos del espectro autista con
            <span className="font-semibold text-purple-600">
              {" "}
              interpretación detallada
            </span>{" "}
            y recomendaciones personalizadas.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in">
            <Link href="/test/aq10">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-10 py-6 text-xl font-semibold shadow-xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 transform"
              >
                <span className="mr-3">🎯</span>
                Comenzar AQ-10 Gratis
                <ChevronRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/test/aq50">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-10 py-6 text-xl font-semibold shadow-xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 transform"
              >
                <span className="mr-3">⭐</span>
                Test AQ-50 Completo
                <ChevronRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Enhanced Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mt-20 animate-slide-up px-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-shadow group">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-slate-800">100%</div>
                  <div className="text-sm text-slate-600">Confidencial</div>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                Tus datos están completamente protegidos y nunca son compartidos
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-shadow group">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-slate-800">50K+</div>
                  <div className="text-sm text-slate-600">Usuarios</div>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                Miles de personas han descubierto su perfil con nuestros tests
              </p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-shadow group">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-slate-800">23+</div>
                  <div className="text-sm text-slate-600">Años</div>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                De investigación científica respaldan estos instrumentos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="tests"
        className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-purple-500 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-8">
              <Brain className="h-4 w-4" />
              Tests Científicamente Validados
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Evaluaciones Disponibles
            </h3>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4">
              Elige la evaluación que mejor se adapte a tus necesidades. Ambos
              tests están{" "}
              <span className="font-semibold text-blue-600">
                científicamente validados
              </span>{" "}
              y proporcionan resultados confiables desarrollados por Cambridge.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto px-4">
            {/* AQ-10 Card */}
            <Card className="group hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 shadow-xl relative overflow-hidden animate-scale-in">
              {/* Decorative background */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 to-emerald-500"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"></div>

              <CardHeader className="pb-6 pt-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-green-500/25 transition-shadow">
                        <CheckCircle className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">10</span>
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-bold text-slate-800 mb-1">
                        AQ-10
                      </CardTitle>
                      <p className="text-green-600 font-semibold">
                        Evaluación Rápida
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-4 py-2 text-sm font-bold shadow-lg">
                    ✨ Gratis
                  </Badge>
                </div>
                <CardDescription className="text-lg text-slate-600 leading-relaxed">
                  Evaluación rápida de{" "}
                  <span className="font-semibold text-green-600">
                    10 preguntas
                  </span>{" "}
                  para detección inicial de rasgos del espectro autista.
                  Perfecto para comenzar tu autoconocimiento.
                </CardDescription>
              </CardHeader>

              <CardContent className="pb-8">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8">
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-slate-700">
                        10 preguntas científicamente seleccionadas
                      </span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-slate-700">
                        5-10 minutos de duración
                      </span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-slate-700">
                        Resultados inmediatos con interpretación
                      </span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-slate-700">
                        Punto de corte científico:{" "}
                        <span className="font-semibold">≥6 puntos</span>
                      </span>
                    </li>
                  </ul>
                </div>

                <Link href="/test/aq10">
                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-14 text-lg font-semibold shadow-xl hover:shadow-green-500/25 transition-all duration-300 group-hover:scale-105">
                    Comenzar Test AQ-10
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* AQ-50 Card */}
            <Card className="group hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 shadow-xl relative overflow-hidden animate-scale-in">
              {/* Decorative background */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"></div>

              {/* Premium badge */}
              <div className="absolute top-6 right-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                ⭐ Premium
              </div>

              <CardHeader className="pb-6 pt-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-shadow">
                        <Star className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">50</span>
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-3xl font-bold text-slate-800 mb-1">
                        AQ-50
                      </CardTitle>
                      <p className="text-purple-600 font-semibold">
                        Evaluación Completa
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0 px-4 py-2 text-sm font-bold shadow-lg">
                    💎 $2 USD
                  </Badge>
                </div>
                <CardDescription className="text-lg text-slate-600 leading-relaxed">
                  Evaluación completa de{" "}
                  <span className="font-semibold text-purple-600">
                    50 preguntas
                  </span>{" "}
                  para análisis detallado y diagnóstico diferencial. El test
                  original de Cambridge completo.
                </CardDescription>
              </CardHeader>

              <CardContent className="pb-8">
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 mb-8">
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-slate-700">
                        50 preguntas del test original completo
                      </span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-slate-700">
                        20-30 minutos de evaluación profunda
                      </span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-slate-700">
                        Análisis por categorías detallado
                      </span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-slate-700">
                        Punto de corte científico:{" "}
                        <span className="font-semibold">≥32 puntos</span>
                      </span>
                    </li>
                  </ul>
                </div>

                <Link href="/test/aq50">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white h-14 text-lg font-semibold shadow-xl hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-105">
                    Comenzar Test AQ-50
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Comparison Table */}
          <div className="mt-20 animate-fade-in">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-600 to-slate-700 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Users className="h-4 w-4" />
                  Comparación Detallada
                </div>
                <h4 className="text-3xl font-bold text-slate-800 mb-2">
                  ¿Cuál Test Elegir?
                </h4>
                <p className="text-slate-600">
                  Compara las características de cada evaluación para tomar la
                  mejor decisión
                </p>
              </div>

              <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left py-3 px-2 sm:py-4 sm:px-4 font-bold text-slate-800 text-sm sm:text-lg">
                        Característica
                      </th>
                      <th className="text-center py-3 px-2 sm:py-4 sm:px-4">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold">10</span>
                          </div>
                          <span className="font-bold text-green-600 text-lg">
                            AQ-10
                          </span>
                        </div>
                      </th>
                      <th className="text-center py-4 px-4">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                            <Star className="w-6 h-6 text-white" />
                          </div>
                          <span className="font-bold text-purple-600 text-lg">
                            AQ-50
                          </span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-4 font-semibold text-slate-700">
                        Número de preguntas
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-bold">
                          10
                        </span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-bold">
                          50
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-4 font-semibold text-slate-700">
                        Tiempo estimado
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="text-green-700 font-semibold">
                          5-10 min
                        </span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="text-purple-700 font-semibold">
                          20-30 min
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-4 font-semibold text-slate-700">
                        Análisis por categorías
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                          ❌ No disponible
                        </span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                          ✅ Incluido
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-4 font-semibold text-slate-700">
                        Comparación poblacional
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="text-green-700 font-semibold">
                          Básica
                        </span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="text-purple-700 font-semibold">
                          Detallada
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-4 font-semibold text-slate-700">
                        Descarga de resultados
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                          ✅ Incluido
                        </span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                          ✅ Incluido
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-4 font-semibold text-slate-700">
                        Precio
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="bg-green-500 text-white px-4 py-2 rounded-full font-bold">
                          ✨ Gratis
                        </span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="bg-purple-500 text-white px-4 py-2 rounded-full font-bold">
                          💎 $2 USD
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-8 text-center">
                <p className="text-slate-600 text-sm">
                  💡 <span className="font-semibold">Recomendación:</span>{" "}
                  Comienza con el AQ-10 gratuito. Si necesitas un análisis más
                  profundo, continúa con el AQ-50.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section
        id="examples"
        className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-indigo-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4" />
              Historias de Éxito
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Personajes Exitosos con Autismo
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              El autismo no es un límite, es una{" "}
              <span className="font-semibold text-purple-600">
                forma diferente de ver el mundo
              </span>{" "}
              que puede llevar a logros extraordinarios
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 px-4">
            {/* Elon Musk */}
            <Card className="text-center group hover:shadow-xl hover:-translate-y-2 transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 shadow-lg animate-scale-in">
              <CardContent className="pt-8 pb-8">
                <div className="relative mb-6">
                  <div className="w-28 h-28 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-shadow duration-300">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-800">
                        EM
                      </span>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h4 className="text-2xl font-bold mb-2 text-slate-800">
                  Elon Musk
                </h4>
                <p className="text-purple-600 font-medium mb-4">
                  CEO de Tesla y SpaceX
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <p className="text-sm text-slate-700 italic leading-relaxed">
                    "Creo que la mayoría de la gente probablemente tiene un poco
                    de autismo. Me diagnosticaron con Asperger."
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Anthony Hopkins */}
            <Card className="text-center group hover:shadow-xl hover:-translate-y-2 transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 shadow-lg animate-scale-in">
              <CardContent className="pt-8 pb-8">
                <div className="relative mb-6">
                  <div className="w-28 h-28 mx-auto bg-gradient-to-br from-amber-500 to-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-amber-500/25 transition-shadow duration-300">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-800">
                        AH
                      </span>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-500 to-red-500 rounded-full flex items-center justify-center">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h4 className="text-2xl font-bold mb-2 text-slate-800">
                  Anthony Hopkins
                </h4>
                <p className="text-amber-600 font-medium mb-4">
                  Actor ganador del Oscar
                </p>
                <div className="bg-gradient-to-r from-amber-50 to-red-50 p-4 rounded-lg border-l-4 border-amber-500">
                  <p className="text-sm text-slate-700 italic leading-relaxed">
                    "Fui diagnosticado con Asperger, pero no lo veo como una
                    discapacidad. Es una ventaja."
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Dan Aykroyd */}
            <Card className="text-center group hover:shadow-xl hover:-translate-y-2 transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 shadow-lg animate-scale-in">
              <CardContent className="pt-8 pb-8">
                <div className="relative mb-6">
                  <div className="w-28 h-28 mx-auto bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-green-500/25 transition-shadow duration-300">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-800">
                        DA
                      </span>
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h4 className="text-2xl font-bold mb-2 text-slate-800">
                  Dan Aykroyd
                </h4>
                <p className="text-green-600 font-medium mb-4">
                  Actor y comediante
                </p>
                <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg border-l-4 border-green-500">
                  <p className="text-sm text-slate-700 italic leading-relaxed">
                    "Fui diagnosticado con síndrome de Asperger. Me obsesiono
                    con cosas y eso me hace bueno en lo que hago."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional inspirational message */}
          <div className="mt-16 text-center animate-fade-in">
            <div className="inline-block bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-slate-800">
                  Neurodiversidad = Fortaleza
                </h4>
              </div>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Estas historias demuestran que el autismo puede ser una{" "}
                <span className="font-semibold text-purple-600">
                  ventaja única
                </span>
                que impulsa la innovación, creatividad y excelencia en diversos
                campos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-500 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-8">
              <Brain className="h-4 w-4" />
              Fundamentos Científicos
            </div>
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Acerca de los Tests AQ
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Desarrollados por el{" "}
              <span className="font-semibold text-blue-600">
                Cambridge Autism Research Centre
              </span>
              , estos tests son herramientas científicamente validadas para la
              evaluación de rasgos del espectro autista
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* ¿Qué es el AQ? */}
            <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 shadow-xl relative overflow-hidden animate-scale-in">
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"></div>

              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-shadow">
                    <span className="text-2xl">🧬</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-slate-800">
                      ¿Qué es el AQ?
                    </h4>
                    <p className="text-blue-600 font-semibold">
                      Autism Spectrum Quotient
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-slate-700">
                  <p className="leading-relaxed">
                    El{" "}
                    <span className="font-semibold text-blue-600">
                      Autism Spectrum Quotient (AQ)
                    </span>{" "}
                    es un cuestionario desarrollado por el prestigioso{" "}
                    <span className="font-semibold">
                      Cambridge Autism Research Centre
                    </span>{" "}
                    para evaluar rasgos autistas en adultos con capacidades
                    intelectuales típicas.
                  </p>

                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="text-sm font-medium text-blue-800 mb-2">
                      ⚠️ Importante
                    </p>
                    <p className="text-sm text-blue-700">
                      No es un diagnóstico médico, pero puede indicar si una
                      evaluación profesional podría ser beneficiosa para obtener
                      un diagnóstico formal.
                    </p>
                  </div>

                  <div className="flex items-start gap-3 mt-4">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">
                      Validado científicamente en múltiples poblaciones
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">
                      Utilizado en investigación y práctica clínica mundial
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm">
                      Desarrollado por expertos líderes en autismo
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ¿Cómo funciona? */}
            <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-white/80 backdrop-blur-sm border-0 shadow-xl relative overflow-hidden animate-scale-in">
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"></div>

              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-shadow">
                    <span className="text-2xl">⚙️</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-slate-800">
                      ¿Cómo funciona?
                    </h4>
                    <p className="text-purple-600 font-semibold">
                      Metodología Científica
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-slate-700">
                  <p className="leading-relaxed">
                    Responde preguntas sobre tus{" "}
                    <span className="font-semibold text-purple-600">
                      preferencias y comportamientos
                    </span>
                    utilizando una escala de Likert de 4 puntos, desde
                    "Definitivamente en desacuerdo" hasta "Definitivamente de
                    acuerdo".
                  </p>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-l-4 border-purple-500">
                    <p className="text-sm font-medium text-purple-800 mb-2">
                      📊 Análisis
                    </p>
                    <p className="text-sm text-purple-700">
                      Tus respuestas se analizan automáticamente y recibes una
                      puntuación con interpretación basada en décadas de
                      investigación científica.
                    </p>
                  </div>

                  <div className="space-y-3 mt-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">1</span>
                      </div>
                      <p className="text-sm">
                        Responde honestamente sobre tu comportamiento típico
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">2</span>
                      </div>
                      <p className="text-sm">
                        El algoritmo procesa tus respuestas automáticamente
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">3</span>
                      </div>
                      <p className="text-sm">
                        Recibe puntuación e interpretación personalizada
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional info section */}
          <div className="mt-16 text-center animate-fade-in">
            <div className="bg-gradient-to-r from-slate-100 to-gray-100 rounded-2xl p-8 border border-slate-200">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-slate-800">
                  Validación Científica
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    2001
                  </div>
                  <p className="text-slate-600 text-sm">
                    Año de publicación original por Baron-Cohen et al.
                  </p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    50+
                  </div>
                  <p className="text-slate-600 text-sm">
                    Países donde se ha validado el instrumento
                  </p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    1000+
                  </div>
                  <p className="text-slate-600 text-sm">
                    Estudios científicos que lo utilizan
                  </p>
                </div>
              </div>

              <p className="text-slate-600 mt-6 max-w-2xl mx-auto">
                Respaldado por décadas de investigación y utilizado mundialmente
                por profesionales de la salud mental
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Enhanced Header */}
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <Brain className="h-6 w-6 text-blue-300" />
              <span className="text-blue-100 font-medium">Evaluación Profesional</span>
            </div>
            
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              ¿Listo para descubrir 
              <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent block mt-2">
                tu perfil único?
              </span>
            </h3>
            
            <p className="text-lg sm:text-xl md:text-2xl text-blue-100/90 mb-4 max-w-3xl mx-auto leading-relaxed px-4">
              Inicia tu camino hacia el autoconocimiento con nuestras evaluaciones validadas científicamente
            </p>
            
            <p className="text-blue-200/70 max-w-2xl mx-auto px-4">
              Miles de personas ya han descubierto aspectos importantes sobre sí mismas. 
              Tu turno de explorar y entender tu perfil único.
            </p>
          </div>

          {/* Test Options Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto animate-slide-up px-4">
            {/* AQ-10 Card */}
            <div className="group bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">10</span>
              </div>
              <h4 className="text-2xl font-bold text-white mb-3">Test AQ-10</h4>
              <p className="text-blue-100/80 mb-4 leading-relaxed">
                Evaluación rápida y gratuita. Perfecto para comenzar tu exploración personal en solo 5 minutos.
              </p>
              <div className="flex items-center justify-center gap-2 text-green-300 text-sm mb-6">
                <CheckCircle className="h-4 w-4" />
                <span>Gratuito • 5 min • Resultados inmediatos</span>
              </div>
              <Link href="/test/aq10">
                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-green-500/25 transition-all duration-300">
                  Comenzar AQ-10 Gratis
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* AQ-50 Card */}
            <div className="group bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">50</span>
              </div>
              <h4 className="text-2xl font-bold text-white mb-3">Test AQ-50</h4>
              <p className="text-blue-100/80 mb-4 leading-relaxed">
                Análisis completo y detallado. Obtén insights profundos sobre tu perfil con evaluación comprensiva.
              </p>
              <div className="flex items-center justify-center gap-2 text-purple-300 text-sm mb-6">
                <Star className="h-4 w-4" />
                <span>Completo • 15 min • Análisis detallado</span>
              </div>
              <Link href="/test/aq50">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                  Ver AQ-50 Completo
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-blue-200/60 text-sm animate-fade-in px-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>+50,000 evaluaciones completadas</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Validación científica</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              <span>Desarrollado por expertos</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Decorative top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">AQ Test</h3>
                  <p className="text-slate-400 text-sm">Evaluación Profesional</p>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed max-w-sm">
                Plataforma líder en evaluaciones del espectro autista. Ayudamos a miles de personas 
                a comprender mejor su perfil neurológico con herramientas validadas científicamente.
              </p>
              <div className="flex space-x-4">
                <div className="bg-slate-800 p-2 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer">
                  <Brain className="h-5 w-5 text-blue-400" />
                </div>
                <div className="bg-slate-800 p-2 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer">
                  <Users className="h-5 w-5 text-purple-400" />
                </div>
                <div className="bg-slate-800 p-2 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                </div>
              </div>
            </div>

            {/* Tests Section */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Nuestros Tests</h4>
              <div className="space-y-4">
                <Link href="/test/aq10" className="group flex items-center space-x-3 text-slate-300 hover:text-blue-400 transition-colors">
                  <div className="bg-green-600/20 p-2 rounded-lg group-hover:bg-green-600/30 transition-colors">
                    <span className="text-green-400 font-bold text-sm">10</span>
                  </div>
                  <div>
                    <p className="font-medium">Test AQ-10</p>
                    <p className="text-sm text-slate-500">Evaluación rápida y gratuita</p>
                  </div>
                </Link>
                <Link href="/test/aq50" className="group flex items-center space-x-3 text-slate-300 hover:text-purple-400 transition-colors">
                  <div className="bg-purple-600/20 p-2 rounded-lg group-hover:bg-purple-600/30 transition-colors">
                    <span className="text-purple-400 font-bold text-sm">50</span>
                  </div>
                  <div>
                    <p className="font-medium">Test AQ-50</p>
                    <p className="text-sm text-slate-500">Análisis completo y detallado</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Information Section */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Información</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-slate-300 font-medium">Validación Científica</p>
                    <p className="text-sm text-slate-500">Basado en investigación de Baron-Cohen et al.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-slate-300 font-medium">+50,000 Evaluaciones</p>
                    <p className="text-sm text-slate-500">Confiado por profesionales y usuarios</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-slate-300 font-medium">Resultados Inmediatos</p>
                    <p className="text-sm text-slate-500">Análisis detallado al completar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer Section */}
          <div className="bg-slate-800/50 rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-3">
              <div className="bg-amber-500/20 p-2 rounded-lg">
                <span className="text-amber-400 text-lg">⚠️</span>
              </div>
              <div>
                <h5 className="text-amber-400 font-semibold mb-2">Importante: Propósito Educativo</h5>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Los tests AQ son herramientas de screening e investigación que <strong>no constituyen un diagnóstico médico profesional</strong>. 
                  Si tienes preocupaciones sobre tu desarrollo neurológico, consulta con un especialista en salud mental 
                  o neuropsicología para una evaluación completa.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <span>© 2024 AQ Test Platform</span>
              <span className="hidden md:inline">•</span>
              <span>Todos los derechos reservados</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-slate-500">
              <span>Desarrollado con</span>
              <div className="flex items-center space-x-1">
                <span className="text-red-400">♥</span>
                <span>para la comunidad</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
