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
    description: 'Cloud Management Foundation', 
    color: '#00C7B1',
    tailwindColor: 'bg-nuvme-teal',
    textColor: 'text-white',
    tagline: 'O primeiro passo para uma operação em nuvem segura, organizada e sob controle.',
    included: [
      'Atendimento através de tickets, WhatsApp e e-mail',
      'Suporte disponível em horário comercial (8x5)',
      'Monitoramento de instâncias com Zabbix',
      'Relatórios detalhados de custos AWS',
      'Notificações sobre custos, instâncias reservadas e segurança',
      'Automação de tarefas na infraestrutura AWS',
      'Pagamento de faturas AWS via boleto bancário',
      'Elaboração de POCs junto à AWS'
    ],
    notIncluded: [],
    forWho: [
      'Iniciando operação AWS',
      'Busca base, visibilidade e segurança inicial'
    ],
    example: 'Empresas que estão começando na AWS e precisam de uma base sólida de monitoramento e suporte.'
  },
  { 
    id: 'advanced', 
    name: 'Advanced', 
    description: 'DevOps as a Service', 
    color: '#0074BB',
    tailwindColor: 'bg-nuvme-blue',
    textColor: 'text-white',
    tagline: 'Seu time de Cloud trabalhando junto com o seu negócio, todos os dias.',
    included: [
      'Suporte via Slack e WhatsApp',
      'Suporte Ilimitado',
      'Abertura de Chamados estruturados',
      'Monitoramento Avançado',
      'Eventos de Segurança com resposta',
      'Práticas FinOps recorrentes',
      'Squad DevOps atuando na conta',
      'Squads de FinOps, MLOps, Observabilidade e DevSecOps',
      'Suporte de Banco de Dados',
      'Cadência de jornada (revisões regulares)',
      'Laboratório de Inovação (POCs)',
      'Faturamento AWS via Reais'
    ],
    notIncluded: [],
    forWho: [
      'Já roda produção na AWS',
      'Quer gestão ativa do ambiente'
    ],
    example: 'Empresas que precisam de um time dedicado para otimização contínua e melhorias.'
  },
  { 
    id: 'premier', 
    name: 'Premier', 
    description: 'Cloud Excellence Partnership', 
    color: '#7E69AB',
    tailwindColor: 'bg-purple-600',
    textColor: 'text-white',
    tagline: 'A Nuvme como parte da sua estratégia de crescimento, acelerando inovação e performance.',
    included: [
      'Tudo do Advanced',
      'Observabilidade Avançada (métricas, logs, tracing)',
      'Eventos de Segurança Reforçados',
      'Monitoramento de Performance em Tempo Real',
      'Performance Tuning',
      'Avaliação Arquitetural Completa',
      'Acompanhamento Estratégico frequente',
      'Automação Inteligente',
      'Suporte Personalizado',
      'Consultoria Técnica Avançada'
    ],
    notIncluded: [],
    forWho: [
      'Ambientes críticos',
      'Exige confiabilidade, performance e evolução contínua'
    ],
    example: 'Empresas com operações críticas que não podem ter downtime e precisam de máxima performance.'
  },
];

export const questions: Question[] = [
  {
    id: 'relationship',
    text: '1. Relação desejada com a Nuvme',
    helpText: 'Como você imagina o relacionamento ideal com um parceiro de cloud?',
    options: [
      { 
        id: 'stable-base', 
        text: 'Base estável e orientação reativa comercial.', 
        plans: ['essential'] 
      },
      { 
        id: 'daily-comanagement', 
        text: 'Co-gestão diária e evolução contínua.', 
        plans: ['advanced'] 
      },
      { 
        id: 'strategic-partnership', 
        text: 'Parceria estratégica com foco em performance/inovação.', 
        plans: ['premier'] 
      }
    ]
  },
  {
    id: 'incident-handling',
    text: '2. Tratamento de incidentes/eventos',
    helpText: 'Como você espera que incidentes sejam tratados?',
    options: [
      { 
        id: 'notification', 
        text: 'Notificação e orientação.', 
        plans: ['essential'] 
      },
      { 
        id: 'active-response', 
        text: 'Resposta ativa e acompanhamento contínuo.', 
        plans: ['advanced'] 
      },
      { 
        id: 'systemic-improvement', 
        text: 'Resposta + melhoria sistêmica (tuning/arquitetura).', 
        plans: ['premier'] 
      }
    ]
  },
  {
    id: 'interaction-rhythm',
    text: '3. Ritmo de interação',
    helpText: 'Com que frequência você precisa de interação com o time de cloud?',
    options: [
      { 
        id: 'reactive-support', 
        text: 'Suporte reativo + revisões básicas.', 
        plans: ['essential'] 
      },
      { 
        id: 'recurring-rituals', 
        text: 'Ritos recorrentes (Slack/WhatsApp ilimitado, revisões).', 
        plans: ['advanced'] 
      },
      { 
        id: 'executive-tracking', 
        text: 'Acompanhamento executivo frequente e planejamento conjunto.', 
        plans: ['premier'] 
      }
    ]
  },
  {
    id: 'objective-3-6-months',
    text: '4. Objetivo 3–6 meses',
    helpText: 'Qual o principal objetivo para os próximos meses?',
    options: [
      { 
        id: 'organize', 
        text: 'Organizar a casa (boas práticas/visibilidade).', 
        plans: ['essential'] 
      },
      { 
        id: 'efficiency', 
        text: 'Ganhar eficiência (co-gestão, automação, FinOps recorrente).', 
        plans: ['advanced'] 
      },
      { 
        id: 'performance-innovation', 
        text: 'Elevar performance & inovar (obs. avançada, tuning, roadmap).', 
        plans: ['premier'] 
      }
    ]
  },
  {
    id: 'finops-expected',
    text: '5. FinOps esperado',
    helpText: 'Que tipo de gestão financeira de cloud você precisa?',
    options: [
      { 
        id: 'alerts-reports', 
        text: 'Alertas/relatórios para visibilidade.', 
        plans: ['essential'] 
      },
      { 
        id: 'recurring-practices', 
        text: 'Práticas recorrentes (right-sizing, SP/RI/Spot).', 
        plans: ['advanced'] 
      },
      { 
        id: 'strategic-finops', 
        text: 'FinOps integrado à estratégia e decisões executivas.', 
        plans: ['premier'] 
      }
    ]
  },
  {
    id: 'observability-decision',
    text: '6. Observabilidade/decisão',
    helpText: 'Qual nível de observabilidade você precisa?',
    options: [
      { 
        id: 'essential-indicators', 
        text: 'Indicadores essenciais.', 
        plans: ['essential'] 
      },
      { 
        id: 'advanced-monitoring', 
        text: 'Monitoramento avançado com resposta.', 
        plans: ['advanced'] 
      },
      { 
        id: 'advanced-observability', 
        text: 'Observabilidade avançada (métricas, logs, tracing) para guiar o negócio.', 
        plans: ['premier'] 
      }
    ]
  }
];

export const getPlanRecommendation = (selectedOptions: Record<string, string>): PlanType => {
  const planCounts: Record<PlanType, number> = {
    'essential': 0,
    'advanced': 0,
    'premier': 0
  };
  
  Object.entries(selectedOptions).forEach(([questionId, optionId]) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;
    
    const option = question.options.find(o => o.id === optionId);
    if (!option) return;
    
    option.plans.forEach(plan => {
      planCounts[plan]++;
    });
  });
  
  // Recommend the plan with most votes
  if (planCounts.premier >= 3) return 'premier';
  if (planCounts.advanced >= 3) return 'advanced';
  return 'essential';
};

export const suggestUpgrade = (selectedOptions: Record<string, string>, recommendedPlan: PlanType): { suggest: boolean, upgrade: PlanType, reason: string } | null => {
  if (recommendedPlan === 'premier') return null;
  
  let suggestedUpgrade: PlanType | null = null;
  let reason = '';
  
  const needsInnovation = selectedOptions['objective-3-6-months'] === 'performance-innovation';
  const needsAdvancedFinOps = selectedOptions['finops-expected'] === 'strategic-finops';
  const needsAdvancedObs = selectedOptions['observability-decision'] === 'advanced-observability';
  
  if (recommendedPlan === 'essential') {
    if (selectedOptions['interaction-rhythm'] === 'recurring-rituals' || 
        selectedOptions['finops-expected'] === 'recurring-practices') {
      suggestedUpgrade = 'advanced';
      reason = 'Sua necessidade de co-gestão e otimização contínua seria melhor atendida pelo plano Advanced com Squad DevOps dedicado.';
    }
  } else if (recommendedPlan === 'advanced') {
    if (needsInnovation || needsAdvancedFinOps || needsAdvancedObs) {
      suggestedUpgrade = 'premier';
      reason = 'Para empresas com alta maturidade que precisam de performance máxima e inovação contínua, o Premier oferece recursos avançados.';
    }
  }
  
  return suggestedUpgrade ? { suggest: true, upgrade: suggestedUpgrade, reason } : null;
};
