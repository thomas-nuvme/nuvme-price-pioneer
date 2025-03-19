
export type MissionType = 'modernization' | 'security' | 'migration' | 'finops' | 'nextgen';

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
  basePrice: number;
  variableFactor: number;
  variableUnit: string;
  minValue?: number;
  maxValue?: number;
  defaultValue?: number;
}

export interface SelectedModule {
  module: Module;
  quantity: number;
}

// Missions data
export const missions: Mission[] = [
  {
    id: 'modernization',
    name: 'Modernization',
    description: 'Modernize your infrastructure and applications',
    icon: 'refresh-cw'
  },
  {
    id: 'security',
    name: 'Security',
    description: 'Enhance your security posture and compliance',
    icon: 'shield'
  },
  {
    id: 'migration',
    name: 'Migration',
    description: 'Migrate your workloads to the cloud',
    icon: 'move'
  },
  {
    id: 'finops',
    name: 'FinOps',
    description: 'Optimize your cloud costs and spending',
    icon: 'trending-down'
  },
  {
    id: 'nextgen',
    name: 'NextGen',
    description: 'Implement next-generation technologies',
    icon: 'zap'
  }
];

// Modules data
export const modules: Module[] = [
  {
    id: 'cicd',
    name: 'CI/CD Implementation',
    description: 'Continuous Integration and Delivery pipeline setup',
    missions: ['modernization', 'nextgen'],
    basePrice: 15000,
    variableFactor: 20,
    variableUnit: 'pipelines',
    minValue: 1,
    maxValue: 50,
    defaultValue: 5
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes Setup',
    description: 'Kubernetes cluster configuration and deployment',
    missions: ['modernization', 'migration', 'nextgen'],
    basePrice: 25000,
    variableFactor: 40,
    variableUnit: 'clusters',
    minValue: 1,
    maxValue: 20,
    defaultValue: 3
  },
  {
    id: 'gitops',
    name: 'GitOps Implementation',
    description: 'GitOps workflow setup and configuration',
    missions: ['modernization', 'security', 'nextgen'],
    basePrice: 18000,
    variableFactor: 15,
    variableUnit: 'repositories',
    minValue: 1,
    maxValue: 50,
    defaultValue: 10
  },
  {
    id: 'database',
    name: 'Database Migration',
    description: 'Database migration and optimization',
    missions: ['migration', 'modernization'],
    basePrice: 22000,
    variableFactor: 30,
    variableUnit: 'databases',
    minValue: 1,
    maxValue: 30,
    defaultValue: 5
  },
  {
    id: 'containerization',
    name: 'Application Containerization',
    description: 'Containerize existing applications',
    missions: ['modernization', 'migration'],
    basePrice: 12000,
    variableFactor: 25,
    variableUnit: 'APIs',
    minValue: 1,
    maxValue: 100,
    defaultValue: 10
  },
  {
    id: 'karpenter',
    name: 'Karpenter Implementation',
    description: 'Kubernetes autoscaling with Karpenter',
    missions: ['finops', 'nextgen'],
    basePrice: 15000,
    variableFactor: 18,
    variableUnit: 'deployments',
    minValue: 1,
    maxValue: 50,
    defaultValue: 8
  },
  {
    id: 'security_audit',
    name: 'Security Audit',
    description: 'Comprehensive security assessment',
    missions: ['security'],
    basePrice: 20000,
    variableFactor: 10,
    variableUnit: 'applications',
    minValue: 1,
    maxValue: 50,
    defaultValue: 5
  },
  {
    id: 'cost_optimization',
    name: 'Cost Optimization',
    description: 'Cloud cost analysis and optimization',
    missions: ['finops'],
    basePrice: 18000,
    variableFactor: 8,
    variableUnit: 'accounts',
    minValue: 1,
    maxValue: 20,
    defaultValue: 3
  },
  {
    id: 'devops_training',
    name: 'DevOps Training',
    description: 'Team training on DevOps practices',
    missions: ['modernization', 'nextgen'],
    basePrice: 10000,
    variableFactor: 50,
    variableUnit: 'participants',
    minValue: 5,
    maxValue: 50,
    defaultValue: 10
  },
  {
    id: 'cloud_migration',
    name: 'Cloud Migration',
    description: 'Migrate workloads to the cloud',
    missions: ['migration'],
    basePrice: 30000,
    variableFactor: 35,
    variableUnit: 'applications',
    minValue: 1,
    maxValue: 50,
    defaultValue: 5
  }
];

// Constants for calculation
export const HOURLY_RATE = 300;
export const MARGIN_PERCENTAGE = 0.1; // 10%

export const calculateModuleCost = (module: Module, quantity: number): number => {
  return (module.basePrice + module.variableFactor * quantity) * HOURLY_RATE * (1 + MARGIN_PERCENTAGE);
};

export const formatCurrency = (value: number): string => {
  return `R$ ${value.toLocaleString('pt-BR', { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};
