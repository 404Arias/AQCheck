"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  FileText, 
  Image as ImageIcon, 
  Share2, 
  Printer,
  Mail,
  Copy,
  CheckCircle,
  Brain
} from "lucide-react";
import { toast } from "sonner";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface TestResult {
  testType: string;
  score: number;
  maxScore: number;
  level: string;
  description: string;
  recommendation?: string;
  date: string;
  userId?: string;
}

interface DownloadOptionsProps {
  result: TestResult;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DownloadOptions({ result, open, onOpenChange }: DownloadOptionsProps) {
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const pdfTemplateRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    setIsDownloading('pdf');
    try {
      console.log("Starting PDF generation...");
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let yPosition = 20;
      
      // Header with logo placeholder
      pdf.setFillColor(37, 99, 235);
      pdf.rect(pageWidth / 2 - 30, yPosition, 60, 15, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('AQ TEST', pageWidth / 2, yPosition + 10, { align: 'center' });
      
      yPosition += 25;
      
      // Title
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(20);
      pdf.text(`Resultados del Test AQ-${result.testType}`, pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 15;
      
      // Date
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      const formattedDate = new Date(result.date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long', 
        day: 'numeric'
      });
      pdf.text(`Fecha: ${formattedDate}`, pageWidth / 2, yPosition, { align: 'center' });
      
      yPosition += 25;
      
      // Score section with background
      pdf.setFillColor(240, 240, 255);
      pdf.rect(20, yPosition - 5, pageWidth - 40, 30, 'F');
      pdf.setDrawColor(100, 50, 200);
      pdf.rect(20, yPosition - 5, pageWidth - 40, 30, 'S');
      
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(100, 50, 200);
      pdf.text(`${result.score}/${result.maxScore}`, pageWidth / 2, yPosition + 8, { align: 'center' });
      
      pdf.setFontSize(16);
      pdf.text(`Nivel: ${result.level}`, pageWidth / 2, yPosition + 18, { align: 'center' });
      
      yPosition += 45;
      
      // Progress bar
      const barWidth = pageWidth - 60;
      const barHeight = 10;
      const progress = (result.score / result.maxScore) * barWidth;
      
      pdf.setFillColor(220, 220, 220);
      pdf.rect(30, yPosition, barWidth, barHeight, 'F');
      pdf.setFillColor(100, 50, 200);
      pdf.rect(30, yPosition, progress, barHeight, 'F');
      
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`${Math.round((result.score / result.maxScore) * 100)}% completado`, pageWidth / 2, yPosition + barHeight + 8, { align: 'center' });
      
      yPosition += 30;
      
      // Interpretation section
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text('Interpretación', 20, yPosition);
      
      yPosition += 10;
      
      pdf.setFillColor(230, 240, 255);
      const textHeight = 30;
      pdf.rect(20, yPosition - 5, pageWidth - 40, textHeight, 'F');
      pdf.setDrawColor(0, 100, 200);
      pdf.rect(20, yPosition - 5, pageWidth - 40, textHeight, 'S');
      
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(60, 60, 60);
      const splitDescription = pdf.splitTextToSize(result.description, pageWidth - 50);
      pdf.text(splitDescription, 25, yPosition + 5);
      
      yPosition += textHeight + 15;
      
      // Recommendation section
      if (result.recommendation) {
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(0, 0, 0);
        pdf.text('Recomendaciones', 20, yPosition);
        
        yPosition += 10;
        
        pdf.setFillColor(230, 255, 230);
        const recHeight = 25;
        pdf.rect(20, yPosition - 5, pageWidth - 40, recHeight, 'F');
        pdf.setDrawColor(0, 150, 0);
        pdf.rect(20, yPosition - 5, pageWidth - 40, recHeight, 'S');
        
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(60, 60, 60);
        const splitRecommendation = pdf.splitTextToSize(result.recommendation, pageWidth - 50);
        pdf.text(splitRecommendation, 25, yPosition + 5);
        
        yPosition += recHeight + 15;
      }
      
      // Disclaimer
      pdf.setFillColor(255, 230, 230);
      const disclaimerHeight = 25;
      pdf.rect(20, yPosition - 5, pageWidth - 40, disclaimerHeight, 'F');
      pdf.setDrawColor(200, 0, 0);
      pdf.rect(20, yPosition - 5, pageWidth - 40, disclaimerHeight, 'S');
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(150, 0, 0);
      pdf.text('⚠️ Nota Importante', 25, yPosition + 5);
      
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      const disclaimer = 'Este test no constituye un diagnóstico médico profesional. Consulta con un especialista para evaluaciones detalladas.';
      const splitDisclaimer = pdf.splitTextToSize(disclaimer, pageWidth - 50);
      pdf.text(splitDisclaimer, 25, yPosition + 12);
      
      // Footer
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text('© 2024 AQ Test Platform - Todos los derechos reservados', pageWidth / 2, pageHeight - 15, { align: 'center' });
      pdf.text(`Generado el ${new Date().toLocaleString('es-ES')}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
      
      const fileName = `AQ-${result.testType}-Resultados-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

      toast.success("PDF descargado exitosamente");
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error(`Error al generar el PDF: ${error.message || 'Error desconocido'}`);
    } finally {
      setIsDownloading(null);
    }
  };

  const generateImage = async () => {
    setIsDownloading('image');
    try {
      console.log("Starting image generation...");
      
      // Create a canvas to draw the result
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 1000;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      // White background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Header
      const gradient = ctx.createLinearGradient(0, 0, 800, 0);
      gradient.addColorStop(0, '#2563EB');
      gradient.addColorStop(1, '#059669');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 800, 80);

      // Logo text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('AQ TEST', 400, 45);
      ctx.font = '16px Arial';
      ctx.fillText('Evaluación del Espectro Autista', 400, 65);

      // Title
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 28px Arial';
      ctx.fillText(`Resultados del Test AQ-${result.testType}`, 400, 130);

      // Date
      ctx.font = '16px Arial';
      ctx.fillStyle = '#6b7280';
      const formattedDate = new Date(result.date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      ctx.fillText(`Fecha: ${formattedDate}`, 400, 155);

      // Score section background
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(50, 180, 700, 120);
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 3;
      ctx.strokeRect(50, 180, 700, 120);

      // Score
      ctx.fillStyle = '#8b5cf6';
      ctx.font = 'bold 48px Arial';
      ctx.fillText(`${result.score}/${result.maxScore}`, 400, 230);
      ctx.font = 'bold 24px Arial';
      ctx.fillText(`Nivel: ${result.level}`, 400, 265);

      // Progress bar
      const barY = 320;
      const barWidth = 600;
      const barHeight = 20;
      const progress = (result.score / result.maxScore) * barWidth;

      ctx.fillStyle = '#e5e7eb';
      ctx.fillRect(100, barY, barWidth, barHeight);
      ctx.fillStyle = '#8b5cf6';
      ctx.fillRect(100, barY, progress, barHeight);

      ctx.fillStyle = '#6b7280';
      ctx.font = '14px Arial';
      ctx.fillText(`${Math.round((result.score / result.maxScore) * 100)}% completado`, 400, barY + barHeight + 20);

      // Description section
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('Interpretación', 50, 390);

      ctx.fillStyle = '#e0f2fe';
      ctx.fillRect(50, 400, 700, 80);
      ctx.strokeStyle = '#0284c7';
      ctx.lineWidth = 2;
      ctx.strokeRect(50, 400, 700, 80);

      ctx.fillStyle = '#374151';
      ctx.font = '14px Arial';
      
      // Split text to fit width
      const words = result.description.split(' ');
      let line = '';
      const maxWidth = 650;
      let y = 425;
      
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && i > 0) {
          ctx.fillText(line, 70, y);
          line = words[i] + ' ';
          y += 18;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 70, y);

      // Recommendations if present
      if (result.recommendation) {
        y += 40;
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 20px Arial';
        ctx.fillText('Recomendaciones', 50, y);

        y += 10;
        ctx.fillStyle = '#f0fdf4';
        ctx.fillRect(50, y, 700, 60);
        ctx.strokeStyle = '#16a34a';
        ctx.strokeRect(50, y, 700, 60);

        ctx.fillStyle = '#374151';
        ctx.font = '14px Arial';
        
        const recWords = result.recommendation.split(' ');
        line = '';
        y += 25;
        
        for (let i = 0; i < recWords.length; i++) {
          const testLine = line + recWords[i] + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && i > 0) {
            ctx.fillText(line, 70, y);
            line = recWords[i] + ' ';
            y += 18;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, 70, y);
      }

      // Footer
      ctx.fillStyle = '#9ca3af';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('© 2024 AQ Test Platform - Todos los derechos reservados', 400, canvas.height - 30);
      ctx.fillText(`Generado el ${new Date().toLocaleString('es-ES')}`, 400, canvas.height - 15);

      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `AQ-${result.testType}-Resultados-${new Date().toISOString().split('T')[0]}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          toast.success("Imagen descargada exitosamente");
        } else {
          throw new Error('No se pudo generar la imagen');
        }
      }, 'image/png', 1.0);

    } catch (error) {
      console.error('Error generating image:', error);
      toast.error(`Error al generar la imagen: ${error.message || 'Error desconocido'}`);
    } finally {
      setIsDownloading(null);
    }
  };

  const shareResults = async () => {
    const shareText = `He completado el test AQ-${result.testType} y obtuve ${result.score}/${result.maxScore} puntos (${result.level}). ${result.description}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Resultados AQ-${result.testType}`,
          text: shareText,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareText);
      toast.success("Resultados copiados al portapapeles");
    }
  };

  const copyResults = async () => {
    const resultText = `
AQ-${result.testType} Results
Score: ${result.score}/${result.maxScore}
Level: ${result.level}
Date: ${new Date(result.date).toLocaleDateString('es-ES')}

${result.description}
${result.recommendation ? `\nRecommendation: ${result.recommendation}` : ''}
    `.trim();

    try {
      await navigator.clipboard.writeText(resultText);
      setCopied(true);
      toast.success("Resultados copiados al portapapeles");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Error al copiar al portapapeles");
    }
  };

  const printResults = () => {
    const printContent = `
      <html>
        <head>
          <title>AQ-${result.testType} Results</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              max-width: 800px; 
              margin: 40px auto; 
              padding: 20px;
              line-height: 1.6;
            }
            .header { text-align: center; margin-bottom: 40px; }
            .score { font-size: 48px; font-weight: bold; color: #2563EB; }
            .level { font-size: 24px; margin: 10px 0; }
            .description { margin: 20px 0; padding: 20px; background: #f8f9fa; border-radius: 8px; }
            .footer { margin-top: 40px; font-size: 12px; color: #666; border-top: 1px solid #ddd; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>AQ-${result.testType} Test Results</h1>
            <p>Date: ${new Date(result.date).toLocaleDateString('es-ES')}</p>
          </div>
          
          <div style="text-align: center;">
            <div class="score">${result.score}/${result.maxScore}</div>
            <div class="level">${result.level}</div>
          </div>
          
          <div class="description">
            <h3>Description:</h3>
            <p>${result.description}</p>
            ${result.recommendation ? `
              <h3>Recommendation:</h3>
              <p>${result.recommendation}</p>
            ` : ''}
          </div>
          
          <div class="footer">
            <p><strong>Scientific Information:</strong></p>
            <p>The AQ (Autism Spectrum Quotient) is an assessment tool developed by Baron-Cohen et al. at the Cambridge Autism Research Centre.</p>
            <p><strong>Important Note:</strong> This test does not constitute a medical diagnosis. It is an assessment tool that may indicate whether a more detailed professional evaluation would be beneficial.</p>
            <p>Generated by AQ Test Platform - © 2024 AQ Test. All rights reserved.</p>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Descargar Resultados
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Quick Summary */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                AQ-{result.testType} Results
                <Badge variant="outline">{result.level}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {result.score}/{result.maxScore}
              </div>
              <p className="text-sm text-blue-700">
                {new Date(result.date).toLocaleDateString('es-ES')}
              </p>
            </CardContent>
          </Card>

          <Separator />

          {/* Download Options */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={generatePDF}
              disabled={isDownloading === 'pdf'}
              className="flex flex-col gap-1 h-20 text-xs"
            >
              <FileText className="h-5 w-5" />
              {isDownloading === 'pdf' ? 'Generando PDF...' : 'PDF Profesional'}
            </Button>

            <Button
              variant="outline"
              onClick={generateImage}
              disabled={isDownloading === 'image'}
              className="flex flex-col gap-1 h-20 text-xs"
            >
              <ImageIcon className="h-5 w-5" />
              {isDownloading === 'image' ? 'Generando PNG...' : 'Imagen HD'}
            </Button>

            <Button
              variant="outline"
              onClick={printResults}
              className="flex flex-col gap-1 h-20 text-xs"
            >
              <Printer className="h-5 w-5" />
              Imprimir
            </Button>

            <Button
              variant="outline"
              onClick={copyResults}
              className="flex flex-col gap-1 h-20 text-xs"
            >
              {copied ? <CheckCircle className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
              {copied ? 'Copiado' : 'Copiar'}
            </Button>
          </div>

          <Separator />

          {/* Share Options */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Compartir</h4>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={shareResults}
                className="flex items-center gap-1 text-xs"
              >
                <Share2 className="h-4 w-4" />
                Compartir
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const subject = encodeURIComponent(`Mis resultados AQ-${result.testType}`);
                  const body = encodeURIComponent(`He completado el test AQ-${result.testType} y obtuve ${result.score}/${result.maxScore} puntos (${result.level}).\n\n${result.description}`);
                  window.open(`mailto:?subject=${subject}&body=${body}`);
                }}
                className="flex items-center gap-1 text-xs"
              >
                <Mail className="h-4 w-4" />
                Email
              </Button>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-200">
            <p>
              Los resultados no constituyen un diagnóstico médico profesional. 
              Consulta con un especialista para evaluaciones detalladas.
            </p>
          </div>
        </div>
      </DialogContent>

      {/* Hidden PDF Template */}
      <div 
        ref={pdfTemplateRef}
        className="fixed left-0 top-0 w-[800px] bg-white p-12 font-sans opacity-0 pointer-events-none"
        style={{ 
          fontFamily: 'system-ui, -apple-system, sans-serif',
          zIndex: -9999,
          transform: 'translateX(-100vw)'
        }}
      >
        {/* Header */}
        <div className="text-center mb-8 border-b-2 border-blue-600 pb-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="bg-gradient-to-br from-blue-600 to-green-600 p-4 rounded-xl">
              <Brain className="h-12 w-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-blue-600">AQ Test</h1>
              <p className="text-lg text-gray-600">Evaluación del Espectro Autista</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Resultados del Test AQ-{result.testType}
            </h2>
            <p className="text-gray-600">
              Fecha: {new Date(result.date).toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Score Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 border-2 border-purple-200 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Puntuación Obtenida</h3>
            <div className="text-6xl font-bold text-purple-600 mb-2">
              {result.score}/{result.maxScore}
            </div>
            <div className="inline-block bg-purple-600 text-white px-6 py-2 rounded-full text-xl font-semibold">
              Nivel: {result.level}
            </div>
          </div>
        </div>

        {/* Results Chart */}
        <div className="mb-8">
          <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Análisis Visual</h3>
            <div className="relative">
              {/* Progress bar */}
              <div className="bg-gray-200 rounded-full h-12 mb-4 relative overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-full rounded-full transition-all duration-500 relative"
                  style={{ width: `${(result.score / result.maxScore) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-lg drop-shadow-lg">
                    {result.score}/{result.maxScore}
                  </span>
                </div>
              </div>
              
              {/* Scale indicators */}
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Mínimo (0)</span>
                <span className="font-semibold">Tu Puntuación: {result.score}</span>
                <span>Máximo ({result.maxScore})</span>
              </div>
              
              {/* Percentage */}
              <div className="text-center">
                <span className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold">
                  {Math.round((result.score / result.maxScore) * 100)}% completado
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Interpretación</h3>
          <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
            <p className="text-gray-700 leading-relaxed text-lg">
              {result.description}
            </p>
          </div>
        </div>

        {/* Recommendation */}
        {result.recommendation && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recomendaciones</h3>
            <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
              <p className="text-gray-700 leading-relaxed text-lg">
                {result.recommendation}
              </p>
            </div>
          </div>
        )}

        {/* Scientific Information */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Información Científica</h3>
          <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
            <p className="text-gray-700 leading-relaxed">
              El AQ (Autism Spectrum Quotient) es una herramienta de evaluación desarrollada por 
              Baron-Cohen et al. en el Cambridge Autism Research Centre. Esta prueba ha sido 
              validada científicamente y es ampliamente utilizada para identificar rasgos 
              del espectro autista en adolescentes y adultos.
            </p>
          </div>
        </div>

        {/* Important Disclaimer */}
        <div className="bg-red-50 rounded-lg p-6 border-2 border-red-200 mb-8">
          <h3 className="text-xl font-bold text-red-800 mb-3">⚠️ Nota Importante</h3>
          <p className="text-red-700 leading-relaxed">
            <strong>Este test no constituye un diagnóstico médico profesional.</strong> Es una herramienta 
            de evaluación que puede indicar si sería beneficiosa una evaluación profesional más detallada. 
            Si tienes inquietudes sobre tu desarrollo o bienestar, consulta con un profesional de la 
            salud mental especializado en trastornos del espectro autista.
          </p>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-gray-300 pt-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Brain className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-blue-600 text-lg">AQ Test Platform</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2024 AQ Test. Todos los derechos reservados.
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Generado el {new Date().toLocaleDateString('es-ES')} a las {new Date().toLocaleTimeString('es-ES')}
          </p>
        </div>
      </div>
    </Dialog>
  );
}

export default DownloadOptions;