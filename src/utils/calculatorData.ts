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
}

// 📌 Definição das missões
export const missions: Mission[] = [
  { id: 'modernization', name: 'Modernização', description: 'Modernize sua infraestrutura e aplicações', icon: 'Rocket' },
  { id: 'security', name: 'Segurança', description: 'Melhore sua postura de segurança e conformidade', icon: 'ShieldCheck' },
  { id: 'migration', name: 'Migração', description: 'Migre suas cargas de trabalho para a nuvem', icon: 'MoveRight' },
  { id: 'finops', name: 'FinOps', description: 'Otimize seus custos e gastos na nuvem', icon: 'TrendingDown' },
  { id: 'nextgen', name: 'NextGen', description: 'Implemente tecnologias de próxima geração', icon: 'Zap' },
  { id: 'takeoff', name: 'TakeOff', description: 'Módulos essenciais para todas as missões', icon: 'Layers' },
];

// 📌 Definição dos módulos
export const modules: Module[] = [
  // 🚀 Missão Modernização
  { id: 'cicd', name: 'CI/CD', description: 'Pipeline de Integração Contínua', missions: ['modernization'], horasFixas: 18, custoBase: 5400, variableFactor: 4, variableUnit: 'pipelines' },
  { id: 'kubernetes', name: 'Kubernetes', description: 'Configuração de Cluster Kubernetes', missions: ['modernization'], horasFixas: 24, custoBase: 7200, variableFactor: 18, variableUnit: 'clusters' },
  { id: 'database', name: 'Database', description: 'Otimização e Migração de Banco de Dados', missions: ['modernization'], horasFixas: 20, custoBase: 6000, variableFactor: 6, variableUnit: 'bancos extras' },
  { id: 'gitops', name: 'GitOps', description: 'Automação de deploy com GitOps', missions: ['modernization'], horasFixas: 15, custoBase: 4500, variableFactor: 4, variableUnit: 'repositórios extras' },
  { id: 'containerization', name: 'Conteinerização', description: 'Transformação de aplicações para containers', missions: ['modernization'], horasFixas: 20, custoBase: 6000, variableFactor: 6, variableUnit: 'APIs' },
  { id: 'karpenter', name: 'Karpenter', description: 'Autoescalonamento com Karpenter', missions: ['modernization'], horasFixas: 12, custoBase: 3600, variableFactor: 1, variableUnit: 'Deployments/APIs' },

  // 🛡️ Missão Segurança
  { id: 'security_practices', name: 'Security Practices', description: 'Boas práticas de segurança na nuvem', missions: ['security'], horasFixas: 20, custoBase: 6000 },
  { id: 'skyguard', name: 'SkyGuard', description: 'Monitoramento avançado de segurança', missions: ['security'], horasFixas: 18, custoBase: 5400 },
  { id: 'security_hub', name: 'Security Hub', description: 'Gestão de conformidade com AWS Security Hub', missions: ['security'], horasFixas: 15, custoBase: 4500 },
  { id: 'disaster_recovery', name: 'Disaster Recovery', description: 'Plano de recuperação de desastres', missions: ['security'], horasFixas: 24, custoBase: 7200 },
  { id: 'conta_cofre', name: 'Conta Cofre', description: 'Gerenciamento seguro de credenciais', missions: ['security'], horasFixas: 12, custoBase: 3600 },

  // 🚛 Missão Migração
  { id: 'on_premises', name: 'On Premises', description: 'Migração de infraestrutura local para nuvem', missions: ['migration'], horasFixas: 30, custoBase: 9000, variableFactor: 10, variableUnit: 'ambientes extras' },
  { id: 'cloud', name: 'Cloud', description: 'Migração entre clouds', missions: ['migration'], horasFixas: 25, custoBase: 7500, variableFactor: 8, variableUnit: 'workloads extras' },

  // 💰 Missão FinOps
  { id: 'redução_custos', name: 'Redução de Custos', description: 'Análise e otimização de custos', missions: ['finops'], horasFixas: 12, custoBase: 3600 },
  { id: 'finops_avancado', name: 'FinOps Avançado', description: 'Gestão avançada de custos na nuvem', missions: ['finops'], horasFixas: 18, custoBase: 5400 },

  // 🌌 Missão NextGen
  { id: 'observability', name: 'Observabilidade', description: 'Monitoramento e Logs avançados', missions: ['nextgen'], horasFixas: 15, custoBase: 4500 },
  { id: 'ia', name: 'Inteligência Artificial', description: 'Implantação de soluções de IA', missions: ['nextgen'], horasFixas: 20, custoBase: 6000 },
  { id: 'ml', name: 'Machine Learning', description: 'Desenvolvimento de modelos de aprendizado', missions: ['nextgen'], horasFixas: 24, custoBase: 7200 },
  { id: 'serverless', name: 'Serverless', description: 'Aplicações sem servidor', missions: ['nextgen'], horasFixas: 18, custoBase: 5400 },

  // 📌 TakeOff (pode ser adicionado a todas as missões)
  { id: 'arquitetura', name: 'Arquitetura', description: 'Definição de arquitetura otimizada', missions: ['takeoff', 'nextgen', 'modernization','security','migration','finops'], horasFixas: 12, custoBase: 3600 },
  { id: 'faturamento', name: 'Faturamento', description: 'Faturamento em reais via boleto', missions: ['takeoff', 'nextgen', 'modernization','security','migration','finops'], horasFixas: 0, custoBase: 0 },
  { id: 'painel_nuvme', name: 'Painel Nuvme', description: 'Ferramenta de monitoramento de custos', missions: ['takeoff', 'nextgen', 'modernization','security','migration','finops'], horasFixas: 0, custoBase: 0, variableFactor: 1, variableUnit: 'servidores', minValue: 1, maxValue: 50, defaultValue: 5 },
];

// 💰 Constantes de cálculo
export const HOURLY_RATE = 300;
export const MARGIN_PERCENTAGE = 0.1;

export const calculateModuleCost = (module: Module, quantity: number): number => {
  return module.custoBase + (module.variableFactor ? module.variableFactor * quantity * HOURLY_RATE : 0);
};

export const formatCurrency = (value: number): string => {
  return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
