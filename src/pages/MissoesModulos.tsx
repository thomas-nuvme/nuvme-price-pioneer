import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/Icon";
import { Separator } from "@/components/ui/separator";

const missionDetails = {
  modernization: {
    title: "Modernização",
    description: "Foco em agilidade, resiliência e padronização de entregas (DevOps, CI/CD, containers, Kubernetes, GitOps, arquitetura moderna). Resultados esperados: deploys rápidos e seguros, autoescalabilidade, ambientes reproduzíveis e governados.",
    modules: [
      {
        name: "CI/CD",
        description: "Pipelines automatizados (CodePipeline, GitHub Actions, FluxCD), testes, IaC (Terraform/CloudFormation), deploy contínuo e seguro."
      },
      {
        name: "Contêiner",
        description: "Empacotamento em Docker, persistência, rede segura, escalonamento e observabilidade em ECS/EKS."
      },
      {
        name: "Kubernetes (EKS)",
        description: "Provisionamento, RBAC, políticas de segurança, deploys com zero downtime, probes e namespaces."
      },
      {
        name: "Karpenter",
        description: "Provisão inteligente de nós (Spot/On-Demand), redução de custo sem perda de performance."
      },
      {
        name: "GitOps",
        description: "Infra e apps como código, reconciliadas a partir do Git (FluxCD), rollback seguro e auditoria."
      },
      {
        name: "Database",
        description: "Provisionamento/migração/upgrade (RDS, Aurora, DynamoDB), HA, tuning e backup."
      },
      {
        name: "Arquitetura (WAFR)",
        description: "Diagnóstico \"as-is\", blueprint \"to-be\", roadmap por fases e apoio ao redesenho."
      }
    ]
  },
  security: {
    title: "Segurança",
    description: "Estratégia contínua de proteção, visibilidade e conformidade: identidade e acesso, criptografia, detecção de ameaças, resposta e governança.",
    modules: [
      {
        name: "Security Practices",
        description: "IAM/least-privilege, KMS, Inspector, CloudTrail/Config, benchmarks e remediações."
      },
      {
        name: "Security Hub",
        description: "Ativação/integrações, análise de findings e ação corretiva priorizada para elevar o score."
      },
      {
        name: "SkyGuard",
        description: "Camada integrada de proteção (WAF, GuardDuty, IAM Analyzer, KMS, Secrets, ACM, Config)."
      },
      {
        name: "Disaster Recovery (IaC)",
        description: "DR com Terraform, RTO/RPO definidos, drills periódicos e documentação formal."
      },
      {
        name: "Conta Cofre",
        description: "Conta segregada para ativos sensíveis, backups/snapshots, KMS central e SCPs."
      }
    ]
  },
  migration: {
    title: "Migração",
    description: "Transição organizada de on-premises ou outra nuvem para AWS com mínimo risco e máxima aderência a boas práticas.",
    modules: [
      {
        name: "On-Premises → AWS",
        description: "Inventário, dependências, estratégia (rehost/replatform/refactor), conectividade (VPN/DC), validação."
      },
      {
        name: "Cloud → AWS",
        description: "Mapeamento multi-cloud, equivalência de serviços, cutover com mínimo downtime."
      }
    ]
  },
  finops: {
    title: "FinOps",
    description: "Eficiência financeira contínua: right-sizing, automação de custos, governança e previsibilidade.",
    modules: [
      {
        name: "Redução de Custos",
        description: "Right-sizing, desligamento de ociosos, Savings Plans/RIs, Spot e migração para serviços gerenciados."
      },
      {
        name: "Faturamento em Reais (via Ingram)",
        description: "Boleto/nota nacional, PTAX, previsibilidade e simplificação financeira."
      }
    ]
  },
  nextgen: {
    title: "NextGen",
    description: "Inovação aplicada ao negócio: Observabilidade avançada, IA/ML e arquiteturas Serverless para acelerar decisões e automação.",
    modules: [
      {
        name: "Observabilidade",
        description: "Stack Grafana/Prometheus/Loki + CloudWatch, dashboards técnicos/exec, alertas e correlação."
      },
      {
        name: "IA",
        description: "Integrações com serviços AWS (Bedrock, Comprehend, Textract, etc.), APIs, orquestração serverless e monitoramento."
      },
      {
        name: "Serverless",
        description: "Arquiteturas com Lambda, API GW, EventBridge, SQS/SNS, DynamoDB; automações e esteiras de entrega."
      }
    ]
  }
};

const MissoesModulos = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-foreground">Missões & Módulos</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Cada cliente entra pela missão que melhor traduz seu objetivo principal.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-12"
      >
        {Object.entries(missionDetails).map(([key, mission], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="overflow-hidden">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Badge className="bg-primary text-primary-foreground">
                    Missão
                  </Badge>
                  {mission.title}
                </CardTitle>
                <CardDescription className="text-base mt-3">
                  {mission.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Layers" className="w-5 h-5 text-primary" />
                  Módulos (Projetos)
                </h3>
                <div className="space-y-4">
                  {mission.modules.map((module, idx) => (
                    <div key={idx} className="border-l-2 border-primary/30 pl-4 py-2">
                      <h4 className="font-semibold text-foreground mb-1">
                        {module.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {module.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {index < Object.keys(missionDetails).length - 1 && (
              <Separator className="my-8" />
            )}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12"
      >
        <Card className="bg-muted/50 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Icon name="Info" className="w-5 h-5 text-primary mt-1" />
              <div>
                <p className="text-sm font-medium mb-2">
                  💡 Como usar este guia
                </p>
                <p className="text-sm text-muted-foreground">
                  Cada módulo é combinável conforme a missão e a maturidade do cliente. 
                  Use a Calculadora para estimar o investimento de cada projeto.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default MissoesModulos;
