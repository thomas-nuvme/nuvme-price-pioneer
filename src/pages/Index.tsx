import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MissionType, 
  Mission, 
  Module, 
  missions, 
  modules, 
  calculateModuleCost 
} from "@/utils/calculatorData";
import MissionSelector from "@/components/MissionSelector";
import ModuleCard from "@/components/ModuleCard";
import PriceBreakdown from "@/components/PriceBreakdown";
import AnimatedNumber from "@/components/AnimatedNumber";
import { Icon } from "@/components/Icon";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Define a new type for selected modules
interface SelectedModule {
  module: Module;
  quantity: number;
  complexity?: 'easy' | 'moderate' | 'complex';
  selectedServices?: string[];
}

const Index = () => {
  const [selectedMission, setSelectedMission] = useState<MissionType | null>(null);
  const [selectedModules, setSelectedModules] = useState<SelectedModule[]>([]);
  const [filteredModules, setFilteredModules] = useState<Module[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (selectedMission) {
      const newFilteredModules = modules.filter((module) =>
        module.missions.includes(selectedMission)
      );
      setFilteredModules(newFilteredModules);
      
      const validSelectedModules = selectedModules.filter(
        (selected) => selected.module.missions.includes(selectedMission)
      );
      setSelectedModules(validSelectedModules);
    } else {
      setFilteredModules([]);
      setSelectedModules([]);
    }
  }, [selectedMission]);

  useEffect(() => {
    let newTotalPrice = 0;
    
    for (const selected of selectedModules) {
      if (selected.module.id === 'skyguard' && selected.selectedServices) {
        // SkyGuard with services
        newTotalPrice += selected.module.custoBase + (selected.selectedServices.length * 5500);
      } else if (['security_practices', 'security_hub', 'disaster_recovery', 'conta_cofre'].includes(selected.module.id) && selected.complexity) {
        // Security modules with complexity
        let complexityFactor = 1;
        switch (selected.complexity) {
          case 'easy': complexityFactor = 1; break;
          case 'moderate': complexityFactor = 1.7; break;
          case 'complex': complexityFactor = 2.9; break;
        }
        newTotalPrice += selected.module.custoBase * complexityFactor;
      } else {
        // Standard modules
        newTotalPrice += calculateModuleCost(selected.module, selected.quantity);
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
    complexity?: 'easy' | 'moderate' | 'complex',
    selectedServices?: string[]
  ) => {
    setSelectedModules((prev) => {
      const exists = prev.find((item) => item.module.id === module.id);
      if (exists) {
        return prev.map((item) =>
          item.module.id === module.id 
            ? { ...item, quantity, complexity, selectedServices } 
            : item
        );
      } else {
        return [...prev, { module, quantity, complexity, selectedServices }];
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1 
      } 
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
            src="src/components/images/nuvme-logo.png" 
            alt="Nuvme Logo" 
            className="mx-auto w-40 mb-4"
          />
          <h1 className="text-4xl md:text-5xl font-semibold text-nuvme-dark mb-4">
            Guia Nuvme
          </h1>
          <p className="text-lg text-nuvme-dark-gray max-w-3xl mx-auto">
            Selecione sua missão e módulos para obter um preço estimado para seu projeto
          </p>
          
          <motion.div 
            variants={itemVariants}
            className="mt-6"
          >
            <Link to="/plano">
              <Button className="bg-nuvme-teal hover:bg-nuvme-teal/90">
                <Icon name="HelpCircle" className="w-4 h-4 mr-2" />
                Ajuda para escolher seu plano mensal
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <MissionSelector
            missions={missions}
            selectedMission={selectedMission}
            onSelectMission={handleSelectMission}
          />
        </motion.div>

        <AnimatePresence mode="wait">
          {selectedMission && (
            <motion.div
              key="modules-section"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 order-2 lg:order-1">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-medium">Módulos Disponíveis</h2>
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

                <div className="w-full lg:w-80 order-1 lg:order-2 shrink-0">
                  <PriceBreakdown
                    selectedMission={getCurrentMission()}
                    selectedModules={selectedModules}
                    totalPrice={totalPrice}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!selectedMission && (
          <motion.div 
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <div className="inline-block p-4 rounded-full bg-nuvme-light-teal animate-float">
              <Icon 
                name="MousePointerClick" 
                className="w-8 h-8 text-nuvme-teal" 
              />
            </div>
            <p className="mt-4 text-muted-foreground">
              Selecione uma missão para começar seu cálculo de preço
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Index;
