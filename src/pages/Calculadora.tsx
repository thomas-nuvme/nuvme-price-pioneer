import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import { Icon } from "@/components/Icon";
import { useToast } from "@/hooks/use-toast";

interface SelectedModule {
  module: Module;
  quantity: number;
  complexity?: "simple" | "complex" | "very_complex";
  selectedServices?: string[];
  databaseSize?: "small" | "medium" | "large";
}

const Calculadora = () => {
  const [selectedMission, setSelectedMission] = useState<MissionType | null>(null);
  const [selectedModules, setSelectedModules] = useState<SelectedModule[]>([]);
  const [filteredModules, setFilteredModules] = useState<Module[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
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
            break;
          case "complex":
            complexityFactor = 1;
            break;
          case "very_complex":
            complexityFactor = 1.4;
            break;
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

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Calculadora de Valores</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Selecione uma missão e os módulos para calcular o investimento do projeto
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <MissionSelector
              missions={missions}
              selectedMission={selectedMission}
              onSelectMission={handleSelectMission}
            />

            {selectedMission && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium">Módulos Disponíveis</h2>
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
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
            <div className="sticky top-8">
              <PriceBreakdown
                selectedMission={getCurrentMission()}
                selectedModules={selectedModules}
                totalPrice={totalPrice}
              />
            </div>
          </div>
        </div>

        {!selectedMission && (
          <div className="mt-12 text-center">
            <div className="inline-block p-4 rounded-full bg-primary/10 animate-pulse">
              <Icon name="MousePointerClick" className="w-8 h-8 text-primary" />
            </div>
            <p className="mt-4 text-muted-foreground">
              Selecione uma missão para começar
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Calculadora;
