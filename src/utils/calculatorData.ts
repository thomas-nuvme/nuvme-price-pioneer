export type MissionType = 'modernization' | 'security' | 'migration' | 'finops' | 'nextgen' | 'takeoff';

export interface Mission {
  id: MissionType;
  name: string;
  description: string;
  icon: string;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  missions: MissionType[];
  horasFixas: number;
  custoBase: number;
  variableFactor?: number;
  variableUnit?: string;
  minValue?: number;
  maxValue?: number;
  defaultValue?: number;
  icon?: string;
  hasComplexity?: boolean;
  hasServices?: boolean;
  availableServices?: {id: string, name: string, price?: number}[];
  hasDatabaseSize?: boolean;
}

export interface SelectedModule {
  module: Module;
  quantity: number;
  complexity?: 'simple' | 'complex' | 'very_complex';
  selectedServices?: string[];
  databaseSize?: 'small' | 'medium' | 'large';
}

// Definição das missões
export const missions: Mission[] = [
  { id: 'modernization', name: 'Modernização', description: 'Modernize sua infraestrutura e aplicações', icon: 'Rocket' },
  { id: 'security', name: 'Segurança', description: 'Melhore sua postura de segurança e conformidade', icon: 'ShieldCheck' },
  { id: 'migration', name: 'Migração', description: 'Migre suas cargas de trabalho para a nuvem', icon: 'MoveRight' },
  { id: 'finops', name: 'FinOps', description: 'Otimize seus custos e gastos na nuvem', icon: 'TrendingDown' },
  { id: 'nextgen', name: 'NextGen', description: 'Implemente tecnologias de próxima geração', icon: 'Zap' },
  { id: 'takeoff', name: 'TakeOff', description: 'Módulos essenciais para todas as missões', icon: 'Layers' },
];

// AWS Security Services
const securityServices = [
  { id: 'waf', name: 'WAF' },
  { id: 'security_hub', name: 'Security Hub' },
  { id: 'secrets_manager', name: 'Secrets Manager' },
  { id: 'kms', name: 'KMS' },
  { id: 'iam', name: 'IAM' },
  { id: 'guardduty', name: 'GuardDuty' },
  { id: 'certificate_manager', name: 'Certificate Manager' },
];

// Database Services
const databaseServices = [
  { id: 'provisioning', name: 'Provisionamento', price: 900 },
  { id: 'update', name: 'Atualização', price: 4000 },
  { id: 'configuration', name: 'Configuração', price: 4000 },
];

// Definição dos módulos
export const modules: Module[] = [
  // Missão Modernização - reordered as requested
  { id: 'cicd', name: 'CI/CD', description: 'Pipeline de Integração Contínua', missions: ['modernization'], horasFixas: 18, custoBase: 4400, variableFactor: 4, variableUnit: 'Pipelines', icon: 'GitBranch' },
  { id: 'container', name: 'Contêiner', description: 'Transformação de aplicações para containers', missions: ['modernization'], horasFixas: 20, custoBase: 5000, variableFactor: 5, variableUnit: 'APIs', icon: 'Package' },
  { id: 'database', name: 'Database', description: 'Otimização e Migração de Banco de Dados', missions: ['modernization'], horasFixas: 20, custoBase: 0, hasServices: true, availableServices: databaseServices, hasDatabaseSize: true, icon: 'Database' },
  { id: 'gitops', name: 'GitOps', description: 'Automação de deploy com GitOps', missions: ['modernization'], horasFixas: 15, custoBase: 3500, variableFactor: 4, variableUnit: 'Repositórios', icon: 'GitMerge' },
  { id: 'kubernetes', name: 'Kubernetes', description: 'Configuração de Cluster Kubernetes', missions: ['modernization'], horasFixas: 24, custoBase: 5200, variableFactor: 18, variableUnit: 'Clusters', icon: 'Ship' },
  { id: 'karpenter', name: 'Karpenter', description: 'Autoescalonamento com Karpenter', missions: ['modernization'], horasFixas: 12, custoBase: 5600, variableFactor: 1, variableUnit: 'Deployments/APIs', icon: 'BarChart3' },

  // Missão Segurança
  { id: 'security_practices', name: 'Security Practices', description: 'Boas práticas de segurança na nuvem', missions: ['security'], horasFixas: 20, custoBase: 7200, variableUnit: 'complexidade', hasComplexity: true, icon: 'Shield' },
  { id: 'skyguard', name: 'SkyGuard', description: 'Monitoramento avançado de segurança', missions: ['security'], horasFixas: 18, custoBase: 4400, variableUnit: 'serviços', hasServices: true, availableServices: securityServices, icon: 'Eye' },
  { id: 'security_hub', name: 'Security Hub', description: 'Gestão de conformidade com AWS Security Hub', missions: ['security'], horasFixas: 15, custoBase: 4500, variableUnit: 'complexidade', hasComplexity: true, icon: 'Lock' },
  { id: 'disaster_recovery', name: 'Disaster Recovery', description: 'Plano de recuperação de desastres', missions: ['security'], horasFixas: 24, custoBase: 7200, variableUnit: 'complexidade', hasComplexity: true, icon: 'CloudRain' },
  { id: 'conta_cofre', name: 'Conta Cofre', description: 'Gerenciamento seguro de credenciais', missions: ['security'], horasFixas: 12, custoBase: 3600, variableUnit: 'complexidade', hasComplexity: true, icon: 'KeyRound' },

  // Missão Migração
  { id: 'on_premises', name: 'On Premises', description: 'Migração de infraestrutura local para nuvem', missions: ['migration'], horasFixas: 30, custoBase: 9000, variableFactor: 10, variableUnit: 'VMs', icon: 'Server' },
  { id: 'cloud', name: 'Cloud', description: 'Migração entre clouds', missions: ['migration'], horasFixas: 25, custoBase: 7500, variableFactor: 8, variableUnit: 'workloads', icon: 'Cloud' },

  // Missão FinOps
  { id: 'redução_custos', name: 'Redução de Custos', description: 'Análise e otimização de custos', missions: ['finops'], horasFixas: 12, custoBase: 6800, icon: 'PiggyBank' },
  { id: 'finops_avancado', name: 'FinOps Avançado', description: 'Gestão avançada de custos na nuvem', missions: ['finops'], horasFixas: 18, custoBase: 18500, icon: 'BarChart4' },

  // Missão NextGen
  { 
    id: 'observability', 
    name: 'Observabilidade', 
    description: 'Monitoramento e Logs avançados', 
    missions: ['nextgen'], 
    horasFixas: 15, 
    custoBase: 15000,
    icon: 'LineChart',
    hasComplexity: true,
    variableUnit: 'complexidade' 
  },
  { 
    id: 'ia', 
    name: 'Inteligência Artificial', 
    description: 'Implantação de soluções de IA', 
    missions: ['nextgen'], 
    horasFixas: 20, 
    custoBase: 20000,
    icon: 'Brain',
    hasComplexity: true,
    variableUnit: 'complexidade' 
  },
  { 
    id: 'ml', 
    name: 'Machine Learning', 
    description: 'Desenvolvimento de modelos de aprendizado', 
    missions: ['nextgen'], 
    horasFixas: 24, 
    custoBase: 3500,
    icon: 'Network',
    hasComplexity: true,
    variableUnit: 'complexidade' 
  },
  { 
    id: 'serverless', 
    name: 'Serverless', 
    description: 'Aplicações sem servidor', 
    missions: ['nextgen'], 
    horasFixas: 18, 
    custoBase: 2100,
    icon: 'ServerCrash',
    hasComplexity: true,
    variableUnit: 'complexidade' 
  },

  // TakeOff (pode ser adicionado a todas as missões) - reordered as requested for last two
  { id: 'arquitetura', name: 'Arquitetura', description: 'Definição de arquitetura otimizada', missions: ['takeoff', 'nextgen', 'modernization','security','migration','finops'], horasFixas: 12, custoBase: 5200, icon: 'Blocks' },
  { id: 'faturamento', name: 'Faturamento', description: 'Faturamento em reais via boleto', missions: ['takeoff', 'nextgen', 'modernization','security','migration','finops'], horasFixas: 0, custoBase: 0, icon: 'Receipt' },
  { id: 'painel_nuvme', name: 'Painel Nuvme', description: 'Ferramenta de monitoramento de custos', missions: ['takeoff', 'nextgen', 'modernization','security','migration','finops'], horasFixas: 0, custoBase: 0, variableFactor: 1, variableUnit: 'servidores', minValue: 1, maxValue: 50, defaultValue: 5, icon: 'LayoutDashboard' },
];

// Constantes de cálculo
export const HOURLY_RATE = 300;
export const MARGIN_PERCENTAGE = 0.1;

export const calculateModuleCost = (module: Module, quantity: number = 1, complexity?: 'simple' | 'complex' | 'very_complex', selectedServices?: string[], databaseSize?: 'small' | 'medium' | 'large'): number => {
  // For database module with services
  if (module.id === 'database' && selectedServices && selectedServices.length > 0) {
    let basePrice = 0;
    
    // Calculate base price from selected services
    selectedServices.forEach(serviceId => {
      const service = module.availableServices?.find(s => s.id === serviceId);
      if (service && service.price) {
        basePrice += service.price;
      }
    });
    
    // Apply size multiplier
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
  
  // For SkyGuard module with selected services
  if (module.id === 'skyguard' && selectedServices) {
    return module.custoBase + (selectedServices.length * 5500);
  }
  
  // For NextGen modules with complexity
  if (['observability', 'ia', 'ml', 'serverless'].includes(module.id) && complexity) {
    let complexityFactor = 1;
    switch (complexity) {
      case 'simple': complexityFactor = 0.8; break; // 20% lower
      case 'complex': complexityFactor = 1; break;  // base price
      case 'very_complex': complexityFactor = 1.4; break; // 40% higher
    }
    return module.custoBase * complexityFactor;
  }
  
  // If the module has a variable factor, calculate the variable component
  if (module.variableFactor) {
    return module.custoBase + (module.variableFactor * quantity * HOURLY_RATE);
  }
  
  // Otherwise just return the base cost
  return module.custoBase;
};

export const formatCurrency = (value: number): string => {
  return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
