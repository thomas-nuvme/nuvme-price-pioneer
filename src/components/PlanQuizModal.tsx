import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Icon } from '@/components/Icon';
import { Badge } from '@/components/ui/badge';
import { questions, plans, getPlanRecommendation, suggestUpgrade, PlanType } from '@/utils/quizData';

interface PlanQuizModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PlanQuizModal: React.FC<PlanQuizModalProps> = ({ open, onOpenChange }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (questionId: string, optionId: string) => {
    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
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
  };

  const handleClose = () => {
    handleRestart();
    onOpenChange(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const recommendedPlanId = getPlanRecommendation(answers);
  const recommendedPlan = plans.find(p => p.id === recommendedPlanId);
  const upgrade = suggestUpgrade(answers, recommendedPlanId);
  const isCurrentQuestionAnswered = answers[questions[currentQuestion]?.id];

  const getPlanColor = (planId: PlanType) => {
    const plan = plans.find(p => p.id === planId);
    return plan?.color || '#00C7B1';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Search" className="w-5 h-5 text-nuvme-blue" />
            Quiz de Plano Ideal
          </DialogTitle>
          <DialogDescription>
            Responda 6 perguntas para descobrir o plano ideal
          </DialogDescription>
        </DialogHeader>

        {!showResult ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Pergunta {currentQuestion + 1} de {questions.length}</span>
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
                <Card className="border-nuvme-blue/20">
                  <CardContent className="pt-6 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {questions[currentQuestion].text}
                      </h3>
                      {questions[currentQuestion].helpText && (
                        <p className="text-sm text-muted-foreground">
                          {questions[currentQuestion].helpText}
                        </p>
                      )}
                    </div>

                    <RadioGroup
                      value={answers[questions[currentQuestion].id] || ''}
                      onValueChange={(value) => handleAnswer(questions[currentQuestion].id, value)}
                    >
                      <div className="space-y-3">
                        {questions[currentQuestion].options.map((option) => (
                          <div
                            key={option.id}
                            className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer"
                          >
                            <RadioGroupItem value={option.id} id={option.id} />
                            <Label htmlFor={option.id} className="cursor-pointer flex-1">
                              {option.text}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>

                    <div className="flex gap-3 pt-4">
                      {currentQuestion > 0 && (
                        <Button variant="outline" onClick={handleBack}>
                          <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
                          Anterior
                        </Button>
                      )}
                      <Button
                        onClick={handleNext}
                        disabled={!isCurrentQuestionAnswered}
                        className="ml-auto bg-nuvme-blue hover:bg-nuvme-blue/90"
                      >
                        {currentQuestion === questions.length - 1 ? 'Ver Resultado' : 'Próxima'}
                        <Icon name="ArrowRight" className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : recommendedPlan ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <Card className="border-2" style={{ borderColor: recommendedPlan.color }}>
              <CardContent className="pt-6 space-y-4">
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-2"
                    style={{ backgroundColor: `${recommendedPlan.color}20` }}>
                    <Icon 
                      name={recommendedPlan.id === 'essential' ? 'Zap' : recommendedPlan.id === 'advanced' ? 'Settings' : 'Crown'} 
                      className="w-8 h-8"
                      style={{ color: recommendedPlan.color }}
                    />
                  </div>
                  <Badge className="text-lg px-4 py-1" style={{ backgroundColor: recommendedPlan.color }}>
                    {recommendedPlan.name}
                  </Badge>
                  <h3 className="text-2xl font-bold">
                    {recommendedPlan.description}
                  </h3>
                  <p className="text-muted-foreground italic">
                    "{recommendedPlan.tagline}"
                  </p>
                </div>

                {upgrade && (
                  <div className="p-4 border border-orange-200 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <h4 className="font-semibold flex items-center gap-2 text-orange-800 dark:text-orange-400">
                      <Icon name="TrendingUp" className="w-5 h-5" />
                      Sugestão de upgrade
                    </h4>
                    <p className="text-sm text-orange-700 dark:text-orange-300 mt-2">
                      {upgrade.reason}
                    </p>
                  </div>
                )}

                <div className="space-y-3 pt-4 border-t">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Icon name="Check" className="w-5 h-5 text-green-500" />
                    O que está incluído
                  </h4>
                  <ul className="space-y-2">
                    {recommendedPlan.included.slice(0, 5).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Icon name="Check" className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold text-sm mb-2">Para quem é indicado:</h4>
                  <ul className="space-y-1">
                    {recommendedPlan.forWho.map((who, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">
                        • {who}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button onClick={handleRestart} variant="outline" className="flex-1">
                <Icon name="RotateCcw" className="w-4 h-4 mr-2" />
                Refazer Quiz
              </Button>
              <Button onClick={handleClose} className="flex-1 bg-nuvme-blue hover:bg-nuvme-blue/90">
                Concluir
              </Button>
            </div>
          </motion.div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default PlanQuizModal;
