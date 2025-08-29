"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Share2, Facebook, Twitter, MessageCircle, Link } from "lucide-react"

interface ShareResultsProps {
  score: number
  testType: 'AQ-10' | 'AQ-50'
}

export function ShareResults({ score, testType }: ShareResultsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const shareResults = (platform: string) => {
    const text = `He completado el test ${testType} y obtuve ${score} puntos. ¡Descubre tu perfil en AQ Test!`
    const url = window.location.href
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank')
        break
      case 'copy':
        navigator.clipboard.writeText(text + ' ' + url)
        alert('Enlace copiado al portapapeles')
        break
    }
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button 
        variant="outline"
        className="w-full flex items-center justify-center space-x-2 py-3 border-2 border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Share2 className="h-5 w-5 text-gray-600" />
        <span className="text-gray-700 font-medium">Compartir Resultados</span>
      </Button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-xl p-4 z-50">
          <div className="grid grid-cols-4 gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => shareResults('facebook')}
              className="flex flex-col items-center space-y-2 p-3 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-200"
            >
              <Facebook className="h-6 w-6 text-blue-600" />
              <span className="text-xs font-medium text-gray-700">Facebook</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => shareResults('twitter')}
              className="flex flex-col items-center space-y-2 p-3 hover:bg-sky-50 rounded-lg transition-colors border border-transparent hover:border-sky-200"
            >
              <Twitter className="h-6 w-6 text-sky-500" />
              <span className="text-xs font-medium text-gray-700">Twitter</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => shareResults('whatsapp')}
              className="flex flex-col items-center space-y-2 p-3 hover:bg-green-50 rounded-lg transition-colors border border-transparent hover:border-green-200"
            >
              <MessageCircle className="h-6 w-6 text-green-500" />
              <span className="text-xs font-medium text-gray-700">WhatsApp</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => shareResults('copy')}
              className="flex flex-col items-center space-y-2 p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-200"
            >
              <Link className="h-6 w-6 text-gray-600" />
              <span className="text-xs font-medium text-gray-700">Copiar</span>
            </Button>
          </div>
        </div>
      )}
      
      {/* Close dropdown when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}