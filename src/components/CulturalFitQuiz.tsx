import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Icon } from '@/components/Icon';
import { culturalFitQuestions, calculateFitScore, getFitResult, FitLevel } from '@/utils/culturalFitQuizData';

interface CulturalFitQuizProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CulturalFitQuiz: React.FC<CulturalFitQuizProps> = ({ open, onOpenChange }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (questionId: string, optionId: string) => {
    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);

    if (currentQuestion < culturalFitQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      setTimeout(() => setShowResult(true), 300);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  const handleClose = () => {
    handleRestart();
    onOpenChange(false);
  };

  const progress = ((currentQuestion + 1) / culturalFitQuestions.length) * 100;
  const score = calculateFitScore(answers);
  const result = getFitResult(score);

  const getFitColor = (level: FitLevel) => {
    switch (level) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-red-600';
    }
  };

  const getFitBgColor = (level: FitLevel) => {
    switch (level) {
      case 'high': return 'bg-green-100 dark:bg-green-900/20';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/20';
      case 'low': return 'bg-red-100 dark:bg-red-900/20';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Heart" className="w-5 h-5 text-nuvme-teal" />
            Quiz de Fit Cultural
          </DialogTitle>
          <DialogDescription>
            Avalie o alinhamento cultural entre sua empresa e a Nuvme
          </DialogDescription>
        </DialogHeader>

        {!showResult ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Pergunta {currentQuestion + 1} de {culturalFitQuestions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-nuvme-teal/20">
                  <CardContent className="pt-6 space-y-4">
                    <div>
                      <p className="text-xs font-medium text-nuvme-teal mb-2">
                        {culturalFitQuestions[currentQuestion].dimension}
                      </p>
                      <h3 className="text-lg font-semibold mb-4">
                        {culturalFitQuestions[currentQuestion].text}
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {culturalFitQuestions[currentQuestion].options.map((option) => (
                        <Button
                          key={option.id}
                          variant={answers[culturalFitQuestions[currentQuestion].id] === option.id ? "default" : "outline"}
                          className="w-full justify-start text-left h-auto py-4 px-4"
                          onClick={() => handleAnswer(culturalFitQuestions[currentQuestion].id, option.id)}
                        >
                          {option.text}
                        </Button>
                      ))}
                    </div>

                    {currentQuestion > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBack}
                        className="mt-4"
                      >
                        <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
                        Voltar
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <Card className={`border-2 ${getFitBgColor(result.level)}`}>
              <CardContent className="pt-6 space-y-4">
                <div className="text-center space-y-3">
                  <div className={`text-5xl font-bold ${getFitColor(result.level)}`}>
                    {result.score.toFixed(1)}/7
                  </div>
                  <h3 className={`text-2xl font-bold ${getFitColor(result.level)}`}>
                    {result.level === 'high' ? 'Alto Fit Cultural' : 
                     result.level === 'medium' ? 'Médio Fit Cultural' : 
                     'Baixo Fit Cultural'}
                  </h3>
                  <p className="text-muted-foreground">
                    {result.description}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Icon name="Lightbulb" className="w-5 h-5 text-yellow-500" />
                    Recomendações
                  </h4>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Icon name="Check" className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <h4 className="font-semibold text-sm">Suas respostas:</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {culturalFitQuestions.map((question, idx) => {
                      const answer = answers[question.id];
                      const option = question.options.find(o => o.id === answer);
                      return (
                        <div key={question.id} className="text-xs">
                          <p className="font-medium text-nuvme-teal">{question.dimension}</p>
                          <p className="text-muted-foreground">{option?.text}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button onClick={handleRestart} variant="outline" className="flex-1">
                <Icon name="RotateCcw" className="w-4 h-4 mr-2" />
                Refazer Quiz
              </Button>
              <Button onClick={handleClose} className="flex-1 bg-nuvme-teal hover:bg-nuvme-teal/90">
                Concluir
              </Button>
            </div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CulturalFitQuiz;
