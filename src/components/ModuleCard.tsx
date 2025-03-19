
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Module, calculateModuleCost, formatCurrency } from "@/utils/calculatorData";
import { Icon } from "@/components/Icon";
import { Separator } from "@/components/ui/separator";

interface ModuleCardProps {
  module: Module;
  isSelected: boolean;
  onSelect: (module: Module, quantity: number) => void;
  onDeselect: (moduleId: string) => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  isSelected,
  onSelect,
  onDeselect,
}) => {
  const [quantity, setQuantity] = useState<number>(module.defaultValue || 1);
  const [showInfo, setShowInfo] = useState(false);
  
  const handleQuantityChange = (newValue: number) => {
    const value = Math.max(
      module.minValue || 1,
      Math.min(module.maxValue || 100, newValue)
    );
    setQuantity(value);
    if (isSelected) {
      onSelect(module, value);
    }
  };

  const toggleModule = () => {
    if (isSelected) {
      onDeselect(module.id);
    } else {
      onSelect(module, quantity);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className={cn(
        "rounded-xl p-5 border transition-all duration-300",
        isSelected 
          ? "border-nuvme-blue shadow-sm bg-white" 
          : "border-border bg-white hover:border-muted-foreground/30"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            isSelected ? "bg-nuvme-blue text-white" : "bg-secondary text-nuvme-dark"
          )}>
            <Icon name={module.icon || "Package"} className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center">
              <h3 className="font-medium text-base">{module.name}</h3>
              <button 
                onClick={() => setShowInfo(!showInfo)}
                className="ml-2 text-muted-foreground hover:text-nuvme-blue focus:outline-none focus:text-nuvme-blue transition-colors"
              >
                <Icon name="Info" className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {showInfo ? module.description : `Preço base: ${formatCurrency(module.custoBase)}`}
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <button
            onClick={toggleModule}
            className={cn(
              "w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200",
              isSelected
                ? "bg-nuvme-blue text-white hover:bg-nuvme-dark-blue"
                : "border border-muted-foreground/30 hover:border-nuvme-blue"
            )}
          >
            <Icon 
              name={isSelected ? "Check" : "Plus"} 
              className="w-3 h-3" 
            />
          </button>
        </div>
      </div>

      {isSelected && (
        <>
          <Separator className="my-4" />
          <div className="mt-3">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">
                {module.variableUnit.charAt(0).toUpperCase() + module.variableUnit.slice(1)}
              </label>
              <span className="text-sm font-medium">
                {formatCurrency(calculateModuleCost(module, quantity))}
              </span>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= (module.minValue || 1)}
                className={cn(
                  "w-8 h-8 rounded-md flex items-center justify-center",
                  "border border-border transition-colors",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "hover:border-nuvme-blue/50"
                )}
              >
                <Icon name="Minus" className="w-3 h-3" />
              </button>
              
              <div className="flex-1 mx-3">
                <input
                  type="range"
                  min={module.minValue || 1}
                  max={module.maxValue || 100}
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                  className="w-full h-2 appearance-none bg-secondary rounded-full outline-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #0EA5E9 0%, #0EA5E9 ${
                      ((quantity - (module.minValue || 1)) / ((module.maxValue || 100) - (module.minValue || 1))) * 100
                    }%, #e2e8f0 ${
                      ((quantity - (module.minValue || 1)) / ((module.maxValue || 100) - (module.minValue || 1))) * 100
                    }%, #e2e8f0 100%)`
                  }}
                />
              </div>
              
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= (module.maxValue || 100)}
                className={cn(
                  "w-8 h-8 rounded-md flex items-center justify-center",
                  "border border-border transition-colors",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "hover:border-nuvme-blue/50"
                )}
              >
                <Icon name="Plus" className="w-3 h-3" />
              </button>
              
              <div className="ml-3 w-12 text-center">
                <span className="text-sm font-medium">{quantity}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ModuleCard;
