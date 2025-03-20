
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { questions, plans, getPlanRecommendation, suggestUpgrade, PlanType, Plan } from "@/utils/quizData";
import { Icon } from "@/components/Icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const PlanQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [finalPlan, setFinalPlan] = useState<Plan | null>(null);
  const [upgradeRecommendation, setUpgradeRecommendation] = useState<{ 
    suggest: boolean, 
    upgrade: PlanType, 
    reason: string 
  } | null>(null);
  const [mode, setMode] = useState<"quiz" | "result">("quiz");

  // When the final question is answered, show the result
  useEffect(() => {
    if (Object.keys(selectedOptions).length === questions.length) {
      const recommendedPlanId = getPlanRecommendation(selectedOptions);
      const plan = plans.find(p => p.id === recommendedPlanId) || null;
      setFinalPlan(plan);
      
      // Check if upgrade suggestion is applicable
      const upgradeSuggestion = suggestUpgrade(selectedOptions, recommendedPlanId);
      setUpgradeRecommendation(upgradeSuggestion);
      
      setMode("result");
    }
  }, [selectedOptions]);

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
    setFinalPlan(null);
    setUpgradeRecommendation(null);
    setMode("quiz");
  };

  const handleUpgrade = () => {
    if (upgradeRecommendation) {
      const upgradedPlan = plans.find(p => p.id === upgradeRecommendation.upgrade) || null;
      setFinalPlan(upgradedPlan);
      setUpgradeRecommendation(null);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isCurrentQuestionAnswered = selectedOptions[currentQuestion?.id];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  // Get icon based on plan ID
  const getPlanIcon = (planId: PlanType) => {
    switch (planId) {
      case 'together':
        return 'Users';
      case 'essential':
        return 'Zap';
      case 'advanced':
        return 'Settings';
      case 'premier':
        return 'Crown';
      default:
        return 'Star';
    }
  };

  // Get emoji based on plan ID
  const getPlanEmoji = (planId: PlanType) => {
    switch (planId) {
      case 'together':
        return '🚀';
      case 'essential':
        return '⚡';
      case 'advanced':
        return '🔧';
      case 'premier':
        return '🚀';
      default:
        return '✨';
    }
  };

  if (mode === "result" && finalPlan) {
    return (
      <motion.div
        key="result"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
        className="max-w-4xl mx-auto space-y-6"
      >
        <Card className="border-t-4" style={{ borderTopColor: finalPlan.color }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Icon name="Check" className="w-6 h-6 text-green-500" />
              Seu plano recomendado: {finalPlan.name}
            </CardTitle>
            <CardDescription className="text-lg">
              {getPlanEmoji(finalPlan.id)} {finalPlan.tagline}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {upgradeRecommendation && (
              <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                <h3 className="font-medium text-orange-800 flex items-center gap-2">
                  <Icon name="AlertTriangle" className="w-5 h-5" />
                  Sugestão de upgrade
                </h3>
                <p className="mt-2 text-orange-700">{upgradeRecommendation.reason}</p>
                <Button 
                  variant="outline"
                  onClick={handleUpgrade}
                  className="mt-2 border-orange-300 text-orange-700 hover:bg-orange-100"
                >
                  Verificar plano {plans.find(p => p.id === upgradeRecommendation.upgrade)?.name}
                </Button>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {plans.map(plan => (
                <Card 
                  key={plan.id} 
                  className={`border shadow-sm ${plan.id === finalPlan.id ? 'ring-2 ring-primary shadow-md' : ''}`}
                >
                  <CardHeader className={`${plan.tailwindColor} ${plan.textColor} rounded-t-lg py-3`}>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Icon name={getPlanIcon(plan.id)} className="w-4 h-4" />
                      {plan.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-3 pb-3 text-xs">
                    <p>{plan.description}</p>
                    {plan.id === finalPlan.id && (
                      <Badge variant="outline" className="mt-2 bg-primary/10">Recomendado</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="what-included">
                <AccordionTrigger className="text-lg font-medium">
                  <div className="flex items-center gap-2">
                    <Icon name="Check" className="w-5 h-5 text-green-500" />
                    O que está incluso?
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pl-7">
                    {finalPlan.included.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-green-500 font-bold inline-block mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="what-not-included">
                <AccordionTrigger className="text-lg font-medium">
                  <div className="flex items-center gap-2">
                    <Icon name="X" className="w-5 h-5 text-red-500" />
                    O que NÃO está incluso?
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pl-7">
                    {finalPlan.notIncluded.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-red-500 font-bold inline-block mt-0.5">✗</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="for-who">
                <AccordionTrigger className="text-lg font-medium">
                  <div className="flex items-center gap-2">
                    <Icon name="Target" className="w-5 h-5 text-blue-500" />
                    Para quem é o {finalPlan.name}?
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pl-7">
                    {finalPlan.forWho.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-blue-500 font-bold inline-block mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="example">
                <AccordionTrigger className="text-lg font-medium">
                  <div className="flex items-center gap-2">
                    <Icon name="Lightbulb" className="w-5 h-5 text-yellow-500" />
                    Exemplo de cliente
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="pl-7 text-sm">{finalPlan.example}</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="answers">
                <AccordionTrigger className="text-lg font-medium">
                  <div className="flex items-center gap-2">
                    <Icon name="ListChecks" className="w-5 h-5 text-indigo-500" />
                    Respostas que definiram o resultado
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    {Object.entries(selectedOptions).map(([questionId, optionId]) => {
                      const question = questions.find(q => q.id === questionId);
                      const option = question?.options.find(o => o.id === optionId);
                      return (
                        <div key={questionId} className="pl-7 border-l-2 border-indigo-100">
                          <p className="font-medium text-sm">{question?.text}</p>
                          <p className="text-sm text-muted-foreground">{option?.text}</p>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          
          <CardFooter className="flex gap-3">
            <Button onClick={handleReset} variant="outline" className="w-full">
              Refazer Questionário
            </Button>
            <Button className="w-full">
              Falar com um consultor
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
    </motion.div>
  );
};

export default PlanQuiz;
