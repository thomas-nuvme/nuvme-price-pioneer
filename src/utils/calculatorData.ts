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
  horasFixas: number;
  custoBase: number;
  variableFactor: number;
  variableUnit: string;
  minValue?: number;
  maxValue?: number;
  defaultValue?: number;
  icon?: string;
}

export interface SelectedModule {
  module: Module;
  quantity: number;
}

// Missions data
export const missions: Mission[] = [
  {
    id: 'modernization',
    name: 'Modernização',
    description: 'Modernize sua infraestrutura e aplicações',
    icon: 'Rocket'
  },
  {
    id: 'security',
    name: 'Segurança',
    description: 'Melhore sua postura de segurança e conformidade',
    icon: 'ShieldCheck'
  },
  {
    id: 'migration',
    name: 'Migração',
    description: 'Migre suas cargas de trabalho para a nuvem',
    icon: 'MoveRight'
  },
  {
    id: 'finops',
    name: 'FinOps',
    description: 'Otimize seus custos e gastos na nuvem',
    icon: 'TrendingDown'
  },
  {
    id: 'nextgen',
    name: 'NextGen',
    description: 'Implemente tecnologias de próxima geração',
    icon: 'Zap'
  }
];

// Modules data
export const modules: Module[] = [
  {
    id: 'cicd',
    name: 'CI/CD',
    description: 'Implementação de pipeline de Integração e Entrega Contínua',
    missions: ['modernization', 'nextgen'],
    horasFixas: 18,
    custoBase: 5400,
    variableFactor: 4,
    variableUnit: 'pipelines',
    minValue: 1,
    maxValue: 50,
    defaultValue: 5,
    icon: 'GitPullRequest'
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    description: 'Configuração e implantação de cluster Kubernetes',
    missions: ['modernization', 'migration', 'nextgen'],
    horasFixas: 24,
    custoBase: 7200,
    variableFactor: 18,
    variableUnit: 'clusters',
    minValue: 1,
    maxValue: 20,
    defaultValue: 3,
    icon: 'Container'
  },
  {
    id: 'database',
    name: 'Database',
    description: 'Migração e otimização de banco de dados',
    missions: ['migration', 'modernization'],
    horasFixas: 20,
    custoBase: 6000,
    variableFactor: 6,
    variableUnit: 'bancos extras',
    minValue: 1,
    maxValue: 30,
    defaultValue: 5,
    icon: 'Database'
  },
  {
    id: 'gitops',
    name: 'GitOps',
    description: 'Configuração de fluxo de trabalho GitOps',
    missions: ['modernization', 'security', 'nextgen'],
    horasFixas: 15,
    custoBase: 4500,
    variableFactor: 4,
    variableUnit: 'repositórios extras',
    minValue: 1,
    maxValue: 50,
    defaultValue: 10,
    icon: 'GitBranch'
  },
  {
    id: 'containerization',
    name: 'Conteinerização',
    description: 'Conteinerização de aplicações existentes',
    missions: ['modernization', 'migration'],
    horasFixas: 20,
    custoBase: 6000,
    variableFactor: 6,
    variableUnit: 'APIs',
    minValue: 1,
    maxValue: 100,
    defaultValue: 10,
    icon: 'Package'
  },
  {
    id: 'karpenter',
    name: 'Karpenter',
    description: 'Autoescalonamento do Kubernetes com Karpenter',
    missions: ['finops', 'nextgen', 'modernization'],
    horasFixas: 12,
    custoBase: 3600,
    variableFactor: 1,
    variableUnit: 'Deployments/APIs',
    minValue: 1,
    maxValue: 50,
    defaultValue: 8,
    icon: 'Scale'
  },
  {
    id: 'security_audit',
    name: 'Auditoria de Segurança',
    description: 'Avaliação abrangente de segurança',
    missions: ['security'],
    horasFixas: 20,
    custoBase: 6000,
    variableFactor: 10,
    variableUnit: 'aplicações',
    minValue: 1,
    maxValue: 50,
    defaultValue: 5,
    icon: 'Shield'
  },
  {
    id: 'cost_optimization',
    name: 'Otimização de Custos',
    description: 'Análise e otimização de custos na nuvem',
    missions: ['finops'],
    horasFixas: 18,
    custoBase: 5400,
    variableFactor: 8,
    variableUnit: 'contas',
    minValue: 1,
    maxValue: 20,
    defaultValue: 3,
    icon: 'BarChart2'
  },
  {
    id: 'devops_training',
    name: 'Treinamento DevOps',
    description: 'Treinamento de equipe em práticas DevOps',
    missions: ['modernization', 'nextgen'],
    horasFixas: 10,
    custoBase: 3000,
    variableFactor: 5,
    variableUnit: 'participantes',
    minValue: 5,
    maxValue: 50,
    defaultValue: 10,
    icon: 'GraduationCap'
  },
  {
    id: 'cloud_migration',
    name: 'Migração para Nuvem',
    description: 'Migrar cargas de trabalho para a nuvem',
    missions: ['migration'],
    horasFixas: 30,
    custoBase: 9000,
    variableFactor: 35,
    variableUnit: 'aplicações',
    minValue: 1,
    maxValue: 50,
    defaultValue: 5,
    icon: 'Cloud'
  }
];

// Constants for calculation
export const HOURLY_RATE = 300;
export const MARGIN_PERCENTAGE = 0.1; // 10%

export const calculateModuleCost = (module: Module, quantity: number): number => {
  return module.custoBase + (module.variableFactor * quantity * HOURLY_RATE);
};

export const formatCurrency = (value: number): string => {
  return `R$ ${value.toLocaleString('pt-BR', { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};
