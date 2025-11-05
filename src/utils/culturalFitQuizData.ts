export interface CulturalFitQuestion {
  id: string;
  dimension: string;
  text: string;
  options: {
    id: string;
    text: string;
    score: number;
  }[];
}

export type FitLevel = 'high' | 'medium' | 'low';

export interface FitResult {
  level: FitLevel;
  score: number;
  description: string;
  recommendations: string[];
}

export const culturalFitQuestions: CulturalFitQuestion[] = [
  {
    id: 'transparency',
    dimension: 'Transparência & Verdade',
    text: 'Como você lida com problemas e desafios técnicos?',
    options: [
      { id: 'open', text: 'Compartilhamos abertamente problemas e buscamos soluções colaborativas', score: 1 },
      { id: 'selective', text: 'Compartilhamos apenas quando necessário', score: 0.5 },
      { id: 'closed', text: 'Preferimos resolver internamente antes de compartilhar', score: 0 }
    ]
  },
  {
    id: 'partnership',
    dimension: 'Parceria de Longo Prazo',
    text: 'Como você enxerga o relacionamento com parceiros de cloud?',
    options: [
      { id: 'longterm', text: 'Buscamos parceria de longo prazo e crescimento conjunto', score: 1 },
      { id: 'project', text: 'Focamos em projetos específicos com possibilidade de extensão', score: 0.5 },
      { id: 'transactional', text: 'Preferimos fornecedores transacionais, projeto a projeto', score: 0 }
    ]
  },
  {
    id: 'proactivity',
    dimension: 'Proatividade & Autonomia',
    text: 'Qual o nível de autonomia que você espera do parceiro de cloud?',
    options: [
      { id: 'high-autonomy', text: 'Esperamos proatividade e sugestões de melhorias sem precisar solicitar', score: 1 },
      { id: 'guided', text: 'Esperamos que execute o que pedimos com algumas sugestões', score: 0.5 },
      { id: 'controlled', text: 'Preferimos controle total e execução conforme orientamos', score: 0 }
    ]
  },
  {
    id: 'communication',
    dimension: 'Comunicação & Agilidade',
    text: 'Como você prefere se comunicar com seu parceiro de cloud?',
    options: [
      { id: 'realtime', text: 'Comunicação em tempo real via Slack/WhatsApp para agilidade', score: 1 },
      { id: 'mixed', text: 'Mix de e-mail e mensagens instantâneas conforme urgência', score: 0.5 },
      { id: 'formal', text: 'Preferimos comunicação formal via e-mail e tickets', score: 0 }
    ]
  },
  {
    id: 'best-practices',
    dimension: 'Abertura a Boas Práticas & Acessos',
    text: 'Qual sua postura em relação a boas práticas e acesso à infraestrutura?',
    options: [
      { id: 'open-access', text: 'Damos acesso completo e confiamos nas recomendações técnicas', score: 1 },
      { id: 'reviewed', text: 'Damos acesso, mas revisamos recomendações antes de implementar', score: 0.5 },
      { id: 'restricted', text: 'Mantemos acesso restrito e controle interno das decisões', score: 0 }
    ]
  },
  {
    id: 'lead-kindness',
    dimension: 'Gentileza do Lead',
    text: 'Como você descreveria o estilo de liderança e interação do time?',
    options: [
      { id: 'collaborative', text: 'Colaborativo, respeitoso e aberto ao diálogo', score: 1 },
      { id: 'professional', text: 'Profissional e objetivo nas interações', score: 0.5 },
      { id: 'demanding', text: 'Direto e exigente com foco em resultados rápidos', score: 0 }
    ]
  },
  {
    id: 'cloud-as-pillar',
    dimension: 'Nuvem como Pilar de Negócio',
    text: 'Qual a importância da nuvem para o seu negócio?',
    options: [
      { id: 'strategic', text: 'Estratégico - a nuvem é fundamental para nossa operação e crescimento', score: 1 },
      { id: 'important', text: 'Importante - usamos nuvem mas não é nosso diferencial', score: 0.5 },
      { id: 'operational', text: 'Operacional - é só onde hospedamos nossa aplicação', score: 0 }
    ]
  }
];

export const calculateFitScore = (answers: Record<string, string>): number => {
  let totalScore = 0;
  
  Object.entries(answers).forEach(([questionId, optionId]) => {
    const question = culturalFitQuestions.find(q => q.id === questionId);
    if (!question) return;
    
    const option = question.options.find(o => o.id === optionId);
    if (!option) return;
    
    totalScore += option.score;
  });
  
  return totalScore;
};

export const getFitResult = (score: number): FitResult => {
  if (score >= 6) {
    return {
      level: 'high',
      score,
      description: 'Excelente fit cultural! Vocês compartilham valores alinhados com a cultura da Nuvme: transparência, parceria de longo prazo e foco em inovação contínua.',
      recommendations: [
        'Recomendamos iniciar uma conversa mais aprofundada sobre parceria estratégica',
        'Considere os planos Advanced ou Premier para aproveitar ao máximo a sinergia',
        'Agende uma reunião para discutir roadmap de longo prazo'
      ]
    };
  } else if (score >= 3) {
    return {
      level: 'medium',
      score,
      description: 'Bom potencial de fit cultural. Há alinhamento em alguns aspectos importantes, mas pode ser necessário ajustar expectativas em certas áreas.',
      recommendations: [
        'Recomendamos uma conversa inicial para alinhar expectativas de parceria',
        'O plano Essential pode ser um bom ponto de partida para construir confiança',
        'Avaliar possibilidade de evolução gradual do relacionamento'
      ]
    };
  } else {
    return {
      level: 'low',
      score,
      description: 'Fit cultural desafiador. Há diferenças significativas na forma de trabalho e expectativas que podem dificultar uma parceria de longo prazo.',
      recommendations: [
        'Recomendamos uma conversa transparente sobre alinhamento de expectativas',
        'Pode ser mais adequado começar com um projeto pontual para avaliar a sinergia',
        'Considerar se as diferenças culturais podem ser superadas com comunicação clara'
      ]
    };
  }
};
