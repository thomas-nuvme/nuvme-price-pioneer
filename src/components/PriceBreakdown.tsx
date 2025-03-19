
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
        className="glass rounded-2xl border border-nuvme-blue/10 p-6 shadow-sm"
      >
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-nuvme-light-blue flex items-center justify-center mr-3">
            <Icon name={selectedMission.icon} className="w-4 h-4 text-nuvme-blue" />
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
                <p className="text-xs text-muted-foreground">
                  {selected.quantity} {selected.module.variableUnit}
                </p>
              </div>
              <div className="text-sm font-medium">
                {formatCurrency(calculateModuleCost(selected.module, selected.quantity))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-2 pt-2 border-t border-border">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <AnimatedNumber 
              value={totalPrice / (1 + MARGIN_PERCENTAGE)} 
              formatter={formatPrice} 
              className="font-medium"
            />
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Margem ({MARGIN_PERCENTAGE * 100}%)</span>
            <AnimatedNumber 
              value={totalPrice - (totalPrice / (1 + MARGIN_PERCENTAGE))} 
              formatter={formatPrice} 
              className="font-medium"
            />
          </div>
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
          <p className="text-xs text-muted-foreground mt-1">
            Baseado na taxa padrão de R${HOURLY_RATE}/hora
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PriceBreakdown;
