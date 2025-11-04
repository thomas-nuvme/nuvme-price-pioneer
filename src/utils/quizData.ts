export type PlanType = 'essential' | 'advanced' | 'premier';

export interface Plan {
  id: PlanType;
  name: string;
  description: string;
  color: string;
  tailwindColor: string;
  textColor: string;
  tagline: string;
  included: string[];
  notIncluded: string[];
  forWho: string[];
  example: string;
}

export interface Question {
  id: string;
  text: string;
  helpText?: string;
  options: {
    id: string;
    text: string;
    plans: PlanType[];
  }[];
}

export const plans: Plan[] = [
  {
    id: 'essential', 
    name: 'Essential', 
    description: 'Suporte imediato para empresas em expansão', 
    color: '#00C7B1',
    tailwindColor: 'bg-nuvme-teal',
    textColor: 'text-white',
    tagline: 'Suporte contínuo e resolução ativa de problemas',
    included: [
      'Tudo do Together +',
      'Suporte Técnico Ilimitado via Ticket → Qualquer incidente pode ser reportado e a Nuvme atuará na resolução.',
      'Suporte via WhatsApp → Canal de atendimento para dúvidas técnicas e suporte ágil.',
      'Auxílio Operacional → Se algo der errado, atuamos diretamente para corrigir o problema.',
      'Abertura de Chamados → Processo formal para rastrear problemas e resoluções.'
    ],
    notIncluded: [
      'Acompanhamento estratégico estruturado → O foco é na estabilidade operacional, não na otimização contínua.',
      'Squad DevOps Dedicado → Para um time especializado continuamente melhorando seu ambiente, é necessário o Advanced.',
      'FinOps Avançado → Análises detalhadas e otimizações estratégicas de custos só estão no Advanced.',
      'Suporte via Slack → Atendimento via Slack só está disponível a partir do plano Advanced.'
    ],
    forWho: [
      'Empresas que não querem se preocupar com infraestrutura AWS e precisam de resolução ativa de problemas.',
      'Negócios que precisam de suporte contínuo, mas não exigem um time dedicado para melhorias constantes.'
    ],
    example: 'Uma startup SaaS está crescendo rapidamente e já tem clientes empresariais. Um problema na AWS pode causar impacto direto no faturamento, então eles querem um suporte ativo para resolver incidentes imediatamente, mas ainda não precisam de otimizações contínuas.'
  },
  { 
    id: 'advanced', 
    name: 'Advanced', 
    description: 'Monitoramento proativo e inovação contínua', 
    color: '#0074BB',
    tailwindColor: 'bg-nuvme-blue',
    textColor: 'text-white',
    tagline: 'Otimização contínua com Squad DevOps',
    included: [
      'Tudo do Essential +',
      'Squad DevOps Dedicado → Time técnico focado em melhoria contínua do ambiente AWS.',
      'Suporte Avançado a Banco de Dados → Ajustes de performance e otimização contínua.',
      'Suporte a Pipelines CI/CD → Configuração e otimização de automação de deploys.',
      'FinOps Avançado → Estratégias de redução de custos e otimização de consumo AWS.',
      'Monitoramento Avançado → Análise de logs, métricas detalhadas e ajustes contínuos.',
      'Eventos de Segurança → Auditorias e implementação de melhores práticas de segurança na AWS.'
    ],
    notIncluded: [
      'Análises de Observabilidade Avançada → Apenas no Premier.',
      'Avaliação Arquitetural Completa → No Premier, revisamos e aprimoramos a arquitetura AWS em profundidade.',
      'Suporte 100% Personalizado → Para demandas altamente específicas e críticas, o Premier é a melhor opção.'
    ],
    forWho: [
      'Empresas que precisam de um time técnico altamente qualificado para melhorar continuamente seu ambiente AWS.',
      'Negócios que usam Kubernetes, CI/CD e alta carga de banco de dados e querem otimizações constantes.'
    ],
    example: 'Uma empresa de e-commerce enfrenta picos de tráfego durante campanhas promocionais. O Squad DevOps da Nuvme monitora o ambiente AWS continuamente para garantir escalabilidade, evitando falhas e reduzindo custos.'
  },
  { 
    id: 'premier', 
    name: 'Premier', 
    description: 'Suporte crítico e otimização completa para grandes empresas', 
    color: '#7E69AB',
    tailwindColor: 'bg-purple-600',
    textColor: 'text-white',
    tagline: 'Alto desempenho, segurança máxima e suporte personalizado',
    included: [
      'Tudo do Advanced +',
      'Observabilidade Avançada → Monitoramento profundo de logs, tracing e métricas de performance.',
      'Performance Tuning → Ajustes contínuos para garantir o melhor desempenho dos workloads AWS.',
      'Avaliação Arquitetural Completa → Revisão e otimização da infraestrutura AWS.',
      'Workshops → Treinamento contínuo para equipe interna do cliente.',
      'Suporte Personalizado → Atendimento especializado para demandas exclusivas.'
    ],
    notIncluded: [
      'Foco apenas em estabilidade → O Premier não apenas garante funcionamento, mas busca melhoria contínua e inovação.',
      'Suporte 24/7 → A Nuvme não oferece suporte 24/7 atualmente.'
    ],
    forWho: [
      'Empresas que não podem ter downtime e exigem performance máxima.',
      'Negócios que exigem segurança avançada e otimizações contínuas.'
    ],
    example: 'Uma fintech global que processa milhares de transações por segundo precisa de um ambiente altamente otimizado. Com o Premier, a Nuvme atua continuamente para manter performance, segurança e escalabilidade.'
  },
];

export const questions: Question[] = [
  {
    id: 'support-preference',
    text: 'Como você prefere receber suporte técnico?',
    helpText: 'Ajuda a definir o nível de suporte técnico necessário para sua empresa',
    options: [
      { 
        id: 'continuous', 
        text: 'Preciso de suporte técnico contínuo com resposta rápida a incidentes.', 
        plans: ['essential'] 
      },
      { 
        id: 'dedicated', 
        text: 'Quero um time dedicado acompanhando e melhorando meu ambiente.', 
        plans: ['advanced'] 
      },
      { 
        id: 'personalized', 
        text: 'Preciso de atendimento personalizado.', 
        plans: ['premier'] 
      }
    ]
  },
  {
    id: 'company-size',
    text: 'Qual o tamanho atual da sua empresa ou operação em nuvem?',
    helpText: 'Ajuda a entender a complexidade do ambiente e suporte necessário',
    options: [
      { 
        id: 'medium', 
        text: 'Porte médio, com infraestrutura em crescimento e equipe técnica enxuta.', 
        plans: ['essential'] 
      },
      { 
        id: 'large', 
        text: 'Ambiente estável, com uso práticas DevOps e banco de dados.', 
        plans: ['advanced'] 
      },
      { 
        id: 'enterprise', 
        text: 'Empresa grande com sistemas críticos e grande volume de acessos.', 
        plans: ['premier'] 
      }
    ]
  },
  {
    id: 'support-frequency',
    text: 'Com que frequência sua equipe precisa de apoio técnico para resolver problemas?',
    helpText: 'Ajuda a definir a regularidade de suporte técnico necessário',
    options: [
      { 
        id: 'weekly', 
        text: 'Quase toda semana temos alguma demanda de suporte ou ajustes técnicos.', 
        plans: ['essential'] 
      },
      { 
        id: 'recurring', 
        text: 'Temos demandas recorrentes e melhorias contínuas para executar.', 
        plans: ['advanced'] 
      },
      { 
        id: 'critical', 
        text: 'Temos operações críticas que não podem parar. Suporte é essencial.', 
        plans: ['premier'] 
      }
    ]
  },
  {
    id: 'cloud-maturity',
    text: 'Qual seu nível de maturidade em Cloud/DevOps?',
    helpText: 'Ajuda a identificar o nível de suporte e melhoria contínua necessários',
    options: [
      { 
        id: 'intermediate', 
        text: 'Já usamos algumas práticas de DevOps e estamos estruturando melhor o ambiente.', 
        plans: ['essential'] 
      },
      { 
        id: 'advanced', 
        text: 'Temos boas práticas e precisamos escalar e automatizar ainda mais.', 
        plans: ['advanced'] 
      },
      { 
        id: 'expert', 
        text: 'Alta maturidade. Buscamos performance máxima, segurança e inovação contínua.', 
        plans: ['premier'] 
      }
    ]
  },
  {
    id: 'cost-management',
    text: 'Como você lida com custos e otimização financeira em cloud?',
    helpText: 'Ajuda a determinar o nível de FinOps e otimização de custos necessários',
    options: [
      { 
        id: 'assistance', 
        text: 'Buscamos ajuda para entender e controlar custos com mais eficiência.', 
        plans: ['essential'] 
      },
      { 
        id: 'optimization', 
        text: 'Precisamos de apoio recorrente para reduzir desperdícios e otimizar recursos.', 
        plans: ['advanced'] 
      },
      { 
        id: 'advanced-finops', 
        text: 'Temos alto volume e buscamos estratégias FinOps personalizadas e avançadas.', 
        plans: ['premier'] 
      }
    ]
  },
  {
    id: 'follow-up',
    text: 'Que tipo de acompanhamento você valoriza?',
    helpText: 'Ajuda a definir o tipo de relacionamento com a equipe de suporte',
    options: [
      { 
        id: 'frequent', 
        text: 'Contato frequente, com abertura de chamados e suporte prático.', 
        plans: ['essential'] 
      },
      { 
        id: 'active', 
        text: 'Time técnico envolvido ativamente na evolução do ambiente.', 
        plans: ['advanced'] 
      },
      { 
        id: 'comprehensive', 
        text: 'Consultoria especializada, suporte full-stack e visão 360º do ambiente.', 
        plans: ['premier'] 
      }
    ]
  },
  {
    id: 'communication',
    text: 'Qual tipo de contato você prefere com o time de suporte?',
    helpText: 'Ajuda a definir os canais de comunicação preferidos',
    options: [
      { 
        id: 'tickets', 
        text: 'Quero abrir chamados e receber suporte por ticket ou WhatsApp.', 
        plans: ['essential'] 
      },
      { 
        id: 'slack-support', 
        text: 'Preciso de um time técnico próximo, com contato frequente via Slack e acompanhamento proativo.', 
        plans: ['advanced'] 
      },
      { 
        id: 'dedicated-team', 
        text: 'Preciso de um time dedicado, disponível por Slack e alinhado com nossas prioridades em tempo real.', 
        plans: ['premier'] 
      }
    ]
  }
];

export const getPlanRecommendation = (selectedOptions: Record<string, string>): PlanType => {
  // Initialize with lowest tier plan
  let recommendedPlan: PlanType = 'essential';
  
  // Count recommendations for each plan type
  const planCounts: Record<PlanType, number> = {
    'essential': 0,
    'advanced': 0,
    'premier': 0
  };
  
  // For each answer, check what plans it's compatible with
  Object.entries(selectedOptions).forEach(([questionId, optionId]) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;
    
    const option = question.options.find(o => o.id === optionId);
    if (!option) return;
    
    // Increment count for each compatible plan
    option.plans.forEach(plan => {
      planCounts[plan]++;
    });
  });
  
  // Find the lowest plan that satisfies all requirements
  const requiredPlans = getRequiredPlans(selectedOptions);
  
  if (requiredPlans.includes('premier')) {
    recommendedPlan = 'premier';
  } else if (requiredPlans.includes('advanced')) {
    recommendedPlan = 'advanced';
  } else if (requiredPlans.includes('essential')) {
    recommendedPlan = 'essential';
  }
  
  return recommendedPlan;
};

// Helper function to get required plans based on user selections
function getRequiredPlans(selectedOptions: Record<string, string>): PlanType[] {
  const requiredPlans: PlanType[] = [];
  
  // For each answer, determine if there's a specific requirement
  for (const [questionId, optionId] of Object.entries(selectedOptions)) {
    const question = questions.find(q => q.id === questionId);
    if (!question) continue;
    
    const option = question.options.find(o => o.id === optionId);
    if (!option) continue;
    
    // If the option is only compatible with advanced or premier
    if (option.plans.includes('premier') && !option.plans.includes('advanced') && 
        !option.plans.includes('essential')) {
      requiredPlans.push('premier');
    }
    else if (option.plans.includes('advanced') && !option.plans.includes('essential')) {
      requiredPlans.push('advanced');
    }
    else if (option.plans.includes('essential')) {
      requiredPlans.push('essential');
    }
  }
  
  return requiredPlans;
}

export const suggestUpgrade = (selectedOptions: Record<string, string>, recommendedPlan: PlanType): { suggest: boolean, upgrade: PlanType, reason: string } | null => {
  // If already at the highest tier (premier), no upgrade to suggest
  if (recommendedPlan === 'premier') return null;
  
  // Look for specific patterns that might suggest an upgrade
  let suggestedUpgrade: PlanType | null = null;
  let reason = '';
  
  // Example logic for suggesting upgrades based on specific answer combinations
  const hasInternalTeam = selectedOptions['internal-team'] === 'yes';
  const needsCriticalSupport = selectedOptions['support-frequency'] === 'critical';
  const needsInnovation = selectedOptions['cloud-maturity'] === 'expert';
  const hasSecurityIssues = selectedOptions['security'] === 'need-help';
  const needsOptimization = selectedOptions['cost-management'] === 'optimization' || 
                           selectedOptions['cost-management'] === 'advanced-finops';
  const needsDedicatedComm = selectedOptions['communication'] === 'slack-support';
  
  if (recommendedPlan === 'essential') {
    if (needsInnovation || needsOptimization || needsDedicatedComm) {
      suggestedUpgrade = 'advanced';
      reason = 'Sua necessidade de otimização contínua e comunicação via Slack seria melhor atendida pelo plano Advanced com Squad DevOps dedicado.';
    }
  } else if (recommendedPlan === 'advanced') {
    if (needsInnovation && (hasSecurityIssues || selectedOptions['communication'] === 'dedicated-team')) {
      suggestedUpgrade = 'premier';
      reason = 'Para empresas com alta maturidade que precisam de inovação contínua e atendimento personalizado, o Premier oferece recursos avançados.';
    }
  }
  
  return suggestedUpgrade ? { suggest: true, upgrade: suggestedUpgrade, reason } : null;
};
