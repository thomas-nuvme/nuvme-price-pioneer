export type PlanType = 'together' | 'essential' | 'advanced' | 'premier';

export interface Plan {
  id: PlanType;
  name: string;
  description: string;
  color: string;
  tailwindColor: string;
  textColor: string;
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
    textColor: 'text-nuvme-dark'
  },
  { 
    id: 'essential', 
    name: 'Essential', 
    description: 'Suporte imediato para empresas em expansão', 
    color: '#00C7B1',
    tailwindColor: 'bg-nuvme-teal',
    textColor: 'text-white'
  },
  { 
    id: 'advanced', 
    name: 'Advanced', 
    description: 'Monitoramento proativo e inovação contínua', 
    color: '#0074BB',
    tailwindColor: 'bg-nuvme-blue',
    textColor: 'text-white'
  },
  { 
    id: 'premier', 
    name: 'Premier', 
    description: 'Suporte crítico e otimização completa para grandes empresas', 
    color: '#7E69AB',
    tailwindColor: 'bg-purple-600',
    textColor: 'text-white'
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
        text: 'Sim, temos um time dedicado', 
        plans: ['together'] 
      },
      { 
        id: 'partial', 
        text: 'Sim, mas é pequeno e não cobre todas as necessidades', 
        plans: ['essential', 'advanced'] 
      },
      { 
        id: 'no', 
        text: 'Não, dependemos totalmente de parceiros para suporte e gestão da AWS', 
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
        plans: ['together'] 
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
        text: 'Quero suporte imediato para resolver incidentes', 
        plans: ['essential'] 
      },
      { 
        id: 'proactive', 
        text: 'Quero uma equipe dedicada para monitorar e corrigir problemas automaticamente', 
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
        plans: ['advanced'] 
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
  }
];

export const getPlanRecommendation = (selectedOptions: Record<string, string>): PlanType[] => {
  // Start with all plans available
  let availablePlans: PlanType[] = ['together', 'essential', 'advanced', 'premier'];
  
  // Filter plans based on each question answered
  Object.entries(selectedOptions).forEach(([questionId, optionId]) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;
    
    const option = question.options.find(o => o.id === optionId);
    if (!option) return;
    
    // Keep only plans that are compatible with this answer
    availablePlans = availablePlans.filter(plan => option.plans.includes(plan));
  });
  
  return availablePlans;
};
