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
    included: [
      "Atendimento em horário comercial (tickets, e-mail/WhatsApp)",
      "Monitoramento de instâncias e indicadores essenciais",
      "Relatórios e notificações de custos AWS (alertas e tendências)",
      "Automação pontual na infraestrutura e apoio a POCs"
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
    included: [
      "Suporte direto via Slack + WhatsApp; suporte ilimitado",
      "Monitoramento avançado e eventos de segurança com resposta",
      "Práticas FinOps recorrentes",
      "Squad DevOps atuando na conta (automação, entregas, DB)",
      "Cadência de jornada (revisões regulares com o cliente)"
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
    included: [
      "Suporte direto via Slack + WhatsApp; suporte ilimitado",
      "Monitoramento avançado e eventos de segurança com resposta",
      "Práticas FinOps recorrentes",
      "Squad DevOps atuando na conta (automação, entregas, DB)",
      "Cadência de jornada (revisões regulares com o cliente)",
      "Observabilidade avançada (métricas, logs, tracing)",
      "Performance tuning e avaliações arquiteturais periódicas",
      "Acompanhamento estratégico frequente e automações inteligentes"
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
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Check" className="w-5 h-5 text-green-500" />
                    O que está incluso?
                  </h3>
                  <ul className="space-y-2">
                    {plan.included.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="text-green-500 font-bold mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
