import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/Icon";
import { Zap, Settings, Crown } from "lucide-react";

const plans = [
  {
    id: "essential",
    name: "Essential",
    subtitle: "Cloud Management Foundation",
    tagline: "O primeiro passo para uma operação em nuvem segura, organizada e sob controle.",
    icon: Zap,
    color: "#00C7B1",
    sections: [
      {
        title: "Atendimento ao Cliente",
        items: [
          "Atendimento através de tickets, WhatsApp, e-mail e Slack",
          "Suporte disponível em horário comercial (8x5)"
        ]
      },
      {
        title: "Monitoramento",
        items: [
          "Monitoramento de instâncias com Zabbix, garantindo visibilidade e performance dos recursos AWS"
        ]
      },
      {
        title: "Relatórios e Notificações",
        items: [
          "Relatórios detalhados de acompanhamento de custos AWS",
          "Notificações sobre custos e otimização financeira",
          "Notificações sobre instâncias reservadas e consumo de infraestrutura",
          "Monitoramento de bancos de dados",
          "Alterações na infraestrutura AWS",
          "Eventos de segurança e conformidade"
        ]
      },
      {
        title: "Consultoria e Suporte Adicional",
        items: [
          "Automação de tarefas na infraestrutura AWS para otimização de operações",
          "Pagamento de faturas AWS via boleto bancário, facilitando a gestão financeira",
          "Elaboração de POCs (Proof of Concept) junto à AWS para teste de novos serviços"
        ]
      }
    ],
    forWho: "Iniciando operação AWS; busca base, visibilidade e segurança inicial."
  },
  {
    id: "advanced",
    name: "Advanced",
    subtitle: "DevOps as a Service",
    tagline: "Seu time de Cloud trabalhando junto com o seu negócio, todos os dias.",
    icon: Settings,
    color: "#0074BB",
    sections: [
      {
        title: "Suporte e Atendimento Diferenciado",
        items: [
          "Suporte via Slack → Nossa equipe estará disponível em um canal dedicado no Slack, garantindo comunicação ágil",
          "Suporte via WhatsApp → Para casos urgentes e comunicação direta com nossos especialistas",
          "Suporte Ilimitado → Não há restrições no número de chamados e atendimentos",
          "Abertura de Chamados → Sistema de tickets estruturado para formalizar demandas"
        ]
      },
      {
        title: "Monitoramento",
        items: [
          "Monitoramento Avançado → Acompanhamento contínuo da infraestrutura AWS com alertas personalizados",
          "Eventos de Segurança → Análise de logs, detecção de vulnerabilidades, resposta rápida a incidentes",
          "Relatórios e Notificações de Custos → Monitoramento detalhado dos gastos AWS"
        ]
      },
      {
        title: "FinOps e Otimização de Custos",
        items: [
          "Práticas FinOps → Implementação de práticas FinOps para controle de custos",
          "Faturamento AWS via Reais → Facilidade no pagamento da AWS diretamente em reais",
          "Cadência de Jornada → Reuniões regulares para alinhar estratégias de crescimento"
        ]
      },
      {
        title: "Infraestrutura, DevOps e Inovação",
        items: [
          "Squad DevOps → Nossa equipe de DevOps atua diretamente na infraestrutura do cliente",
          "Squads de FinOps, MLOps, Observabilidade e DevSecOps",
          "Suporte de Banco de Dados → Gerenciamento, otimização de performance e backup",
          "Laboratório de Inovação → Desenvolvimento de POCs para testar novos serviços da AWS"
        ]
      }
    ],
    forWho: "Já roda produção na AWS e quer gestão ativa do ambiente."
  },
  {
    id: "premier",
    name: "Premier",
    subtitle: "Cloud Excellence Partnership",
    tagline: "A Nuvme como parte da sua estratégia de crescimento, acelerando inovação e performance.",
    icon: Crown,
    color: "#7E69AB",
    sections: [
      {
        title: "Tudo do Plano Advanced",
        items: [
          "Projetos Inclusos → Execução de projetos de infraestrutura e DevOps sem custo adicional",
          "Suporte via Slack e WhatsApp → Comunicação ágil e suporte prioritário",
          "Squad DevOps → Time especializado atuando diretamente na sua infraestrutura AWS",
          "Monitoramento Avançado → Detecção e resolução de problemas antes que impactem a operação",
          "Eventos de Segurança → Monitoramento contínuo e resposta a ameaças cibernéticas",
          "FinOps Básico → Otimização de custos e eficiência financeira na AWS",
          "Laboratório de Inovação → Testes e POCs para novos serviços e soluções AWS",
          "Faturamento AWS via Reais → Facilidade no pagamento sem barreiras cambiais",
          "Suporte de Banco de Dados → Gestão e otimização de performance",
          "Relatórios e Notificações de Custos → Acompanhamento detalhado dos gastos AWS",
          "Abertura de Chamados e Suporte Ilimitado → Atendimento contínuo e sem restrições"
        ]
      },
      {
        title: "Monitoramento e Observabilidade Avançada",
        items: [
          "Observabilidade Avançada → Implementação de monitoramento aprofundado com métricas detalhadas",
          "Eventos de Segurança Reforçados → Detecção e resposta aprimorada para ameaças cibernéticas",
          "Monitoramento de Performance em Tempo Real → Análise detalhada de workloads"
        ]
      },
      {
        title: "Otimização Contínua e Performance",
        items: [
          "Performance Tuning → Ajustes contínuos para garantir máximo desempenho das aplicações",
          "Avaliação Arquitetural Completa → Revisão periódica da arquitetura AWS",
          "Acompanhamento Estratégico → Reuniões frequentes para discutir crescimento",
          "Automação Inteligente → Implementação de scripts, pipelines e processos automatizados"
        ]
      },
      {
        title: "Suporte Personalizado e Consultoria Técnica Avançada",
        items: [
          "Suporte Personalizado → Atendimento especializado para demandas exclusivas",
          "Suporte de Banco de Dados → Nossa equipe atua lado a lado com o time do cliente",
          "Laboratório de Inovação → Desenvolvimento de roadmaps tecnológicos"
        ]
      }
    ],
    forWho: "Ambientes críticos que exigem confiabilidade, performance e evolução contínua."
  }
];

const Planos = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-foreground">Planos</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Você escolhe o nível de parceria. Não vendemos features — vendemos impacto no negócio.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="h-full border-t-4 hover:shadow-xl transition-shadow" style={{ borderTopColor: plan.color }}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: plan.color }}
                  >
                    <plan.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <p className="text-sm text-muted-foreground font-medium">{plan.subtitle}</p>
                  </div>
                </div>
                <CardDescription className="text-base italic">
                  "{plan.tagline}"
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {plan.sections.map((section, sectionIdx) => (
                  <div key={sectionIdx} className={sectionIdx > 0 ? "pt-4 border-t" : ""}>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Check" className="w-5 h-5 text-green-500" />
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <span className="text-green-500 font-bold mt-0.5 flex-shrink-0">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Icon name="Target" className="w-5 h-5 text-blue-500" />
                    Para quem?
                  </h3>
                  <p className="text-sm text-muted-foreground">{plan.forWho}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Planos;
