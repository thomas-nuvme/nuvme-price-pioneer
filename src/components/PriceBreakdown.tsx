
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SelectedModule, formatCurrency, HOURLY_RATE, MARGIN_PERCENTAGE, Mission } from "@/utils/calculatorData";
import AnimatedNumber from "@/components/AnimatedNumber";
import { Icon } from "@/components/Icon";
import { Separator } from "@/components/ui/separator";

interface PriceBreakdownProps {
  selectedMission: Mission | null;
  selectedModules: SelectedModule[];
  totalPrice: number;
}

const PriceBreakdown: React.FC<PriceBreakdownProps> = ({
  selectedMission,
  selectedModules,
  totalPrice,
}) => {
  if (!selectedMission || selectedModules.length === 0) {
    return null;
  }

  const formatPrice = (value: number) => formatCurrency(value);

  const getModulePrice = (selected: SelectedModule): number => {
    const { module, quantity, complexity, selectedServices } = selected;
    
    if (module.id === 'skyguard' && selectedServices && selectedServices.length > 0) {
      return module.custoBase + (selectedServices.length * 5500);
    }
    
    if (['security_practices', 'security_hub', 'disaster_recovery', 'conta_cofre'].includes(module.id) && complexity) {
      let complexityFactor = 1;
      switch (complexity) {
        case 'easy': complexityFactor = 1; break;
        case 'moderate': complexityFactor = 1.7; break;
        case 'complex': complexityFactor = 2.9; break;
      }
      return module.custoBase * complexityFactor;
    }
    
    // Handle standard calculation
    return module.custoBase + (module.variableFactor ? module.variableFactor * quantity * HOURLY_RATE : 0);
  };

  const getModuleDetails = (selected: SelectedModule): string => {
    const { module, quantity, complexity, selectedServices } = selected;
    
    if (module.id === 'skyguard' && selectedServices) {
      return `${selectedServices.length} serviços`;
    }
    
    if (['security_practices', 'security_hub', 'disaster_recovery', 'conta_cofre'].includes(module.id) && complexity) {
      return complexity === 'easy' ? 'Fácil' : complexity === 'moderate' ? 'Moderado' : 'Complexo';
    }
    
    if (module.variableFactor && module.variableUnit) {
      return `${quantity} ${module.variableUnit}`;
    }
    
    return '';
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: custom * 0.1, duration: 0.3 },
    }),
  };

  return (
    <AnimatePresence>
      <motion.div
        key="price-breakdown"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
        className="glass rounded-2xl border border-nuvme-teal/10 p-6 shadow-sm"
      >
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-nuvme-teal/20 flex items-center justify-center mr-3">
            <Icon name={selectedMission.icon} className="w-4 h-4 text-nuvme-teal" />
          </div>
          <h3 className="text-lg font-medium">Missão {selectedMission.name}</h3>
        </div>

        <Separator className="mb-4" />

        <div className="space-y-3 mb-6">
          {selectedModules.map((selected, index) => (
            <motion.div
              key={selected.module.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              className="flex justify-between items-center"
            >
              <div>
                <p className="text-sm font-medium">
                  {selected.module.name}
                </p>
                {getModuleDetails(selected) && (
                  <p className="text-xs text-muted-foreground">
                    {getModuleDetails(selected)}
                  </p>
                )}
              </div>
              <div className="text-sm font-medium">
                {formatCurrency(getModulePrice(selected))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="font-medium">Preço Total Estimado</span>
            <AnimatedNumber 
              value={totalPrice} 
              formatter={formatPrice} 
              className="text-lg font-semibold text-nuvme-blue"
              duration={800}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PriceBreakdown;
