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
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Header */}
      <header className="relative overflow-hidden border-b bg-gradient-to-r from-primary/10 via-ring/10 to-primary/10 backdrop-blur-sm">
        <div className="absolute inset-0 bg-grid-primary/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))]" />
        <div className="container mx-auto px-4 py-12 relative">
          <div className="grid md:grid-cols-[300px,1fr] gap-12 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex justify-center md:justify-start"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-ring/20 blur-2xl" />
                <img src={nuvmeLogo} alt="Nuvme Logo" className="h-28 w-auto relative z-10 drop-shadow-2xl" />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-3 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 backdrop-blur-sm">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-ring bg-clip-text text-transparent">Propósito</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Inovar para conectar e evoluir. Mais do que fornecer tecnologia, construímos relacionamentos de confiança e colaboramos lado a lado com nossos clientes, promovendo inovação que gera crescimento real e transforma cada jornada em um caminho de evolução contínua.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10">
                  <h2 className="text-lg font-bold text-primary">Missão</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Apoiar nossos clientes em cada etapa da jornada, com proximidade e transparência, entregando soluções inovadoras que aceleram a transformação e geram resultados consistentes.
                  </p>
                </div>
                <div className="space-y-3 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-ring/10 hover:border-ring/30 transition-all hover:shadow-lg hover:shadow-ring/10">
                  <h2 className="text-lg font-bold text-ring">Visão</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Ser referência em inovação tecnológica e colaboração inteligente, unindo performance e cuidado para impulsionar o crescimento, fortalecer relacionamentos e inspirar a evolução das organizações.
                  </p>
                </div>
                <div className="space-y-3 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10">
                  <h2 className="text-lg font-bold text-primary">Valores</h2>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong className="text-foreground">Pessoas em primeiro lugar</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-ring mt-0.5">•</span>
                      <span><strong className="text-foreground">Transparência e confiança</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong className="text-foreground">Curiosidade e aprendizado</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-ring mt-0.5">•</span>
                      <span><strong className="text-foreground">Coragem para inovar</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span><strong className="text-foreground">Colaboração com excelência</strong></span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 space-y-24">
        {/* Carrossel de Logos de Clientes */}
        <section>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary via-ring to-primary bg-clip-text text-transparent"
          >
            Clientes que confiam na Nuvme
          </motion.h2>
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
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary via-ring to-primary bg-clip-text text-transparent"
          >
            Cases de Sucesso
          </motion.h2>
          <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-6xl mx-auto">
            <CarouselContent>
              {cases.map((caseItem, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <div className="p-4">
                    <Card className="h-full border-primary/20 bg-gradient-to-br from-card via-card to-primary/5 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 group">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <CardTitle className="text-2xl bg-gradient-to-r from-primary to-ring bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                            {caseItem.client}
                          </CardTitle>
                          <Badge className="bg-gradient-to-r from-primary to-ring text-primary-foreground border-0">
                            {caseItem.mission}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="p-3 rounded-lg bg-primary/5 border-l-4 border-primary">
                          <h4 className="font-semibold text-primary mb-1 flex items-center gap-2">
                            <Icon name="AlertCircle" size={16} />
                            Situation
                          </h4>
                          <p className="text-sm text-foreground/80">{caseItem.situation}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-ring/5 border-l-4 border-ring">
                          <h4 className="font-semibold text-ring mb-1 flex items-center gap-2">
                            <Icon name="Target" size={16} />
                            Task
                          </h4>
                          <p className="text-sm text-foreground/80">{caseItem.task}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-primary/5 border-l-4 border-primary">
                          <h4 className="font-semibold text-primary mb-1 flex items-center gap-2">
                            <Icon name="Lightbulb" size={16} />
                            Solution
                          </h4>
                          <p className="text-sm text-foreground/80">{caseItem.solution}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-gradient-to-r from-ring/10 to-primary/10 border-l-4 border-gradient-to-b from-ring to-primary">
                          <h4 className="font-semibold bg-gradient-to-r from-ring to-primary bg-clip-text text-transparent mb-1 flex items-center gap-2">
                            <Icon name="TrendingUp" size={16} className="text-ring" />
                            Results
                          </h4>
                          <p className="text-sm text-foreground/80 font-medium">{caseItem.results}</p>
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
        <section className="relative py-12">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-ring/5 to-primary/5 rounded-3xl" />
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 relative bg-gradient-to-r from-primary via-ring to-primary bg-clip-text text-transparent"
          >
            Nossos Números
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center relative overflow-hidden group hover:scale-105 transition-transform duration-300 border-primary/20 bg-gradient-to-br from-card to-primary/5">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-ring/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="pt-6 relative">
                    <div className="text-4xl font-bold bg-gradient-to-br from-primary to-ring bg-clip-text text-transparent mb-2">
                      {metric.value}
                    </div>
                    <p className="text-sm text-foreground/70 font-medium">{metric.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Foto do Time */}
        <section>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary via-ring to-primary bg-clip-text text-transparent"
          >
            Nosso Time
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden border-primary/20 shadow-2xl shadow-primary/10">
              <CardContent className="p-0">
                <div className="aspect-[21/9] bg-gradient-to-br from-primary/20 via-ring/10 to-primary/20 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_hsl(var(--ring))_0%,_transparent_50%)] opacity-20" />
                  <Icon name="Users" size={120} className="text-primary/40 relative z-10" />
                  <div className="absolute inset-0 flex items-end justify-center pb-12">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-ring/20 blur-xl" />
                      <p className="text-2xl font-bold text-center px-8 bg-card/95 backdrop-blur-md py-4 rounded-2xl border border-primary/20 relative shadow-lg">
                        <span className="bg-gradient-to-r from-primary via-ring to-primary bg-clip-text text-transparent">
                          Gente que cuida, conecta e evolui — juntos, além da nuvem.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* Nossas Squads */}
        <section className="pb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary via-ring to-primary bg-clip-text text-transparent"
          >
            Squads Nuvme
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {squads.map((squad, index) => {
              const gradients = [
                'from-primary/10 to-primary/5',
                'from-ring/10 to-ring/5',
                'from-primary/10 to-ring/5',
                'from-ring/10 to-primary/5',
                'from-primary/10 to-primary/5'
              ];
              const iconColors = [
                'text-primary',
                'text-ring',
                'text-primary',
                'text-ring',
                'text-primary'
              ];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className={`h-full border-primary/20 bg-gradient-to-br ${gradients[index % gradients.length]} hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 group hover:scale-105`}>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-ring group-hover:scale-110 transition-transform">
                          <Icon name={squad.icon} size={32} className="text-primary-foreground" />
                        </div>
                        <CardTitle className="bg-gradient-to-r from-primary to-ring bg-clip-text text-transparent">
                          {squad.name}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {squad.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="text-sm text-foreground/80 flex items-start gap-3 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                            <span className={`${iconColors[index % iconColors.length]} mt-1 font-bold text-lg`}>•</span>
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ApresentacaoComercial;
