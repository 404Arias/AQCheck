"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, CheckCircle, Info } from "lucide-react";
import { toast } from "sonner";
import { DownloadOptions } from "@/components/download-options";

const aq10Questions = [
  "Prefiero hacer las cosas solo en lugar de con otras personas",
  "Prefiero hacer las cosas de la misma forma una y otra vez", 
  "Si trato de imaginar algo, me resulta muy fácil crear una imagen mental",
  "Frecuentemente me concentro tanto en los detalles que pierdo la visión general",
  "A menudo noto pequeños sonidos cuando otros no los notan",
  "Generalmente me doy cuenta de las matrículas de automóviles o información similar",
  "Otras personas frecuentemente me dicen que lo que he dicho es descortés, aunque pienso que es cortés",
  "Cuando leo una historia, puedo imaginar fácilmente cómo se ven los personajes",
  "Me fascina las fechas",
  "En un grupo social, puedo fácilmente seguir las conversaciones de varias personas diferentes"
];

const options = [
  { value: "1", label: "Definitivamente en desacuerdo", description: "Nunca o casi nunca" },
  { value: "2", label: "En desacuerdo", description: "Raramente" },
  { value: "3", label: "De acuerdo", description: "Frecuentemente" }, 
  { value: "4", label: "Definitivamente de acuerdo", description: "Siempre o casi siempre" },
];

export default function AQ10Test() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(new Array(10).fill(""));
  const [showResults, setShowResults] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

  // Questions that are reverse-scored (3, 8, 10)
  const reverseQuestions = [2, 7, 9]; // 0-indexed

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (answers[currentQuestion] === "") {
      toast.error("Por favor selecciona una respuesta antes de continuar");
      return;
    }
    
    if (currentQuestion < 9) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    
    answers.forEach((answer, index) => {
      const numAnswer = parseInt(answer);
      
      if (reverseQuestions.includes(index)) {
        // Reverse scoring: 1→4, 2→3, 3→2, 4→1
        const reversedScore = 5 - numAnswer;
        if (reversedScore >= 3) score += 1;
      } else {
        // Normal scoring: 3 or 4 gets 1 point
        if (numAnswer >= 3) score += 1;
      }
    });
    
    return score;
  };

  const getScoreLevel = (score: number) => {
    if (score >= 6) return { level: "Alto", color: "bg-red-100 text-red-800", description: "Indicadores significativos de rasgos autistas" };
    if (score >= 4) return { level: "Moderado", color: "bg-yellow-100 text-yellow-800", description: "Algunos indicadores de rasgos autistas" };
    return { level: "Bajo", color: "bg-green-100 text-green-800", description: "Pocos indicadores de rasgos autistas" };
  };

  const finishTest = () => {
    if (answers.some(answer => answer === "")) {
      toast.error("Por favor completa todas las preguntas");
      return;
    }
    setShowResults(true);
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setAnswers(new Array(10).fill(""));
    setShowResults(false);
    setShowDownload(false);
  };

  if (showResults) {
    const score = calculateScore();
    const scoreInfo = getScoreLevel(score);
    
    const testResult = {
      testType: "AQ-10 (Autism Quotient)",
      score: score,
      maxScore: 10,
      level: scoreInfo.level,
      description: scoreInfo.description,
      recommendation: score >= 6 ? "Se recomienda consultar con un profesional especializado" : "Mantener seguimiento si hay preocupaciones"
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-blue-900">Resultados del Test AQ-10</CardTitle>
              <CardDescription>Cuestionario de detección de rasgos autistas</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-4">
                  <span className="text-3xl font-bold text-blue-900">{score}</span>
                </div>
                <p className="text-lg text-gray-600">Puntuación total: {score}/10</p>
              </div>
              
              <div className="flex justify-center">
                <Badge className={`${scoreInfo.color} px-4 py-2 text-lg`}>
                  Nivel: {scoreInfo.level}
                </Badge>
              </div>
              
              <Card className="bg-blue-50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-blue-900 mb-2">Interpretación</h3>
                  <p className="text-blue-800">{scoreInfo.description}</p>
                  {testResult.recommendation && (
                    <p className="text-blue-700 mt-2 font-medium">{testResult.recommendation}</p>
                  )}
                </CardContent>
              </Card>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                <Button onClick={() => setShowDownload(true)} className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Descargar Resultados
                </Button>
                <Button onClick={restartTest} variant="outline" className="w-full sm:w-auto">
                  Realizar Test Nuevamente
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {showDownload && (
            <DownloadOptions 
              testResult={testResult}
              onClose={() => setShowDownload(false)}
            />
          )}
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / 10) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <Badge variant="secondary">AQ-10</Badge>
              <span className="text-sm text-gray-600">
                Pregunta {currentQuestion + 1} de 10
              </span>
            </div>
            
            <Progress value={progress} className="mb-4" />
            
            <CardTitle className="text-2xl text-blue-900">
              Test AQ-10 (Autism Quotient)
            </CardTitle>
            <CardDescription>
              Cuestionario de detección de rasgos autistas en adultos
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Card className="bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-lg text-blue-900 font-medium">
                    {aq10Questions[currentQuestion]}
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-3">
              {options.map((option) => (
                <Card 
                  key={option.value}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    answers[currentQuestion] === option.value 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleAnswer(option.value)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                        answers[currentQuestion] === option.value
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {answers[currentQuestion] === option.value && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{option.label}</p>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-between">
              <Button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </Button>
              
              {currentQuestion === 9 ? (
                <Button
                  onClick={finishTest}
                  className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Finalizar Test
                </Button>
              ) : (
                <Button
                  onClick={nextQuestion}
                  className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                >
                  Siguiente
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}