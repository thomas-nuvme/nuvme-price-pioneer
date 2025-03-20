export type PlanType = 'together' | 'essential' | 'advanced' | 'premier';

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
    id: 'together', 
    name: 'Together', 
    description: 'Para empresas pequenas com time interno de cloud', 
    color: '#B2D4E8',
    tailwindColor: 'bg-nuvme-light-blue',
    textColor: 'text-nuvme-dark',
    tagline: 'Para empresas que querem crescer na AWS, mas não precisam de suporte técnico contínuo',
    included: [
      'Faturamento AWS via Reais → Gestão simplificada dos custos AWS, eliminando complexidades cambiais e permitindo pagamento via boleto.',
      'Monitoramento e Alertas → Receba notificações sobre picos de uso, falhas potenciais e oportunidades de otimização no ambiente AWS.',
      'Gerente de Contas com Reuniões Agendadas → Um contato direto para discutir melhorias e estratégias no ambiente AWS.',
      'Laboratório de Inovação (PoCs) → Suporte para experimentação de novas tecnologias AWS e testes de conceito.',
      'Relatórios de Custos → Relatórios periódicos com insights para previsibilidade financeira.',
      'Painel Nuvme → Ferramenta para gestão centralizada da AWS, permitindo acompanhar custos e infraestrutura.'
    ],
    notIncluded: [
      'Suporte Técnico Contínuo → A Nuvme não atuará diretamente em incidentes ou problemas técnicos.',
      'Intervenções Operacionais → Não realizamos ajustes no ambiente AWS do cliente.',
      'Correção Imediata de Problemas → Se ocorrer uma falha crítica, o cliente será notificado, mas a ação deve ser dele.'
    ],
    forWho: [
      'Startups e pequenas empresas que ainda não precisam de suporte técnico ativo, mas querem acompanhamento estratégico.',
      'Empresas que já têm um time interno de cloud e só precisam de monitoramento e gestão de custos.',
      'Negócios que buscam previsibilidade financeira, mas não precisam de respostas imediatas a incidentes.'
    ],
    example: 'Uma fintech de médio porte está crescendo e usa AWS para rodar seu sistema. Eles já têm um engenheiro de DevOps interno, então não precisam de suporte técnico da Nuvme. No entanto, querem monitoramento de custos, relatórios financeiros detalhados e um gerente de contas para discutir otimizações estratégicas. O plano Together atende perfeitamente.'
  },
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
    id: 'company-size',
    text: 'Qual o porte da sua empresa?',
    helpText: 'Ajuda a entender a complexidade do ambiente e suporte necessário',
    options: [
      { 
        id: 'small', 
        text: 'Pequena (até 10 funcionários, 1-2 workloads na AWS)', 
        plans: ['together', 'essential'] 
      },
      { 
        id: 'medium', 
        text: 'Média (10-50 funcionários, múltiplas aplicações na AWS, expansão em curso)', 
        plans: ['essential', 'advanced'] 
      },
      { 
        id: 'large', 
        text: 'Grande (50+ funcionários, infraestrutura robusta e alta carga de trabalho na AWS)', 
        plans: ['advanced', 'premier'] 
      }
    ]
  },
  {
    id: 'internal-team',
    text: 'Sua empresa tem um time interno de cloud ou DevOps?',
    helpText: 'Ajuda a definir se a empresa precisa de suporte ativo ou apenas acompanhamento estratégico',
    options: [
      { 
        id: 'yes', 
        text: 'Não, temos um time de Desenvolvedores que conhecem de Cloud', 
        plans: ['together','essential'] 
      },
      { 
        id: 'partial', 
        text: 'Sim, mas é pequeno ', 
        plans: ['essential', 'advanced'] 
      },
      { 
        id: 'no', 
        text: 'Sim, temos um time de DevOps, Cloud ou parceiro dedicado', 
        plans: ['advanced', 'premier'] 
      }
    ]
  },
  {
    id: 'cost-management',
    text: 'Como sua empresa gerencia custos na AWS?',
    helpText: 'Ajuda a determinar a necessidade de FinOps e otimização de custos',
    options: [
      { 
        id: 'none', 
        text: 'Não gerenciamos, pagamos as faturas sem análise detalhada', 
        plans: ['together','essential'] 
      },
      { 
        id: 'partial', 
        text: 'Fazemos algumas análises, mas sem um processo estruturado', 
        plans: ['essential', 'advanced'] 
      },
      { 
        id: 'complete', 
        text: 'Temos um controle rígido de custos e buscamos otimização constante', 
        plans: ['advanced', 'premier'] 
      }
    ]
  },
  {
    id: 'critical-support',
    text: 'Caso ocorra um problema crítico no ambiente, o que você espera da Nuvme?',
    helpText: 'Ajuda a entender a urgência e necessidade de suporte técnico ativo',
    options: [
      { 
        id: 'alert', 
        text: 'Quero ser informado do problema e decidir como agir', 
        plans: ['together'] 
      },
      { 
        id: 'support', 
        text: 'Quero suporte para resolver incidentes', 
        plans: ['essential'] 
      },
      { 
        id: 'proactive', 
        text: 'Quero uma equipe que vá agir de forma imediata para resolver incidentes', 
        plans: ['advanced', 'premier'] 
      }
    ]
  },
  {
    id: 'innovation',
    text: 'Qual nível de inovação sua empresa busca na AWS?',
    helpText: 'Ajuda a identificar se precisa de acesso ao Laboratório de Inovação, observabilidade avançada, IA e ML',
    options: [
      { 
        id: 'stability', 
        text: 'Só queremos manter a infraestrutura estável e segura', 
        plans: ['together', 'essential'] 
      },
      { 
        id: 'moderate', 
        text: 'Queremos explorar novas tecnologias, mas sem pressa', 
        plans: ['essential','advanced'] 
      },
      { 
        id: 'continuous', 
        text: 'Precisamos de inovação contínua, testes de conceito e automação avançada', 
        plans: ['premier'] 
      }
    ]
  },
  {
    id: 'security',
    text: 'Sua empresa já enfrentou problemas de segurança ou compliance na AWS?',
    helpText: 'Ajuda a definir a necessidade de módulos de segurança avançada no Premier',
    options: [
      { 
        id: 'no', 
        text: 'Não, nunca enfrentamos problemas', 
        plans: ['together', 'essential'] 
      },
      { 
        id: 'solved', 
        text: 'Sim, mas conseguimos resolver internamente', 
        plans: ['essential', 'advanced'] 
      },
      { 
        id: 'need-help', 
        text: 'Sim, e precisamos de suporte especializado', 
        plans: ['premier'] 
      }
    ]
  },
  {
    id: 'optimization',
    text: 'Você precisa de um time dedicado para otimizar performance e custo constantemente?',
    helpText: 'Diferencia quem precisa de apenas suporte técnico e quem precisa de FinOps/DevOps dedicados',
    options: [
      { 
        id: 'no', 
        text: 'Não, só precisamos de suporte quando necessário', 
        plans: ['together', 'essential'] 
      },
      { 
        id: 'yes', 
        text: 'Sim, queremos acompanhamento técnico contínuo', 
        plans: ['advanced', 'premier'] 
      }
    ]
  },
];

export const getPlanRecommendation = (selectedOptions: Record<string, string>): PlanType => {
  // Initialize with lowest tier plan
  let recommendedPlan: PlanType = 'together';
  
  // Count recommendations for each plan type
  const planCounts: Record<PlanType, number> = {
    'together': 0,
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
  
  // If a feature is only available in Essential and not in Together, we need Essential
  if (planCounts['essential'] > 0 && !optionsCompatibleWithAllPlans(selectedOptions, ['together'])) {
    recommendedPlan = 'essential';
  }
  
  // If a feature is only available in Advanced and not in Essential or Together, we need Advanced
  if (planCounts['advanced'] > 0 && !optionsCompatibleWithAllPlans(selectedOptions, ['together', 'essential'])) {
    recommendedPlan = 'advanced';
  }
  
  // If a feature is only available in Premier, we need Premier
  if (planCounts['premier'] > 0 && !optionsCompatibleWithAllPlans(selectedOptions, ['together', 'essential', 'advanced'])) {
    recommendedPlan = 'premier';
  }
  
  return recommendedPlan;
};

// Helper function to check if all selected options are compatible with at least one of the provided plans
function optionsCompatibleWithAllPlans(selectedOptions: Record<string, string>, planTypes: PlanType[]): boolean {
  for (const [questionId, optionId] of Object.entries(selectedOptions)) {
    const question = questions.find(q => q.id === questionId);
    if (!question) continue;
    
    const option = question.options.find(o => o.id === optionId);
    if (!option) continue;
    
    // Check if this option is compatible with at least one of the provided plans
    const isCompatible = option.plans.some(plan => planTypes.includes(plan));
    
    // If any option is not compatible with the provided plans, return false
    if (!isCompatible) {
      return false;
    }
  }
  
  // All options are compatible with at least one of the provided plans
  return true;
}

export const suggestUpgrade = (selectedOptions: Record<string, string>, recommendedPlan: PlanType): { suggest: boolean, upgrade: PlanType, reason: string } | null => {
  // If already at the highest tier (premier), no upgrade to suggest
  if (recommendedPlan === 'premier') return null;
  
  // Look for specific patterns that might suggest an upgrade
  let suggestedUpgrade: PlanType | null = null;
  let reason = '';
  
  // Example logic for suggesting upgrades based on specific answer combinations
  const hasInternalTeam = selectedOptions['internal-team'] === 'yes';
  const needsCriticalSupport = selectedOptions['critical-support'] === 'proactive';
  const needsInnovation = selectedOptions['innovation'] === 'continuous';
  const hasSecurityIssues = selectedOptions['security'] === 'need-help';
  const needsOptimization = selectedOptions['optimization'] === 'yes';
  
  if (recommendedPlan === 'together') {
    if (needsCriticalSupport || needsOptimization) {
      suggestedUpgrade = 'essential';
      reason = 'Você indicou que precisa de suporte técnico ativo para problemas críticos, o que não está disponível no plano Together.';
    }
  } else if (recommendedPlan === 'essential') {
    if (needsInnovation || needsOptimization) {
      suggestedUpgrade = 'advanced';
      reason = 'Sua necessidade de otimização contínua e inovação seria melhor atendida pelo plano Advanced com Squad DevOps dedicado.';
    }
  } else if (recommendedPlan === 'advanced') {
    if (needsInnovation && hasSecurityIssues) {
      suggestedUpgrade = 'premier';
      reason = 'Para empresas que precisam de inovação contínua e têm preocupações avançadas de segurança, o Premier oferece recursos de observabilidade e suporte personalizado.';
    }
  }
  
  return suggestedUpgrade ? { suggest: true, upgrade: suggestedUpgrade, reason } : null;
};
