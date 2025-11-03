
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Icon } from "@/components/Icon";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MissionType, missions } from "@/utils/calculatorData";
import { motion } from "framer-motion";

// Define the module information structure
interface ModuleInfo {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  forWho: string;
  example: string;
}

// Define the mission information structure
interface MissionInfo {
  id: MissionType;
  title: string;
  summary: string;
  modules: ModuleInfo[];
  conclusion?: string;
}

// Detailed mission data
const missionsInfo: MissionInfo[] = [
  {
    id: "modernization",
    title: "Missão: Modernização",
    summary: "A Missão Modernização é indicada para empresas que desejam evoluir sua infraestrutura e aplicações, adotando boas práticas, automação, escalabilidade e observação avançada. Com foco em DevOps, agilidade e governança, essa missão prepara o ambiente para crescer com segurança, performance e eficiência.",
    modules: [
      {
        id: "cicd",
        icon: "GitBranch",
        title: "Módulo CI/CD",
        subtitle: "Automação de ciclo de vida",
        description: "Configuramos pipelines de CI/CD para automação completa do ciclo de vida das aplicações, utilizando ferramentas como AWS CodePipeline, GitLab CI/CD, Jenkins e Bitbucket. Automatizamos testes, builds, deploys e integrações.",
        forWho: "Empresas que precisam aumentar a produtividade dos times de desenvolvimento e reduzir erros humanos no deploy.",
        example: "Startup SaaS que faz vários deploys por semana e precisa de validação automatizada para ganhar agilidade."
      },
      {
        id: "container",
        icon: "Package",
        title: "Módulo Contêiner",
        subtitle: "Portabilidade e padronização",
        description: "Migramos aplicações para containers (Docker), organizamos em padrões escaláveis e seguros, geralmente usando ECS (Elastic Container Service), e integramos com esteiras de CI/CD.",
        forWho: "Equipes com aplicações legadas ou monolíticas que precisam melhorar portabilidade e eficiência operacional.",
        example: "Empresa que deseja migrar sua API para rodar em containers, com versão padronizada em diferentes ambientes (dev, hml, prod)."
      },
      {
        id: "kubernetes",
        icon: "Ship",
        title: "Módulo Kubernetes",
        subtitle: "Orquestração de containers",
        description: "Criamos clusters no Amazon EKS com boas práticas de segurança, escalabilidade e disponibilidade. Inclui configuração de namespaces, autoscaling, ingress controller, monitoramento, etc.",
        forWho: "Empresas com workloads distribuídos, que buscam confiabilidade e controle para aplicações modernas.",
        example: "Sistema com múltiplas APIs e microsserviços que precisam escalar horizontalmente de forma automática."
      },
      {
        id: "karpenter",
        icon: "BarChart3",
        title: "Módulo Karpenter",
        subtitle: "Otimização de recursos",
        description: "Implementamos o Karpenter para escalonamento automático e inteligente dos nodes do Kubernetes. Permite economia de recursos baseada em demandas reais.",
        forWho: "Empresas que desejam otimizar custos e tornar o cluster mais responsivo às variações de carga.",
        example: "Marketplace que precisa escalar automaticamente em dias de pico (como Black Friday), sem pagar por recursos ociosos."
      },
      {
        id: "gitops",
        icon: "GitMerge",
        title: "Módulo GitOps",
        subtitle: "Infraestrutura como código",
        description: "Adotamos GitOps para controle de infraestrutura e aplicações como código. Toda mudança é auditada e rastreável, utilizando ferramentas como ArgoCD ou FluxCD.",
        forWho: "Times que buscam maior padronização, governança e reversibilidade segura.",
        example: "Squad que quer fazer deploy com apenas um merge na branch principal e aplicações sincronizadas automaticamente."
      },
      {
        id: "database",
        icon: "Database",
        title: "Módulo Database",
        subtitle: "Performance e escalabilidade",
        description: "Modernizamos bancos de dados, otimizando consultas, realizando tunning e migrando para serviços escaláveis com alta disponibilidade (ex: Aurora, RDS).",
        forWho: "Empresas com crescimento de volume de dados ou problemas de performance e custo.",
        example: "E-commerce que sofre lentidão em buscas e relatórios por causa de queries pesadas e banco subdimensionado."
      }
    ],
    conclusion: "Essa missão é ideal para: Startups em fase de crescimento, empresas em transformação digital, times DevOps e produtos SaaS que precisam agilidade, governança e eficiência em nuvem."
  },
  {
    id: "security",
    title: "Missão: Segurança",
    summary: "A Missão Segurança é voltada para empresas que precisam garantir confiança, integridade e proteção contínua em seus ambientes na nuvem. Atuamos com foco em prevenção de riscos, monitoramento, conformidade regulatória e resiliência operacional. Nossa abordagem combina práticas de segurança modernas com automação, governança e visibilidade centralizada.",
    modules: [
      {
        id: "security_practices",
        icon: "Shield",
        title: "Módulo Security Practices",
        subtitle: "Boas práticas de segurança",
        description: "Aplicamos um conjunto robusto de boas práticas de segurança, como criptografia de dados em repouso e trânsito, hardening de sistemas, MFA, política de menor privilégio, segregação de ambientes e revisão contínua de permissões.",
        forWho: "Empresas iniciando na nuvem ou que ainda não têm uma governança sólida de segurança.",
        example: "Startup em expansão que deseja se adequar à LGPD, revisando acessos e protegendo dados de clientes com segurança básica bem implementada."
      },
      {
        id: "skyguard",
        icon: "Eye",
        title: "Módulo SkyGuard",
        subtitle: "Proteção ativa e visibilidade",
        description: "O SkyGuard é nosso módulo mais completo de proteção ativa e visibilidade de segurança em tempo real. Combinamos ferramentas como WAF, GuardDuty, Security Hub, IAM Access Analyzer, Secrets Manager, KMS, CloudTrail e Certificate Manager para prevenir, detectar e responder a ameaças. Também aplicamos controles de governança para garantir conformidade com padrões como ISO 27001, PCI-DSS e LGPD.",
        forWho: "Empresas com ambientes mais expostos (multiusuário, público, híbrido), que precisam de detecção automatizada de ameaças, rastreabilidade de eventos e políticas rígidas de acesso.",
        example: "E-commerce com diversas aplicações expostas em produção, que precisa detectar tentativas de invasão e proteger APIs com controle fino de identidade e certificados."
      },
      {
        id: "security_hub",
        icon: "Lock",
        title: "Módulo Security Hub",
        subtitle: "Central de eventos de segurança",
        description: "Centralizamos todos os eventos de segurança da AWS em um único painel, permitindo que sua equipe tenha visibilidade completa do ambiente, com recomendações de correção automatizadas e classificadas por severidade. Facilitamos a resposta a vulnerabilidades e a conformidade com boas práticas.",
        forWho: "Empresas que utilizam múltiplos serviços AWS e precisam unificar alertas e análises de risco.",
        example: "Empresa SaaS que quer reduzir o tempo de resposta a incidentes e automatizar parte do plano de correção."
      },
      {
        id: "disaster_recovery",
        icon: "CloudRain",
        title: "Módulo Disaster Recovery",
        subtitle: "Continuidade de negócios",
        description: "Projetamos e implementamos estratégias de continuidade com foco em RTO e RPO otimizados, utilizando backups automatizados, replicação entre regiões, ambientes de recuperação com Terraform, e testes periódicos de recuperação.",
        forWho: "Negócios que precisam garantir a continuidade de serviços mesmo diante de falhas críticas, desastres ou perda de dados.",
        example: "Plataforma de educação online que não pode ficar indisponível durante o horário de provas e matrículas."
      },
      {
        id: "conta_cofre",
        icon: "KeyRound",
        title: "Módulo Conta Cofre",
        subtitle: "Proteção de ativos críticos",
        description: "Criamos uma conta dedicada à segurança, isolada do ambiente de produção, que centraliza logs, secrets, trilhas de auditoria, backups sensíveis e ferramentas de compliance. A Conta Cofre aumenta a resiliência contra acessos indevidos e vazamentos, sendo parte da governança multi-conta.",
        forWho: "Empresas que desejam proteger os ativos mais críticos, com segmentação clara e controle estrito de acessos.",
        example: "Instituição financeira que precisa de um cofre digital para armazenar segredos criptográficos e históricos de auditoria."
      }
    ]
  },
  {
    id: "migration",
    title: "Missão: Migração",
    summary: "A Missão Migração é para empresas que desejam mover seus sistemas para a nuvem de forma segura, escalável e com o mínimo de impacto. Atendemos desde infraestruturas locais até workloads em outras nuvens, sempre com foco em performance, compatibilidade e economia.",
    modules: [
      {
        id: "on_premises",
        icon: "Server",
        title: "Módulo On-Premises",
        subtitle: "Migração de infraestrutura local",
        description: "Analisamos a infraestrutura local, mapeamos dependências, projetamos a arquitetura ideal na AWS e executamos um plano de migração com ferramentas específicas para garantir segurança e continuidade operacional.",
        forWho: "Empresas que mantêm servidores físicos (datacenter próprio ou colocation) e desejam migrar para a nuvem.",
        example: "Software house que deseja desativar servidores locais e centralizar operações na AWS, com ganho em elasticidade e redução de custo fixo."
      },
      {
        id: "cloud",
        icon: "Cloud",
        title: "Módulo Cloud",
        subtitle: "Migração entre nuvens",
        description: "Migramos workloads hospedados em outras nuvens (Google Cloud, Azure, etc.) para a AWS, garantindo compatibilidade e segurança. Atuamos na reestruturação da arquitetura para aproveitamento máximo dos recursos nativos da AWS.",
        forWho: "Negócios que já operam em nuvem, mas desejam migrar ou consolidar ambientes na AWS para padronização, governança ou otimização de custos.",
        example: "Startup que iniciou suas operações no Heroku, mas cresceu e precisa de maior controle sobre recursos e infraestrutura escalável."
      }
    ],
    conclusion: "Essa missão é ideal para: Empresas que querem deixar o legado on-premises para trás, consolidar ambientes multicloud ou ganhar maior controle, desempenho e economia com uma infraestrutura moderna na AWS."
  },
  {
    id: "finops",
    title: "Missão: FinOps",
    summary: "A Missão FinOps é para organizações que querem controlar seus custos em nuvem sem comprometer performance. Atuamos com análise contínua, reestruturação arquitetural e automação de recursos para entregar o máximo de eficiência financeira.",
    modules: [
      {
        id: "redução_custos",
        icon: "PiggyBank",
        title: "Módulo Redução de Custos",
        subtitle: "Análise e otimização",
        description: "Realizamos uma análise profunda da conta AWS para identificar desperdícios, instâncias superdimensionadas, serviços ociosos e oportunidades de savings. Sugerimos ou implementamos mudanças com impacto direto no custo.",
        forWho: "Empresas que não acompanham detalhadamente sua fatura e querem entender como reduzir a conta mensal de forma sustentável.",
        example: "Empresa de mídia que roda testes e ambientes temporários, mas mantém recursos ligados 24/7 sem necessidade."
      },
      {
        id: "finops_avancado",
        icon: "BarChart4",
        title: "Módulo FinOps Avançado",
        subtitle: "Gestão financeira contínua",
        description: "Implementamos estratégias contínuas de FinOps, com monitoramento detalhado, otimizações em tempo real, políticas de tags e automações para reservas, escalabilidade e desligamento programado de recursos.",
        forWho: "Empresas que escalam rápido, possuem múltiplas contas ou ambientes, e querem manter controle financeiro sem frear a inovação.",
        example: "SaaS em crescimento que já faz uso intenso de serviços gerenciados, mas busca previsibilidade de custos e otimizações contínuas."
      }
    ],
    conclusion: "Essa missão é ideal para: Empresas com custos elevados ou imprevisíveis em nuvem, que desejam estruturar um processo recorrente de revisão, governança e automação de recursos para gastar melhor, e não apenas menos."
  },
  {
    id: "nextgen",
    title: "Missão: NextGen",
    summary: "A Missão NextGen é voltada para empresas que desejam explorar tecnologias de próxima geração para ganhar vantagem competitiva, acelerar inovação e escalar com eficiência. Aqui, conectamos Inteligência Artificial, Machine Learning, Serverless e Observabilidade em soluções sob medida para organizações modernas e ambiciosas.",
    modules: [
      {
        id: "observability",
        icon: "LineChart",
        title: "Módulo Observabilidade",
        subtitle: "Visibilidade total",
        description: "Implementamos soluções personalizadas de monitoramento, logs e métricas para garantir visibilidade total do seu ambiente. Usamos ferramentas modernas de tracing e análise de desempenho para identificar gargalos e antecipar falhas.",
        forWho: "Empresas que desejam maior controle sobre sua operação e querem atuar de forma proativa frente a falhas e lentidão.",
        example: "Empresa SaaS que precisa entender o comportamento de seus serviços em produção e melhorar a performance para os usuários."
      },
      {
        id: "ia",
        icon: "Brain",
        title: "Módulo IA",
        subtitle: "Inteligência Artificial na nuvem",
        description: "Implementamos pipelines de Inteligência Artificial e IA Generativa na nuvem, desde o treinamento até o deploy de modelos. Automatizamos o ciclo de vida da IA com segurança, eficiência e governança.",
        forWho: "Empresas que desejam usar IA de forma estratégica para gerar valor, mas não possuem infraestrutura nem conhecimento técnico interno.",
        example: "Startup de e-commerce que quer implementar recomendação de produtos baseada em comportamento de navegação e compra."
      },
      {
        id: "ml",
        icon: "Network",
        title: "Módulo ML",
        subtitle: "Machine Learning avançado",
        description: "Criamos ambientes otimizados para desenvolvimento, treinamento e deploy de modelos de Machine Learning, com escalabilidade e automação desde os dados até a entrega de valor.",
        forWho: "Empresas que já utilizam dados, mas querem aplicá-los com mais profundidade e inteligência.",
        example: "Empresa de logística que deseja prever atrasos e otimizar rotas usando modelos preditivos."
      },
      {
        id: "ia-lab",
        icon: "Flask",
        title: "IA Lab",
        subtitle: "Laboratório de inovação",
        description: "Transformamos ideias em realidade por meio de um laboratório focado em IA Generativa. Oferecemos consultoria, validação técnica, PoCs e suporte para acesso a subsídios da AWS.",
        forWho: "Organizações que desejam inovar com IA, mas ainda estão em fase inicial e querem testar hipóteses com baixo risco.",
        example: "Empresa de educação que quer criar um chatbot de tutoria automatizado com IA generativa."
      },
      {
        id: "serverless",
        icon: "ServerCrash",
        title: "Módulo Serverless",
        subtitle: "Aplicações sem servidor",
        description: "Projetamos arquiteturas serverless modernas com foco em escalabilidade, agilidade de deploy e redução de custos operacionais.",
        forWho: "Empresas que precisam escalar sem a complexidade de gerenciar servidores e desejam foco total no produto.",
        example: "Aplicativo mobile que lida com grandes picos de acesso e precisa responder rapidamente com baixo custo."
      }
    ],
    conclusion: "Essa missão é ideal para: Empresas visionárias que enxergam tecnologia como diferencial estratégico, desejam acelerar inovação e adotar IA, automação e observabilidade para crescer com eficiência."
  }
];

const MissionsModulesInfo: React.FC = () => {
  const [activeMission, setActiveMission] = useState<MissionType>("modernization");
  const [expandedModules, setExpandedModules] = useState<string[]>([]);

  const handleExpandModule = (moduleId: string) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId) 
        : [...prev, moduleId]
    );
  };

  const currentMissionInfo = missionsInfo.find(mission => mission.id === activeMission);

  return (
    <div className="mt-16 mb-12">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8">
        Nossas Missões e Módulos
      </h2>
      
      <Tabs 
        defaultValue="modernization" 
        value={activeMission}
        onValueChange={(value) => setActiveMission(value as MissionType)}
        className="w-full"
      >
        <TabsList className="w-full flex flex-wrap justify-center mb-6">
          {missionsInfo.map((mission) => (
            <TabsTrigger 
              key={mission.id} 
              value={mission.id}
              className="flex items-center gap-2 px-4 py-2 data-[state=active]:bg-nuvme-light-teal data-[state=active]:text-nuvme-dark"
            >
              <Icon name={missions.find(m => m.id === mission.id)?.icon || "Rocket"} className="w-4 h-4" />
              <span>{mission.title.replace("Missão: ", "")}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        
        {missionsInfo.map((mission) => (
          <TabsContent key={mission.id} value={mission.id} className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
              className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-sm border"
            >
              <h3 className="text-xl font-semibold mb-3">{mission.title}</h3>
              <p className="text-muted-foreground">{mission.summary}</p>
            </motion.div>

            <div className="grid grid-cols-1 gap-4">
              {mission.modules.map((module) => (
                <Collapsible 
                  key={module.id}
                  open={expandedModules.includes(module.id)}
                  onOpenChange={() => handleExpandModule(module.id)}
                  className="w-full"
                >
                  <CollapsibleTrigger className="w-full">
                    <motion.div 
                      whileHover={{ scale: 1.01 }}
                      className={`flex items-center justify-between w-full p-4 rounded-lg bg-white shadow-sm border ${
                        expandedModules.includes(module.id) ? "border-nuvme-teal" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          expandedModules.includes(module.id) ? "bg-nuvme-teal text-white" : "bg-gray-100 text-nuvme-dark"
                        }`}>
                          <Icon name={module.icon} className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <h4 className="font-medium">{module.title}</h4>
                          <p className="text-sm text-muted-foreground">{module.subtitle}</p>
                        </div>
                      </div>
                      <Icon 
                        name={expandedModules.includes(module.id) ? "ChevronUp" : "ChevronDown"} 
                        className="w-5 h-5 text-muted-foreground" 
                      />
                    </motion.div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <Card className="mt-2 border-t-0 border-nuvme-light-teal overflow-hidden">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div>
                            <h5 className="text-sm font-medium text-nuvme-dark mb-2">O que fazemos:</h5>
                            <p className="text-sm text-muted-foreground">{module.description}</p>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <h5 className="text-sm font-medium text-nuvme-dark mb-2">Para quem é:</h5>
                              <p className="text-sm text-muted-foreground">{module.forWho}</p>
                            </div>
                            
                            <div>
                              <h5 className="text-sm font-medium text-nuvme-dark mb-2">Exemplo de aplicação:</h5>
                              <p className="text-sm text-muted-foreground">{module.example}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>

            {mission.conclusion && (
              <div className="bg-nuvme-light-teal/30 p-4 rounded-lg border border-nuvme-teal/20 mt-4">
                <p className="text-sm font-medium">{mission.conclusion}</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MissionsModulesInfo;
