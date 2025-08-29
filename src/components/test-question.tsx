"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface QuestionOption {
  value: string;
  label: string;
  description?: string;
}

interface TestQuestionProps {
  question: string;
  questionNumber: number;
  totalQuestions: number;
  options: QuestionOption[];
  value: string;
  onChange: (value: string) => void;
  showProgress?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
}

export function TestQuestion({
  question,
  questionNumber,
  totalQuestions,
  options,
  value,
  onChange,
  showProgress = true,
  variant = 'default',
  className = ""
}: TestQuestionProps) {
  const isCompact = variant === 'compact';
  const isDetailed = variant === 'detailed';

  return (
    <Card className={`shadow-medical-medium medical-fade-in ${className}`}>
      <CardHeader className={isCompact ? 'pb-3' : 'pb-4'}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {showProgress && (
                <Badge variant="outline" className="text-xs px-2 py-1">
                  {questionNumber} de {totalQuestions}
                </Badge>
              )}
              <span className="text-sm text-gray-500">
                Pregunta {questionNumber}
              </span>
            </div>
            <CardTitle className={`medical-heading leading-relaxed ${
              isCompact ? 'text-lg' : 'text-xl'
            }`}>
              {question}
            </CardTitle>
          </div>
          
          {/* Visual indicator for answered questions */}
          {value && (
            <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0 mt-1" />
          )}
        </div>

        {isDetailed && (
          <p className="text-sm text-gray-600 mt-2">
            Selecciona la opción que mejor describa cómo te sientes o actúas en general.
          </p>
        )}
      </CardHeader>

      <CardContent className={isCompact ? 'pt-0' : undefined}>
        <RadioGroup
          value={value}
          onValueChange={onChange}
          className="space-y-3"
        >
          {options.map((option, index) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem 
                value={option.value} 
                id={`${questionNumber}-${option.value}`}
              />
              <Label
                htmlFor={`${questionNumber}-${option.value}`}
                className={`cursor-pointer flex-1 ${
                  isCompact ? 'text-base' : 'text-lg'
                } text-gray-800`}
              >
                {option.label}
                {option.description && isDetailed && (
                  <span className="block text-sm text-gray-600 mt-1">
                    {option.description}
                  </span>
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>

        {/* Additional context for scoring */}
        {isDetailed && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">
              <span className="font-medium">Nota:</span> No hay respuestas correctas o incorrectas. 
              Responde de manera honesta basándote en cómo te sientes o actúas normalmente.
            </p>
          </div>
        )}

        {/* Progress indicator */}
        {showProgress && !isCompact && (
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Progreso de la pregunta</span>
              <span>{Math.round((questionNumber / totalQuestions) * 100)}%</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default TestQuestion;