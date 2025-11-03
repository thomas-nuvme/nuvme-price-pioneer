import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/Icon';
import { missionQuizQuestions, getMissionRecommendation } from '@/utils/missionQuizData';
import { missions } from '@/utils/calculatorData';
import type { MissionType } from '@/utils/calculatorData';

interface MissionQuizProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MissionQuiz: React.FC<MissionQuizProps> = ({ open, onOpenChange }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [recommendedMission, setRecommendedMission] = useState<MissionType | null>(null);

  const progress = ((currentQuestion + 1) / missionQuizQuestions.length) * 100;

  const handleAnswer = (optionId: string) => {
    const newAnswers = {
      ...answers,
      [missionQuizQuestions[currentQuestion].id]: optionId,
    };
    setAnswers(newAnswers);

    if (currentQuestion < missionQuizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed, show result
      const mission = getMissionRecommendation(newAnswers);
      setRecommendedMission(mission);
      setShowResult(true);
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
    setRecommendedMission(null);
  };

  const handleClose = () => {
    handleRestart();
    onOpenChange(false);
  };

  const currentQuestionData = missionQuizQuestions[currentQuestion];
  const recommendedMissionData = recommendedMission
    ? missions.find(m => m.id === recommendedMission)
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {showResult ? 'Missão Recomendada' : 'Quiz de Missões'}
          </DialogTitle>
          <DialogDescription>
            {showResult
              ? 'Com base nas suas respostas, recomendamos:'
              : 'Responda as perguntas para descobrir qual missão é ideal para você'}
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>
                    Pergunta {currentQuestion + 1} de {missionQuizQuestions.length}
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium leading-relaxed">
                  {currentQuestionData.text}
                </h3>

                <div className="space-y-3">
                  {currentQuestionData.options.map((option) => (
                    <Card
                      key={option.id}
                      className="cursor-pointer transition-all duration-200 hover:border-nuvme-teal hover:shadow-md"
                      onClick={() => handleAnswer(option.id)}
                    >
                      <CardContent className="p-4">
                        <p className="text-sm leading-relaxed">{option.text}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentQuestion === 0}
                >
                  <Icon name="ChevronLeft" className="w-4 h-4 mr-1" />
                  Voltar
                </Button>
                <Button variant="ghost" onClick={handleClose}>
                  Cancelar
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {recommendedMissionData && (
                <Card className="border-nuvme-teal bg-gradient-to-br from-white to-nuvme-light-teal">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-nuvme-teal flex items-center justify-center">
                        <Icon
                          name={recommendedMissionData.icon}
                          className="w-8 h-8 text-white"
                        />
                      </div>
                      <div className="flex-1">
                        <Badge className="mb-2 bg-nuvme-teal">
                          Missão Recomendada
                        </Badge>
                        <h3 className="text-2xl font-semibold">
                          {recommendedMissionData.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      {recommendedMissionData.description}
                    </p>
                  </CardContent>
                </Card>
              )}

              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  💡 Esta recomendação foi baseada nas suas respostas. Use-a como guia
                  para a conversa com seu cliente e adapte conforme necessário.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
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
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default MissionQuiz;
