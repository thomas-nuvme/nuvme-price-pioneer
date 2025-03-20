
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { questions, plans, getPlanRecommendation, PlanType, Plan } from "@/utils/quizData";
import { Icon } from "@/components/Icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PlanQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [recommendedPlans, setRecommendedPlans] = useState<PlanType[]>([]);
  const [finalPlan, setFinalPlan] = useState<Plan | null>(null);
  const [mode, setMode] = useState<"quiz" | "result">("quiz");

  // Update recommendations whenever selections change
  useEffect(() => {
    const newRecommendations = getPlanRecommendation(selectedOptions);
    setRecommendedPlans(newRecommendations);
  }, [selectedOptions]);

  // When the final question is answered, show the result
  useEffect(() => {
    if (Object.keys(selectedOptions).length === questions.length) {
      const topRecommendation = recommendedPlans[0];
      const plan = plans.find(p => p.id === topRecommendation) || null;
      setFinalPlan(plan);
      setMode("result");
    }
  }, [recommendedPlans, selectedOptions]);

  const handleOptionSelect = (questionId: string, optionId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptions({});
    setRecommendedPlans([]);
    setFinalPlan(null);
    setMode("quiz");
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isCurrentQuestionAnswered = selectedOptions[currentQuestion?.id];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  if (mode === "result" && finalPlan) {
    return (
      <motion.div
        key="result"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
        className="max-w-3xl mx-auto"
      >
        <Card className="border-t-4" style={{ borderTopColor: finalPlan.color }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Check" className="w-5 h-5 text-green-500" />
              Seu plano recomendado: {finalPlan.name}
            </CardTitle>
            <CardDescription>
              Com base nas suas respostas, acreditamos que o plano {finalPlan.name} é a melhor opção para sua empresa.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {plans.map(plan => (
                <Card 
                  key={plan.id} 
                  className={`border ${plan.id === finalPlan.id ? 'ring-2 ring-primary' : ''}`}
                >
                  <CardHeader className={`${plan.tailwindColor} ${plan.textColor} rounded-t-lg`}>
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-sm">{plan.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Respostas que definiram o resultado:</h3>
              {Object.entries(selectedOptions).map(([questionId, optionId]) => {
                const question = questions.find(q => q.id === questionId);
                const option = question?.options.find(o => o.id === optionId);
                return (
                  <div key={questionId} className="pl-4 border-l-2 border-muted">
                    <p className="font-medium">{question?.text}</p>
                    <p className="text-sm text-muted-foreground">{option?.text}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleReset} variant="outline" className="w-full">
              Refazer Questionário
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div 
      key="quiz"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="max-w-3xl mx-auto"
    >
      <Card>
        <CardHeader>
          <CardTitle>Quiz de Recomendação de Plano</CardTitle>
          <CardDescription>
            Responda algumas perguntas para descobrirmos o plano ideal para sua empresa
          </CardDescription>
          <div className="flex mt-4">
            <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-300 ease-in-out"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Questão {currentQuestionIndex + 1} de {questions.length}
          </p>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">{currentQuestion.text}</h3>
                  {currentQuestion.helpText && (
                    <p className="text-sm text-muted-foreground">{currentQuestion.helpText}</p>
                  )}
                </div>
                
                <RadioGroup 
                  value={selectedOptions[currentQuestion.id] || ""}
                  onValueChange={(value) => handleOptionSelect(currentQuestion.id, value)}
                  className="space-y-3"
                >
                  {currentQuestion.options.map((option) => (
                    <div 
                      key={option.id}
                      className="flex items-center space-x-2 border rounded-lg p-4 hover:border-primary cursor-pointer"
                      onClick={() => handleOptionSelect(currentQuestion.id, option.id)}
                    >
                      <RadioGroupItem value={option.id} id={option.id} />
                      <label htmlFor={option.id} className="flex-grow cursor-pointer">
                        {option.text}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            onClick={handlePrevious} 
            variant="outline" 
            disabled={currentQuestionIndex === 0}
          >
            <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Anterior
          </Button>
          
          <Button 
            onClick={handleNext} 
            disabled={!isCurrentQuestionAnswered || isLastQuestion}
          >
            Próxima
            <Icon name="ArrowRight" className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>

      {recommendedPlans.length > 0 && !finalPlan && (
        <div className="mt-6 bg-muted/50 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-2">Planos recomendados até agora:</h3>
          <div className="flex flex-wrap gap-2">
            {recommendedPlans.map(planId => {
              const plan = plans.find(p => p.id === planId);
              if (!plan) return null;
              return (
                <div 
                  key={plan.id} 
                  className={`${plan.tailwindColor} ${plan.textColor} px-2 py-1 rounded text-xs`}
                >
                  {plan.name}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PlanQuiz;
