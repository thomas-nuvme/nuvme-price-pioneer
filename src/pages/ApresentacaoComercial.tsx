import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/Icon";
import { motion } from "framer-motion";
import nuvmeLogo from "@/components/images/nuvme-logo.png";

const ApresentacaoComercial = () => {
  const clientLogos = Array(8).fill(null); // Placeholder para logos
  
  const cases = [
    {
      client: "Rabbot",
      mission: "Modernização",
      situation: "Plataforma de orquestração de frotas presa a Windows/.NET Framework monolítico, com alto custo, baixa escalabilidade e entregas lentas.",
      task: "Modernizar para microserviços em .NET Core/Linux com CI/CD e GitOps para ganhar eficiência, escala e reduzir custos.",
      solution: "Containerização + pipelines CI/CD, GitOps com FluxCD, KEDA/RabbitMQ, observabilidade (Prometheus/Grafana/Loki) e Karpenter com Spot.",
      results: "De meses para centenas de deploys/dia, -50% em EC2, MTTR -40–60% e crescimento 10× sustentado pela nova arquitetura."
    },
    {
      client: "Liqi",
      mission: "Segurança",
      situation: "Fintech de tokenização precisava de ambiente seguro, escalável e em conformidade com exigências do setor financeiro.",
      task: "Assumir sustentação AWS com foco em segurança, alta disponibilidade, FinOps e observabilidade (DataDog).",
      solution: "EKS + Lambda com monitoramento avançado (DataDog/CloudWatch/X-Ray), FinOps contínuo e controles (WAF, KMS, Secrets Manager, Config).",
      results: "Infra 100% monitorada, -15% a -25% de custos operacionais e conformidade garantida para novos produtos financeiros."
    },
    {
      client: "Convertr",
      mission: "Modernização",
      situation: "E-commerce com legado Magento sofria quedas, baixa escala, custos altos em EC2 e deploys manuais.",
      task: "Reescrever/modernizar a plataforma para microserviços em EKS com GitOps, Karpenter e foco em HA, performance e segurança.",
      solution: "EKS (multi-AZ), Karpenter+Spot, FluxCD (GitOps), AWS Global Accelerator, observabilidade (Prometheus/Grafana/Loki) e hardening (IRSA/RBAC/Secrets).",
      results: "Redução relevante de custos, alta disponibilidade e performance global, entregas ágeis e auditáveis e escala sob demanda."
    },
    {
      client: "Grupo Futuro",
      mission: "NextGen",
      situation: "Concessão de crédito travada por validações manuais (documentos/selfies/comprovantes), gerando lentidão, erros e custo alto.",
      task: "Criar API de IA para automatizar validações (imagem, texto, localização) com alta disponibilidade, segurança e baixo custo.",
      solution: "Arquitetura serverless (API Gateway + Lambda) com Rekognition, Textract, Location Service, CloudWatch e S3 seguro.",
      results: "Processo totalmente automatizado, respostas muito mais rápidas e custo médio ~US$800/mês, mantendo escalabilidade e estabilidade."
    },
    {
      client: "Contractflow",
      mission: "NextGen",
      situation: "Após migração para EKS por terceiro, faltavam monitoramento, alertas, automação de deploy e rastreabilidade, elevando MTTR e riscos.",
      task: "Trazer estabilidade e confiança em produção, reduzindo MTTR e provendo visibilidade e alertas em tempo real sem aumentar complexidade.",
      solution: "Implantação do KubeCortex (observabilidade inteligente para Kubernetes) via Helm, integrado ao FluxCD e alertas no Slack — tudo em 4,5 horas.",
      results: "-60% no tempo de troubleshooting, -45% em incidentes e +20→68 deploys/mês, com previsibilidade e foco do time no produto."
    }
  ];

  const metrics = [
    { value: "+ de 80", label: "Clusters Kubernetes implantados" },
    { value: "+ 150", label: "Clientes com DevOps Ativo" },
    { value: "+ 400", label: "Pipelines de CI/CD configuradas" },
    { value: "+ 1000", label: "Projetos entregues" },
    { value: "+ 300", label: "Contas AWS gerenciadas" },
    { value: "100%", label: "Do time certificado" }
  ];

  const squads = [
    {
      name: "DevOps",
      icon: "GitBranch",
      points: [
        "Automação e esteiras de entrega (CI/CD).",
        "Modernização de apps e infraestrutura como código.",
        "Containers e Kubernetes (EKS) com boas práticas."
      ]
    },
    {
      name: "FinOps",
      icon: "DollarSign",
      points: [
        "Governança e previsibilidade de custos.",
        "Otimização contínua (right-sizing, SP/RIs/Spot).",
        "Relatórios executivos para decisão."
      ]
    },
    {
      name: "SRE",
      icon: "Shield",
      points: [
        "Confiabilidade e disponibilidade contínua.",
        "Observabilidade e redução de MTTR.",
        "Performance e SLO/SLI."
      ]
    },
    {
      name: "DevSecOps",
      icon: "Lock",
      points: [
        "Segurança integrada ao ciclo de entrega.",
        "Identidade, acesso e proteção de dados.",
        "Detecção e resposta a eventos."
      ]
    },
    {
      name: "IA/ML",
      icon: "Brain",
      points: [
        "Aplicações práticas de IA/ML no negócio.",
        "Pipelines, monitoramento e governança de modelos.",
        "Automação inteligente e aceleração de insights."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-[300px,1fr] gap-8 items-start">
            <div className="flex justify-center md:justify-start">
              <img src={nuvmeLogo} alt="Nuvme Logo" className="h-24 w-auto" />
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-primary">Propósito</h2>
                <p className="text-muted-foreground">
                  Inovar para conectar e evoluir. Mais do que fornecer tecnologia, construímos relacionamentos de confiança e colaboramos lado a lado com nossos clientes, promovendo inovação que gera crescimento real e transforma cada jornada em um caminho de evolução contínua.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2 text-primary">Missão</h2>
                <p className="text-muted-foreground">
                  Apoiar nossos clientes em cada etapa da jornada, com proximidade e transparência, entregando soluções inovadoras que aceleram a transformação e geram resultados consistentes.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2 text-primary">Visão</h2>
                <p className="text-muted-foreground">
                  Ser referência em inovação tecnológica e colaboração inteligente, unindo performance e cuidado para impulsionar o crescimento, fortalecer relacionamentos e inspirar a evolução das organizações.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2 text-primary">Valores</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li><strong>Pessoas em primeiro lugar:</strong> cuidamos de quem constrói e confia na missão, fortalecendo conexões humanas que nos mantêm unidos na jornada.</li>
                  <li><strong>Transparência e confiança:</strong> somos uma base segura, onde cada relação é guiada por clareza e ética, mesmo quando o destino é desconhecido.</li>
                  <li><strong>Curiosidade e aprendizado contínuo:</strong> exploramos novos mundos de conhecimento, conectando descobertas que expandem horizontes.</li>
                  <li><strong>Coragem para inovar:</strong> desbravamos o novo com propósito, convertendo desafios em conquistas que impulsionam todos ao redor.</li>
                  <li><strong>Colaboração com excelência:</strong> acreditamos no poder das tripulações: quando talentos se unem, alcançamos resultados que ultrapassam fronteiras.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 space-y-16">
        {/* Carrossel de Logos de Clientes */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Clientes que confiam na Nuvme</h2>
          <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {clientLogos.map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                  <div className="p-4">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <div className="text-center">
                          <Icon name="Building2" size={48} className="mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Logo Cliente {index + 1}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        {/* Carrossel de Cases */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Cases de Sucesso</h2>
          <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-6xl mx-auto">
            <CarouselContent>
              {cases.map((caseItem, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <div className="p-4">
                    <Card className="h-full">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <CardTitle className="text-2xl">{caseItem.client}</CardTitle>
                          <Badge variant="secondary">{caseItem.mission}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-primary mb-1">Situation</h4>
                          <p className="text-sm text-muted-foreground">{caseItem.situation}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary mb-1">Task</h4>
                          <p className="text-sm text-muted-foreground">{caseItem.task}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary mb-1">Solution</h4>
                          <p className="text-sm text-muted-foreground">{caseItem.solution}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary mb-1">Results</h4>
                          <p className="text-sm text-muted-foreground">{caseItem.results}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        {/* Nossos Números */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Nossos Números</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-primary mb-2">{metric.value}</div>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Foto do Time */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Nosso Time</h2>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-[21/9] bg-muted flex items-center justify-center relative">
                <Icon name="Users" size={120} className="text-muted-foreground/30" />
                <div className="absolute inset-0 flex items-end justify-center pb-8">
                  <p className="text-xl font-medium text-center px-4 bg-background/80 backdrop-blur-sm py-2 rounded-lg">
                    Gente que cuida, conecta e evolui — juntos, além da nuvem.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Nossas Squads */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Squads Nuvme</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {squads.map((squad, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Icon name={squad.icon} size={32} className="text-primary" />
                      <CardTitle>{squad.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {squad.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ApresentacaoComercial;
