
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MissionType,
  Mission,
  Module,
  modules,
  missions,
  calculateModuleCost,
} from "@/utils/calculatorData";
import MissionSelector from "@/components/MissionSelector";
import ModuleCard from "@/components/ModuleCard";
import PriceBreakdown from "@/components/PriceBreakdown";
import AnimatedNumber from "@/components/AnimatedNumber";
import { Icon } from "@/components/Icon";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MissionsModulesInfo from "@/components/MissionsModulesInfo";
import PlanQuizButton from "@/components/PlanQuizButton";
import MissionQuizButton from '@/components/MissionQuizButton';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import logo from "../components/images/nuvme-logo.png";

interface SelectedModule {
  module: Module;
  quantity: number;
  complexity?: "simple" | "complex" | "very_complex";
  selectedServices?: string[];
  databaseSize?: "small" | "medium" | "large";
}

const monthlyPlans = [
  {
    id: "together",
    name: "Together",
    description:
      "Para empresas que querem crescer na AWS, mas não precisam de suporte técnico contínuo",
    color: "#B2D4E8",
    bgColor: "bg-blue-100",
    iconBg: "bg-blue-200",
    icon: "Users",
    highlights: [
      "Faturamento AWS via Reais",
      "Monitoramento e Alertas",
      "Gerente de Contas",
      "Laboratório de Inovação (PoCs)",
      "Relatórios de Custos",
    ],
    emoji: "🚀",
  },
  {
    id: "essential",
    name: "Essential",
    description: "Suporte contínuo e resolução ativa de problemas",
    color: "#00C7B1",
    bgColor: "bg-nuvme-light-teal",
    iconBg: "bg-nuvme-teal",
    icon: "Zap",
    highlights: [
      "Tudo do Together +",
      "Suporte Técnico Ilimitado via Ticket",
      "Suporte via WhatsApp",
      "Auxílio Operacional",
      "Abertura de Chamados",
    ],
    emoji: "⚡",
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "Otimização contínua com Squad DevOps",
    color: "#0074BB",
    bgColor: "bg-blue-50",
    iconBg: "bg-blue-500",
    icon: "Settings",
    highlights: [
      "Tudo do Essential +",
      "Squad DevOps Dedicado",
      "Suporte Avançado a Banco de Dados",
      "Suporte a Pipelines CI/CD",
      "FinOps Avançado",
      "Eventos de Segurança",
    ],
    emoji: "🔧",
  },
  {
    id: "premier",
    name: "Premier",
    description: "Alto desempenho, segurança máxima e suporte personalizado",
    color: "#7E69AB",
    bgColor: "bg-purple-50",
    iconBg: "bg-purple-500",
    icon: "Crown",
    highlights: [
      "Tudo do Advanced +",
      "Observabilidade Avançada",
      "Performance Tuning",
      "Avaliação Arquitetural Completa",
      "Workshops",
      "Suporte Personalizado",
    ],
    emoji: "👑",
  },
];

const Index = () => {
  const [selectedMission, setSelectedMission] = useState<MissionType | null>(
    null
  );
  const [selectedModules, setSelectedModules] = useState<SelectedModule[]>([]);
  const [filteredModules, setFilteredModules] = useState<Module[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [internalMode, setInternalMode] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    if (selectedMission) {
      let newFilteredModules = modules.filter((module) =>
        module.missions.includes(selectedMission)
      );

      if (selectedMission === "modernization") {
        const orderMap = {
          cicd: 1,
          container: 2,
          database: 3,
          gitops: 4,
          kubernetes: 5,
          karpenter: 6,
          arquitetura: 7,
          faturamento: 8,
          painel_nuvme: 9,
        };

        newFilteredModules.sort((a, b) => {
          return (orderMap[a.id] || 100) - (orderMap[b.id] || 100);
        });
      }

      setFilteredModules(newFilteredModules);
    } else {
      setFilteredModules([]);
    }
  }, [selectedMission]);

  useEffect(() => {
    let newTotalPrice = 0;

    for (const selected of selectedModules) {
      if (selected.module.id === "database" && selected.selectedServices) {
        let basePrice = 0;

        selected.selectedServices.forEach((serviceId) => {
          const service = selected.module.availableServices?.find(
            (s) => s.id === serviceId
          );
          if (service && service.price) {
            basePrice += service.price;
          }
        });

        if (selected.databaseSize) {
          let sizeMultiplier = 1;
          switch (selected.databaseSize) {
            case "small":
              sizeMultiplier = 1;
              break;
            case "medium":
              sizeMultiplier = 1.5;
              break;
            case "large":
              sizeMultiplier = 2;
              break;
          }
          newTotalPrice += basePrice * sizeMultiplier;
        } else {
          newTotalPrice += basePrice;
        }
      } else if (
        selected.module.id === "skyguard" &&
        selected.selectedServices
      ) {
        newTotalPrice +=
          selected.module.custoBase + selected.selectedServices.length * 5500;
      } else if (
        [
          "security_practices", 
          "security_hub", 
          "disaster_recovery", 
          "conta_cofre",
          "arquitetura"
        ].includes(selected.module.id) &&
        selected.complexity
      ) {
        let complexityFactor = 1;
        switch (selected.complexity) {
          case "simple":
            complexityFactor = 1;
            break;
          case "complex":
            complexityFactor = 1.7;
            break;
          case "very_complex":
            complexityFactor = 2.9;
            break;
        }
        newTotalPrice += selected.module.custoBase * complexityFactor;
      } else if (
        ["observability", "ia", "ml", "serverless"].includes(
          selected.module.id
        ) &&
        selected.complexity
      ) {
        let complexityFactor = 1;
        switch (selected.complexity) {
          case "simple":
            complexityFactor = 0.8;
            break; // 20% lower
          case "complex":
            complexityFactor = 1;
            break; // base price
          case "very_complex":
            complexityFactor = 1.4;
            break; // 40% higher
        }
        newTotalPrice += selected.module.custoBase * complexityFactor;
      } else {
        newTotalPrice += calculateModuleCost(
          selected.module,
          selected.quantity
        );
      }
    }

    setTotalPrice(newTotalPrice);
  }, [selectedModules]);

  const handleSelectMission = (mission: MissionType) => {
    setSelectedMission(mission);
  };

  const handleSelectModule = (
    module: Module,
    quantity: number,
    complexity?: "simple" | "complex" | "very_complex",
    selectedServices?: string[],
    databaseSize?: "small" | "medium" | "large"
  ) => {
    setSelectedModules((prev) => {
      if (
        module.id === "cicd" &&
        prev.some((item) => item.module.id === "gitops")
      ) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "CI/CD não pode ser selecionado junto com GitOps",
        });
        return prev;
      }
      if (
        module.id === "gitops" &&
        prev.some((item) => item.module.id === "cicd")
      ) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "GitOps não pode ser selecionado junto com CI/CD",
        });
        return prev;
      }

      const exists = prev.find((item) => item.module.id === module.id);
      if (exists) {
        return prev.map((item) =>
          item.module.id === module.id
            ? { ...item, quantity, complexity, selectedServices, databaseSize }
            : item
        );
      } else {
        return [
          ...prev,
          { module, quantity, complexity, selectedServices, databaseSize },
        ];
      }
    });
  };

  const handleDeselectModule = (moduleId: string) => {
    setSelectedModules((prev) =>
      prev.filter((item) => item.module.id !== moduleId)
    );
  };

  const handleReset = () => {
    setSelectedMission(null);
    setSelectedModules([]);
  };

  const getCurrentMission = (): Mission | null => {
    if (!selectedMission) return null;
    return missions.find((m) => m.id === selectedMission) || null;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-nuvme-gray to-white px-4 py-10 md:py-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto space-y-10"
      >
        <motion.div variants={itemVariants} className="text-center">
          <motion.img
            variants={itemVariants}
            src={logo}
            alt="Nuvme Logo"
            className="mx-auto w-40 mb-4"
          />
          <h1 className="text-4xl md:text-5xl font-semibold text-nuvme-dark mb-4">
            Guia Nuvme
          </h1>
          <p className="text-lg text-nuvme-dark-gray max-w-3xl mx-auto">
            Descubra os planos e serviços perfeitos para o seu negócio
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-16">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Nossos Planos Mensais
          </h2>

          <div className="flex justify-center mb-8">
            <PlanQuizButton />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {monthlyPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${plan.bgColor} border-t-4`}
                style={{ borderTopColor: plan.color }}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div
                      className={`w-10 h-10 ${plan.iconBg} rounded-full flex items-center justify-center text-white`}
                    >
                      <Icon name={plan.icon} className="w-5 h-5" />
                    </div>
                    <span className="text-2xl">{plan.emoji}</span>
                  </div>
                  <CardTitle className="mt-3">{plan.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 mt-4">
                    {plan.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-green-500 font-bold inline-block mt-0.5">
                          ✓
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <MissionsModulesInfo />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16 text-center border-t border-gray-200 pt-10"
        >
          <h2 className="text-xl font-semibold mb-6">Modo Interno</h2>

          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="internal-mode"
                checked={internalMode}
                onCheckedChange={setInternalMode}
              />
              <Label
                htmlFor="internal-mode"
                className="text-sm cursor-pointer flex items-center gap-1"
              >
                <Icon name="Eye" className="w-4 h-4" />
                Modo Interno
              </Label>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {internalMode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <h3 className="font-medium text-lg mb-6">
                      Calculadora de Preço - Missões e Módulos
                    </h3>
                    
                    <div className="flex justify-center mb-6">
                      <MissionQuizButton />
                    </div>
                    
                    <MissionSelector
                      missions={missions}
                      selectedMission={selectedMission}
                      onSelectMission={handleSelectMission}
                    />

                    {selectedMission && (
                      <div className="mt-8">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-lg font-medium">
                            Módulos Disponíveis
                          </h2>
                          <button
                            onClick={handleReset}
                            className="inline-flex items-center text-sm text-muted-foreground hover:text-nuvme-teal transition-colors"
                          >
                            <Icon name="RotateCcw" className="w-3 h-3 mr-1" />
                            Reiniciar
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {filteredModules.map((module) => (
                            <ModuleCard
                              key={module.id}
                              module={module}
                              isSelected={selectedModules.some(
                                (item) => item.module.id === module.id
                              )}
                              onSelect={handleSelectModule}
                              onDeselect={handleDeselectModule}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="w-full lg:w-80 shrink-0">
                    <PriceBreakdown
                      selectedMission={getCurrentMission()}
                      selectedModules={selectedModules}
                      totalPrice={totalPrice}
                    />
                  </div>
                </div>

                {!selectedMission && (
                  <div className="mt-12 text-center">
                    <div className="inline-block p-4 rounded-full bg-nuvme-light-teal animate-float">
                      <Icon
                        name="MousePointerClick"
                        className="w-8 h-8 text-nuvme-teal"
                      />
                    </div>
                    <p className="mt-4 text-muted-foreground">
                      Selecione uma missão para começar seu cálculo de preço
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
