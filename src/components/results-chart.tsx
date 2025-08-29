"use client";

import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ResultData {
  score: number;
  maxScore: number;
  level: string;
  description: string;
  color: string;
  percentage: number;
  recommendation?: string;
  categories?: {
    name: string;
    score: number;
    maxScore: number;
  }[];
}

interface ResultsChartProps {
  data: ResultData;
  showCategories?: boolean;
  animated?: boolean;
}

export function ResultsChart({ data, showCategories = false, animated = true }: ResultsChartProps) {
  const getProgressColor = (percentage: number) => {
    if (percentage >= 64) return "bg-medical-danger"; // High (32+/50 = 64%+)
    if (percentage >= 40) return "bg-medical-warning"; // Medium (20+/50 = 40%+)
    return "bg-medical-success"; // Low
  };

  const getIconForLevel = (level: string) => {
    if (level.toLowerCase().includes('alto')) return <TrendingUp className="h-5 w-5" />;
    if (level.toLowerCase().includes('bajo')) return <TrendingDown className="h-5 w-5" />;
    return <Minus className="h-5 w-5" />;
  };

  const getScoreInterpretation = () => {
    if (data.percentage >= 64) {
      return {
        text: "Puntuación elevada",
        badge: "Alta",
        badgeVariant: "destructive" as const,
        bgClass: "bg-red-50"
      };
    } else if (data.percentage >= 40) {
      return {
        text: "Puntuación moderada", 
        badge: "Media",
        badgeVariant: "secondary" as const,
        bgClass: "bg-yellow-50"
      };
    } else {
      return {
        text: "Puntuación baja",
        badge: "Baja",
        badgeVariant: "outline" as const,
        bgClass: "bg-green-50"
      };
    }
  };

  const interpretation = getScoreInterpretation();

  return (
    <div className={`space-y-6 ${animated ? 'medical-fade-in' : ''}`}>
      {/* Main Score Display */}
      <Card className={`shadow-medical-medium ${interpretation.bgClass} border-2`}>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            {/* Score Circle */}
            <div className="relative mx-auto w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-300"
                  fill="none"
                  strokeWidth="3"
                  stroke="currentColor"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={`${data.color} transition-all duration-1000 ease-out`}
                  fill="none"
                  strokeWidth="3"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeDasharray={`${data.percentage}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-3xl font-bold ${data.color}`}>
                  {data.score}
                </span>
                <span className="text-sm text-gray-500">
                  de {data.maxScore}
                </span>
              </div>
            </div>

            {/* Level and Badge */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                {getIconForLevel(data.level)}
                <h3 className={`text-2xl font-semibold ${data.color}`}>
                  {data.level}
                </h3>
              </div>
              <Badge variant={interpretation.badgeVariant} className="text-sm px-3 py-1">
                {interpretation.badge}
              </Badge>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Progress 
                value={data.percentage} 
                className="h-3 bg-gray-200"
              />
              <p className="text-sm text-gray-600">
                {Math.round(data.percentage)}% del puntaje máximo
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed max-w-md mx-auto">
              {data.description}
            </p>

            {/* Recommendation */}
            {data.recommendation && (
              <div className="bg-white/60 p-4 rounded-lg border border-gray-200">
                <p className="text-sm font-medium text-gray-800">
                  <span className="text-blue-600">Recomendación:</span> {data.recommendation}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      {showCategories && data.categories && (
        <Card className="shadow-medical-light">
          <CardContent className="pt-6">
            <h4 className="text-lg font-semibold mb-4 text-gray-800">
              Análisis por Categorías
            </h4>
            <div className="space-y-4">
              {data.categories.map((category, index) => {
                const categoryPercentage = (category.score / category.maxScore) * 100;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">
                        {category.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {category.score}/{category.maxScore}
                      </span>
                    </div>
                    <Progress 
                      value={categoryPercentage}
                      className="h-2"
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Scientific Information */}
      <Card className="shadow-medical-light bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h4 className="text-lg font-semibold mb-3 text-blue-800 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Información Científica
          </h4>
          <div className="text-sm text-blue-700 space-y-2">
            <p>
              El AQ (Autism Spectrum Quotient) es una herramienta de evaluación desarrollada por 
              Baron-Cohen et al. en el Cambridge Autism Research Centre.
            </p>
            <p>
              <strong>Nota importante:</strong> Este test no constituye un diagnóstico médico. 
              Es una herramienta de evaluación que puede indicar si sería beneficiosa una 
              evaluación profesional más detallada.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ResultsChart;