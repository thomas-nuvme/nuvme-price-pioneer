
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
import { Link } from "react-router-dom";

const PlanQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [finalPlan, setFinalPlan] = useState<Plan | null>(null);
  const [selectedPlanTab, setSelectedPlanTab] = useState<PlanType | null>(null);
  const [upgradeRecommendation, setUpgradeRecommendation] = useState<{ 
    suggest: boolean, 
    upgrade: PlanType, 
    reason: string 
  } | null>(null);
  const [mode, setMode] = useState<"quiz" | "result">("quiz");

  useEffect(() => {
    if (Object.keys(selectedOptions).length === questions.length && mode === "quiz") {
      calculateRecommendation();
    }
  }, [selectedOptions, mode]);

  const calculateRecommendation = () => {
    const recommendedPlanId = getPlanRecommendation(selectedOptions);
    const plan = plans.find(p => p.id === recommendedPlanId) || null;
    setFinalPlan(plan);
    setSelectedPlanTab(recommendedPlanId);
    
    const upgradeSuggestion = suggestUpgrade(selectedOptions, recommendedPlanId);
    setUpgradeRecommendation(upgradeSuggestion);
    
    setMode("result");
  };

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
    setSelectedPlanTab(null);
    setUpgradeRecommendation(null);
    setMode("quiz");
  };

  const handleUpgrade = () => {
    if (upgradeRecommendation) {
      const upgradedPlan = plans.find(p => p.id === upgradeRecommendation.upgrade) || null;
      setFinalPlan(upgradedPlan);
      setSelectedPlanTab(upgradeRecommendation.upgrade);
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

  const getPlanEmoji = (planId: PlanType) => {
    switch (planId) {
      case 'together':
        return '🚀';
      case 'essential':
        return '⚡';
      case 'advanced':
        return '🔧';
      case 'premier':
        return '👑';
      default:
        return '✨';
    }
  };

  if (mode === "result" && finalPlan) {
    const displayPlan = selectedPlanTab 
      ? plans.find(p => p.id === selectedPlanTab) || finalPlan 
      : finalPlan;
    
    return (
      <motion.div
        key="result"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
        className="max-w-4xl mx-auto space-y-6 my-12"
      >
        <div className="flex justify-between items-center mb-6">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <Icon name="ArrowLeft" className="w-4 h-4" />
              Voltar para página inicial
            </Button>
          </Link>
          <Link to="/">
            <img 
              src="/src/components/images/nuvme-logo.png" 
              alt="Nuvme Logo" 
              className="w-40"
            />
          </Link>
        </div>

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
            
            <Tabs 
              value={selectedPlanTab || finalPlan.id} 
              onValueChange={(value) => setSelectedPlanTab(value as PlanType)}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 w-full">
                {plans.map(plan => (
                  <TabsTrigger 
                    key={plan.id} 
                    value={plan.id}
                    className={`${plan.id === finalPlan.id ? 'font-medium' : ''}`}
                  >
                    <div className="flex items-center gap-1">
                      <Icon name={getPlanIcon(plan.id)} className="w-4 h-4" />
                      <span>{plan.name}</span>
                      {plan.id === finalPlan.id && (
                        <Badge variant="outline" className="ml-1 px-1 py-0 text-xs bg-primary/10">
                          Recomendado
                        </Badge>
                      )}
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {plans.map(plan => (
                <TabsContent key={plan.id} value={plan.id} className="pt-4">
                  <Card>
                    <CardHeader className={`${plan.tailwindColor} ${plan.textColor} rounded-t-lg`}>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name={getPlanIcon(plan.id)} className="w-5 h-5" />
                        {getPlanEmoji(plan.id)} {plan.name} – {plan.tagline}
                      </CardTitle>
                      <CardDescription className={plan.textColor}>
                        {plan.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-6 pb-4 space-y-6">
                      <div>
                        <h3 className="text-lg font-medium flex items-center gap-2 mb-3">
                          <Icon name="Check" className="w-5 h-5 text-green-500" />
                          O que está incluso?
                        </h3>
                        <ul className="space-y-2 ml-7">
                          {plan.included.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <span className="text-green-500 font-bold inline-block mt-0.5">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium flex items-center gap-2 mb-3">
                          <Icon name="X" className="w-5 h-5 text-red-500" />
                          O que NÃO está incluso?
                        </h3>
                        <ul className="space-y-2 ml-7">
                          {plan.notIncluded.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <span className="text-red-500 font-bold inline-block mt-0.5">✗</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium flex items-center gap-2 mb-3">
                          <Icon name="Target" className="w-5 h-5 text-blue-500" />
                          Para quem é o {plan.name}?
                        </h3>
                        <ul className="space-y-2 ml-7">
                          {plan.forWho.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <span className="text-blue-500 font-bold inline-block mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium flex items-center gap-2 mb-3">
                          <Icon name="Lightbulb" className="w-5 h-5 text-yellow-500" />
                          Exemplo de cliente
                        </h3>
                        <p className="text-sm ml-7">{plan.example}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
            
            <Accordion type="single" collapsible className="w-full">
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
                          <div className="text-sm text-muted-foreground">
                            <span>{option?.text}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <Button onClick={handleReset} variant="outline" className="w-full max-w-sm">
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
      className="max-w-3xl mx-auto my-12 px-4"
    >
      <div className="flex justify-center mb-6">
        <Link to="/">
          <img 
            src="/src/components/images/nuvme-logo.png" 
            alt="Nuvme Logo" 
            className="w-40 mb-4"
          />
        </Link>
      </div>
      
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
