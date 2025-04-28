
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Module, calculateModuleCost, formatCurrency } from "@/utils/calculatorData";
import { Icon } from "@/components/Icon";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ModuleCardProps {
  module: Module;
  isSelected: boolean;
  onSelect: (module: Module, quantity: number, complexity?: 'simple' | 'complex' | 'very_complex', selectedServices?: string[], databaseSize?: 'small' | 'medium' | 'large') => void;
  onDeselect: (moduleId: string) => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  isSelected,
  onSelect,
  onDeselect,
}) => {
  const [quantity, setQuantity] = useState<number>(module.defaultValue || 1);
  const [complexity, setComplexity] = useState<'simple' | 'complex' | 'very_complex'>('simple');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [databaseSize, setDatabaseSize] = useState<'small' | 'medium' | 'large'>('small');
  const [showInfo, setShowInfo] = useState(false);
  
  const handleQuantityChange = (newValue: number) => {
    const value = Math.max(
      module.minValue || 1,
      Math.min(module.maxValue || 100, newValue)
    );
    setQuantity(value);
    if (isSelected) {
      onSelect(module, value, complexity, selectedServices, databaseSize);
    }
  };

  const handleComplexityChange = (value: 'simple' | 'complex' | 'very_complex') => {
    setComplexity(value);
    if (isSelected) {
      onSelect(module, quantity, value, selectedServices, databaseSize);
    }
  };

  const handleServiceToggle = (serviceId: string) => {
    const updatedServices = selectedServices.includes(serviceId)
      ? selectedServices.filter(id => id !== serviceId)
      : [...selectedServices, serviceId];
    
    setSelectedServices(updatedServices);
    if (isSelected) {
      onSelect(module, quantity, complexity, updatedServices, databaseSize);
    }
  };

  const handleDatabaseSizeChange = (value: 'small' | 'medium' | 'large') => {
    setDatabaseSize(value);
    if (isSelected) {
      onSelect(module, quantity, complexity, selectedServices, value);
    }
  };

  const toggleModule = () => {
    if (isSelected) {
      onDeselect(module.id);
    } else {
      onSelect(module, quantity, complexity, selectedServices, databaseSize);
    }
  };

  const getModulePrice = (): string => {
    if (module.id === 'database' && selectedServices.length > 0) {
      return formatCurrency(calculateModuleCost(module, quantity, complexity, selectedServices, databaseSize));
    }
    
    if (module.id === 'skyguard' && selectedServices.length > 0) {
      return formatCurrency(module.custoBase + (selectedServices.length * 5500));
    }
    
    if (['security_practices', 'security_hub', 'disaster_recovery', 'conta_cofre', 'arquitetura'].includes(module.id) && complexity) {
      let complexityFactor = 1;
      switch (complexity) {
        case 'simple': complexityFactor = 1; break;
        case 'complex': complexityFactor = 1.7; break;
        case 'very_complex': complexityFactor = 2.9; break;
      }
      return formatCurrency(module.custoBase * complexityFactor);
    }
    
    if (['observability', 'ia', 'ml', 'serverless'].includes(module.id) && complexity) {
      let complexityFactor = 1;
      switch (complexity) {
        case 'simple': complexityFactor = 0.8; break;
        case 'complex': complexityFactor = 1; break;
        case 'very_complex': complexityFactor = 1.4; break;
      }
      return formatCurrency(module.custoBase * complexityFactor);
    }
    
    return formatCurrency(calculateModuleCost(module, quantity));
  };

  const getDatabaseSizeLabel = (size: 'small' | 'medium' | 'large'): string => {
    switch (size) {
      case 'small': return '1-100GB';
      case 'medium': return '100-500GB';
      case 'large': return '500-1000GB';
      default: return '';
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
                onClick={(e) => {
                  e.stopPropagation();
                  setShowInfo(!showInfo);
                }}
                className="ml-2 text-muted-foreground hover:text-nuvme-blue focus:outline-none focus:text-nuvme-blue transition-colors"
              >
                <Icon name="Info" className="w-4 h-4" />
              </button>
            </div>
            {showInfo && (
              <p className="text-sm text-muted-foreground mt-1">{module.description}</p>
            )}
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
                {module.variableUnit ? module.variableUnit.charAt(0).toUpperCase() + module.variableUnit.slice(1) : "Preço"}
              </label>
              <span className="text-sm font-medium">
                {getModulePrice()}
              </span>
            </div>

            {/* Quantity Selector for variable modules */}
            {module.variableFactor && (
              <div className="flex items-center mb-4">
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
            )}

            {/* Complexity Selector for security and nextgen modules */}
            {module.hasComplexity && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Complexidade:</p>
                <RadioGroup 
                  value={complexity} 
                  onValueChange={(value) => handleComplexityChange(value as 'simple' | 'complex' | 'very_complex')}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="simple" id={`${module.id}-simple`} />
                    <Label htmlFor={`${module.id}-simple`} className="text-sm">Simples</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="complex" id={`${module.id}-complex`} />
                    <Label htmlFor={`${module.id}-complex`} className="text-sm">Complexo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="very_complex" id={`${module.id}-very_complex`} />
                    <Label htmlFor={`${module.id}-very_complex`} className="text-sm">Muito Complexo</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Services Selector for SkyGuard */}
            {module.id === 'skyguard' && module.hasServices && module.availableServices && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Serviços AWS:</p>
                <div className="space-y-2">
                  {module.availableServices.map((service) => (
                    <div key={service.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`${module.id}-${service.id}`}
                        checked={selectedServices.includes(service.id)}
                        onCheckedChange={() => handleServiceToggle(service.id)}
                      />
                      <Label 
                        htmlFor={`${module.id}-${service.id}`}
                        className="text-sm"
                      >
                        {service.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Database Services and Size */}
            {module.id === 'database' && module.hasServices && module.availableServices && (
              <>
                <div className="mb-4">
                  <p className="text-sm font-medium mb-2">Serviços de Banco de Dados:</p>
                  <div className="space-y-2">
                    {module.availableServices.map((service) => (
                      <div key={service.id} className="flex items-center justify-between space-x-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id={`${module.id}-${service.id}`}
                            checked={selectedServices.includes(service.id)}
                            onCheckedChange={() => handleServiceToggle(service.id)}
                          />
                          <Label 
                            htmlFor={`${module.id}-${service.id}`}
                            className="text-sm"
                          >
                            {service.name}
                          </Label>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatCurrency(service.price || 0)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedServices.length > 0 && module.hasDatabaseSize && (
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Tamanho do Banco de Dados:</p>
                    <Select 
                      value={databaseSize} 
                      onValueChange={(value) => handleDatabaseSizeChange(value as 'small' | 'medium' | 'large')}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o tamanho" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">{getDatabaseSizeLabel('small')}</SelectItem>
                        <SelectItem value="medium">{getDatabaseSizeLabel('medium')}</SelectItem>
                        <SelectItem value="large">{getDatabaseSizeLabel('large')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ModuleCard;
