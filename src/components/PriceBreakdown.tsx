
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SelectedModule, formatCurrency, HOURLY_RATE, Mission, modules, missions } from "@/utils/calculatorData";
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

const monthlyPlans = [
  {
    id: 'essential',
    name: 'Essential',
    monthlyPrice: 3000,
    setupPrice: 6000,
    description: 'Módulo arquitetura + um módulo de escolha',
    includedModules: 2, // arquitetura + 1 módulo
  },
  {
    id: 'advanced',
    name: 'Advanced',
    monthlyPrice: 6000,
    setupPrice: 7500,
    description: 'Módulo arquitetura + dois módulos de escolha',
    includedModules: 3, // arquitetura + 2 módulos
  },
  {
    id: 'premier',
    name: 'Premier',
    monthlyPrice: 12000,
    setupPrice: 15000,
    description: 'Módulo arquitetura + três módulos de escolha',
    includedModules: 4, // arquitetura + 3 módulos
  },
];

const PriceBreakdown: React.FC<PriceBreakdownProps> = ({
  selectedMission,
  selectedModules,
  totalPrice,
}) => {
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

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
    
    if (['security_practices', 'security_hub', 'disaster_recovery', 'conta_cofre', 'arquitetura'].includes(module.id) && complexity) {
      let complexityFactor = 1;
      switch (complexity) {
        case 'simple': complexityFactor = 1; break;
        case 'complex': complexityFactor = 1.7; break;
        case 'very_complex': complexityFactor = 2.9; break;
      }
      return module.custoBase * complexityFactor;
    }
    
    if (['observability', 'ia', 'ml', 'serverless'].includes(module.id) && complexity) {
      let complexityFactor = 1;
      switch (complexity) {
        case 'simple': complexityFactor = 0.8; break; // 20% lower
        case 'complex': complexityFactor = 1; break;  // base price
        case 'very_complex': complexityFactor = 1.4; break; // 40% higher
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

  const getMissionForModule = (moduleId: string): string => {
    const module = modules.find(m => m.id === moduleId);
    if (!module) return '';
    
    const missionNames = module.missions.map(id => {
      const mission = missions.find(m => m.id === id);
      return mission ? mission.name : '';
    });
    
    return missionNames[0] || '';
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

  // Calcular preço considerando módulos incluídos no plano
  const calculateFinalPrice = () => {
    const plan = monthlyPlans.find(p => p.id === selectedPlan);
    
    if (!plan) {
      // Sem plano: apenas soma dos módulos - desconto
      const discountAmount = (totalPrice * discountPercentage) / 100;
      return totalPrice - discountAmount;
    }
    
    // Com plano: setup + módulos extras (acima do incluído)
    const totalModules = selectedModules.length;
    const includedCount = plan.includedModules;
    
    if (totalModules <= includedCount) {
      // Todos os módulos estão incluídos no plano
      const discountAmount = (plan.setupPrice * discountPercentage) / 100;
      return plan.setupPrice - discountAmount;
    }
    
    // Há módulos extras: calcular preço apenas dos módulos que excedem o incluído
    const extraModules = selectedModules.slice(includedCount);
    let extraModulesPrice = 0;
    
    extraModules.forEach(selected => {
      extraModulesPrice += getModulePrice(selected);
    });
    
    const subtotal = plan.setupPrice + extraModulesPrice;
    const discountAmount = (subtotal * discountPercentage) / 100;
    return subtotal - discountAmount;
  };

  const finalPrice = calculateFinalPrice();
  const plan = monthlyPlans.find(p => p.id === selectedPlan);
  const includedModulesCount = plan?.includedModules || 0;
  const totalModulesCount = selectedModules.length;
  const extraModulesCount = Math.max(0, totalModulesCount - includedModulesCount);

  return (
    <AnimatePresence>
      <motion.div
        key="price-breakdown"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
        className="glass rounded-2xl border border-nuvme-teal/10 p-6 shadow-sm sticky top-4"
      >
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-nuvme-teal/20 flex items-center justify-center mr-3">
            <Icon name="Calculator" className="w-4 h-4 text-nuvme-teal" />
          </div>
          <h3 className="text-lg font-medium">Resumo do Projeto</h3>
        </div>

        <Separator className="mb-4" />

        {selectedModules.length > 0 ? (
          <div className="space-y-3 mb-6">
            {selectedModules.map((selected, index) => {
              const isIncluded = selectedPlan && index < includedModulesCount;
              return (
                <motion.div
                  key={selected.module.id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={itemVariants}
                  className="flex justify-between items-start"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {selected.module.name}
                      {isIncluded && (
                        <span className="ml-2 text-xs text-green-600 font-normal">
                          (Incluso no plano)
                        </span>
                      )}
                    </p>
                    <div className="flex flex-col gap-0.5">
                      {getModuleDetails(selected) && (
                        <p className="text-xs text-muted-foreground">
                          {getModuleDetails(selected)}
                        </p>
                      )}
                      <p className="text-xs text-nuvme-teal">
                        {getMissionForModule(selected.module.id)}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm font-medium ml-4 text-right">
                    {isIncluded ? (
                      <span className="text-green-600">R$ 0</span>
                    ) : (
                      formatCurrency(getModulePrice(selected))
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="mb-6 text-center py-4">
            <p className="text-sm text-muted-foreground">
              {selectedPlan 
                ? "Plano selecionado. Adicione módulos ou finalize apenas com o plano."
                : "Selecione módulos ou um plano mensal para calcular o preço."}
            </p>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-border">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="monthly-plan">Plano Mensal (Opcional)</Label>
              <select
                id="monthly-plan"
                value={selectedPlan || ''}
                onChange={(e) => setSelectedPlan(e.target.value || null)}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Nenhum</option>
                {monthlyPlans.map(plan => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} - {formatCurrency(plan.monthlyPrice)}/mês
                  </option>
                ))}
              </select>
              {selectedPlan && (
                <p className="text-xs text-muted-foreground mt-1">
                  {monthlyPlans.find(p => p.id === selectedPlan)?.description}
                </p>
              )}
            </div>

            {selectedPlan && (
              <>
                <div className="flex justify-between items-center text-sm">
                  <span>Setup do Plano</span>
                  <span className="font-medium">{formatCurrency(plan?.setupPrice || 0)}</span>
                </div>
                
                {extraModulesCount > 0 && (
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{extraModulesCount} módulo(s) extra(s)</span>
                    <span>{formatCurrency(selectedModules.slice(includedModulesCount).reduce((sum, m) => sum + getModulePrice(m), 0))}</span>
                  </div>
                )}
              </>
            )}

            {!selectedPlan && selectedModules.length > 0 && (
              <div className="flex justify-between items-center">
                <span className="font-medium">Subtotal Módulos</span>
                <AnimatedNumber 
                  value={totalPrice} 
                  formatter={formatCurrency} 
                  className="text-lg font-semibold text-nuvme-blue"
                  duration={800}
                />
              </div>
            )}

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

            <div className="flex justify-between items-center pt-2 border-t">
              <span className="font-medium">Preço Total Final</span>
              <AnimatedNumber 
                value={finalPrice} 
                formatter={formatCurrency} 
                className="text-xl font-bold text-nuvme-blue"
                duration={800}
              />
            </div>

            {selectedPlan && (
              <div className="mt-2 p-3 bg-nuvme-teal/10 rounded-lg">
                <p className="text-xs text-muted-foreground">
                  + {formatCurrency(plan?.monthlyPrice || 0)}/mês de suporte
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PriceBreakdown;
