import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SelectedModule, formatCurrency, HOURLY_RATE, Mission } from "@/utils/calculatorData";
import AnimatedNumber from "@/components/AnimatedNumber";
import { Icon } from "@/components/Icon";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);

  if (selectedModules.length === 0) {
    return (
      <div className="glass rounded-2xl border border-nuvme-teal/10 p-6 shadow-sm">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-nuvme-teal/20 flex items-center justify-center mr-3">
            <Icon name="Calculator" className="w-4 h-4 text-nuvme-teal" />
          </div>
          <h3 className="text-lg font-medium">Resumo do Projeto</h3>
        </div>
        <p className="text-sm text-muted-foreground">Selecione módulos para calcular o preço do projeto.</p>
      </div>
    );
  }

  const getModulePrice = (selected: SelectedModule): number => {
    const { module, quantity, complexity, selectedServices, databaseSize } = selected;
    
    if (module.id === 'database' && selectedServices && selectedServices.length > 0) {
      let basePrice = 0;
      
      selectedServices.forEach(serviceId => {
        const service = module.availableServices?.find(s => s.id === serviceId);
        if (service && service.price) {
          basePrice += service.price;
        }
      });
      
      if (databaseSize) {
        let sizeMultiplier = 1;
        switch (databaseSize) {
          case 'small': sizeMultiplier = 1; break;
          case 'medium': sizeMultiplier = 1.5; break;
          case 'large': sizeMultiplier = 2; break;
        }
        return basePrice * sizeMultiplier;
      }
      
      return basePrice;
    }
    
    if (module.id === 'skyguard' && selectedServices && selectedServices.length > 0) {
      return module.custoBase + (selectedServices.length * 5500);
    }
    
    if (['security_practices', 'security_hub', 'disaster_recovery', 'conta_cofre'].includes(module.id) && complexity) {
      let complexityFactor = 1;
      switch (complexity) {
        case 'simple': complexityFactor = 1; break;
        case 'complex': complexityFactor = 1.7; break;
        case 'very_complex': complexityFactor = 2.9; break;
      }
      return module.custoBase * complexityFactor;
    }
    
    return module.custoBase + (module.variableFactor ? module.variableFactor * quantity * HOURLY_RATE : 0);
  };

  const getModuleDetails = (selected: SelectedModule): string => {
    const { module, quantity, complexity, selectedServices, databaseSize } = selected;
    
    if (module.id === 'database' && selectedServices) {
      const servicesText = selectedServices.length > 0 
        ? selectedServices.map(id => {
            const service = module.availableServices?.find(s => s.id === id);
            return service?.name;
          }).join(', ') 
        : '';
      
      const sizeText = databaseSize ? 
        (databaseSize === 'small' ? '1-100GB' : 
         databaseSize === 'medium' ? '100-500GB' : 
         '500-1000GB') : '';
         
      return `${servicesText}${sizeText ? ` (${sizeText})` : ''}`;
    }
    
    if (module.id === 'skyguard' && selectedServices) {
      return `${selectedServices.length} serviços`;
    }
    
    if (['security_practices', 'security_hub', 'disaster_recovery', 'conta_cofre'].includes(module.id) && complexity) {
      return complexity === 'simple' ? 'Simples' : complexity === 'complex' ? 'Complexo' : 'Muito Complexo';
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

  const discountAmount = (totalPrice * discountPercentage) / 100;
  const finalPrice = totalPrice - discountAmount;

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
            {selectedMission ? (
              <Icon name={selectedMission.icon} className="w-4 h-4 text-nuvme-teal" />
            ) : (
              <Icon name="Calculator" className="w-4 h-4 text-nuvme-teal" />
            )}
          </div>
          <h3 className="text-lg font-medium">
            {selectedMission ? `Missão ${selectedMission.name}` : 'Resumo do Projeto'}
          </h3>
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
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Subtotal</span>
              <AnimatedNumber 
                value={totalPrice} 
                formatter={formatCurrency} 
                className="text-lg font-semibold text-nuvme-blue"
                duration={800}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="discount">Desconto (%)</Label>
              <Input
                id="discount"
                type="number"
                min="0"
                max="100"
                placeholder="0"
                value={discountPercentage || ''}
                onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {discountPercentage > 0 && (
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Valor do desconto</span>
                <span>{formatCurrency(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between items-center pt-2 border-t">
              <span className="font-medium">Preço Total Final</span>
              <AnimatedNumber 
                value={finalPrice} 
                formatter={formatCurrency} 
                className="text-xl font-bold text-nuvme-blue"
                duration={800}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PriceBreakdown;
