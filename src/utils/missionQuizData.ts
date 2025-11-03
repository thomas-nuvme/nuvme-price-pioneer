import { MissionType } from './calculatorData';

export interface MissionQuizQuestion {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    mission: MissionType;
  }[];
}

export const missionQuizQuestions: MissionQuizQuestion[] = [
  {
    id: 'main-challenge',
    text: 'Como você descreveria seu principal desafio hoje na AWS?',
    options: [
      { 
        id: 'high-costs', 
        text: 'Nossos custos estão altos e não sabemos como otimizar.', 
        mission: 'finops' 
      },
      { 
        id: 'legacy-environment', 
        text: 'Nosso ambiente é antigo, difícil de atualizar e manter.', 
        mission: 'modernization' 
      },
      { 
        id: 'security-concerns', 
        text: 'Precisamos deixar tudo mais seguro, com acessos e backups controlados.', 
        mission: 'security' 
      },
      { 
        id: 'migration-planning', 
        text: 'Estamos planejando migrar sistemas de outro ambiente para a AWS.', 
        mission: 'migration' 
      },
      { 
        id: 'innovation', 
        text: 'Já estamos bem estruturados, queremos evoluir para algo mais inteligente, com IA ou observabilidade.', 
        mission: 'nextgen' 
      },
    ]
  },
  {
    id: 'priority-problem',
    text: 'Se você pudesse resolver apenas um problema técnico agora, qual seria?',
    options: [
      { 
        id: 'reduce-costs', 
        text: 'Reduzir custos mensais e ter previsibilidade.', 
        mission: 'finops' 
      },
      { 
        id: 'automate-deploys', 
        text: 'Automatizar deploys e padronizar infraestrutura.', 
        mission: 'modernization' 
      },
      { 
        id: 'strengthen-security', 
        text: 'Reforçar segurança, auditoria e compliance.', 
        mission: 'security' 
      },
      { 
        id: 'safe-transition', 
        text: 'Fazer a transição de forma segura para a AWS.', 
        mission: 'migration' 
      },
      { 
        id: 'full-visibility', 
        text: 'Ganhar visibilidade total e insights do ambiente.', 
        mission: 'nextgen' 
      },
    ]
  },
  {
    id: 'current-environment',
    text: 'Como está o ambiente atual de vocês?',
    options: [
      { 
        id: 'evaluating-change', 
        text: 'On-premises ou outra nuvem, avaliando mudança.', 
        mission: 'migration' 
      },
      { 
        id: 'no-automation', 
        text: 'AWS funcionando, mas sem automação.', 
        mission: 'modernization' 
      },
      { 
        id: 'automated-no-control', 
        text: 'Já automatizado, mas sem controle de custos.', 
        mission: 'finops' 
      },
      { 
        id: 'mature-needs-innovation', 
        text: 'AWS madura, com necessidade de inovação.', 
        mission: 'nextgen' 
      },
      { 
        id: 'lacks-security', 
        text: 'Falta segurança ou controle de acessos.', 
        mission: 'security' 
      },
    ]
  },
  {
    id: 'future-concerns',
    text: 'Quando pensa no futuro da operação, o que mais te preocupa?',
    options: [
      { 
        id: 'unpredictable-costs', 
        text: 'Custos imprevisíveis e desperdício.', 
        mission: 'finops' 
      },
      { 
        id: 'lack-automation', 
        text: 'Falta de automação e lentidão de entregas.', 
        mission: 'modernization' 
      },
      { 
        id: 'data-breach', 
        text: 'Vazamento de dados ou falhas de segurança.', 
        mission: 'security' 
      },
      { 
        id: 'solid-foundation', 
        text: 'Falta de base sólida na AWS para crescer.', 
        mission: 'migration' 
      },
      { 
        id: 'lack-visibility', 
        text: 'Falta de visibilidade sobre performance e decisões técnicas.', 
        mission: 'nextgen' 
      },
    ]
  },
  {
    id: 'infrastructure-management',
    text: 'Como vocês gerenciam hoje sua infraestrutura AWS?',
    options: [
      { 
        id: 'manually', 
        text: 'Manualmente, sem muita automação.', 
        mission: 'modernization' 
      },
      { 
        id: 'scripts-no-cost-control', 
        text: 'Temos scripts, mas pouco controle de custo.', 
        mission: 'finops' 
      },
      { 
        id: 'governance-priority', 
        text: 'Temos governança e segurança priorizadas.', 
        mission: 'security' 
      },
      { 
        id: 'migrating-starting', 
        text: 'Estamos migrando ou começando agora.', 
        mission: 'migration' 
      },
      { 
        id: 'advanced-dashboards', 
        text: 'Temos dashboards e automações avançadas.', 
        mission: 'nextgen' 
      },
    ]
  },
  {
    id: 'main-gain',
    text: 'Qual seria o principal ganho que vocês buscam com a Nuvme?',
    options: [
      { 
        id: 'reduce-optimize-costs', 
        text: 'Reduzir custos e otimizar faturas.', 
        mission: 'finops' 
      },
      { 
        id: 'modernize-automate', 
        text: 'Modernizar a operação e automatizar processos.', 
        mission: 'modernization' 
      },
      { 
        id: 'elevate-security', 
        text: 'Elevar segurança e governança.', 
        mission: 'security' 
      },
      { 
        id: 'correct-migration', 
        text: 'Fazer a migração correta e sem dor.', 
        mission: 'migration' 
      },
      { 
        id: 'innovate-intelligence', 
        text: 'Inovar com inteligência e observabilidade.', 
        mission: 'nextgen' 
      },
    ]
  },
  {
    id: 'support-expectation',
    text: 'Caso não haja um projeto específico (apenas suporte), qual dessas opções melhor descreve a expectativa?',
    options: [
      { 
        id: 'stability-predictability', 
        text: 'Quero estabilidade e previsibilidade de custos.', 
        mission: 'finops' 
      },
      { 
        id: 'modern-standardized', 
        text: 'Quero que o ambiente funcione de forma moderna e padronizada.', 
        mission: 'modernization' 
      },
      { 
        id: 'secure-monitored', 
        text: 'Quero que tudo esteja seguro e monitorado.', 
        mission: 'security' 
      },
      { 
        id: 'structure-reorganize', 
        text: 'Quero ajuda para estruturar ou reorganizar nossa conta.', 
        mission: 'migration' 
      },
      { 
        id: 'intelligent-monitoring', 
        text: 'Quero evoluir com monitoramento inteligente e insights.', 
        mission: 'nextgen' 
      },
    ]
  },
];

export const getMissionRecommendation = (answers: Record<string, string>): MissionType => {
  const missionCounts: Record<MissionType, number> = {
    'modernization': 0,
    'security': 0,
    'migration': 0,
    'finops': 0,
    'nextgen': 0,
  };

  // Count votes for each mission based on answers
  Object.entries(answers).forEach(([questionId, optionId]) => {
    const question = missionQuizQuestions.find(q => q.id === questionId);
    if (!question) return;
    
    const option = question.options.find(o => o.id === optionId);
    if (!option) return;
    
    missionCounts[option.mission]++;
  });

  // Find mission with highest count
  let recommendedMission: MissionType = 'modernization';
  let maxCount = 0;

  Object.entries(missionCounts).forEach(([mission, count]) => {
    if (count > maxCount) {
      maxCount = count;
      recommendedMission = mission as MissionType;
    }
  });

  return recommendedMission;
};
