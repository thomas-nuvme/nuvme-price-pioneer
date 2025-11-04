import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/Icon";
import { missions } from "@/utils/calculatorData";

const MissoesModulos = () => {
  const missionModules = {
    modernization: [
      "CI/CD",
      "Contêiner", 
      "Kubernetes (EKS)",
      "Karpenter",
      "GitOps",
      "Database",
      "Arquitetura (WAFR)"
    ],
    security: [
      "Security Practices",
      "Security Hub",
      "SkyGuard",
      "Disaster Recovery (IaC)",
      "Conta Cofre"
    ],
    migration: [
      "On-Prem → AWS",
      "Cloud → AWS (inventário, estratégia, conectividade, cutover)"
    ],
    finops: [
      "Redução de Custos",
      "Faturamento em Reais (via Ingram)"
    ],
    nextgen: [
      "Observabilidade",
      "IA",
      "Serverless"
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-foreground">Missões & Módulos</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Escolha a Missão que traduz o objetivo principal do cliente. Combine Módulos conforme maturidade.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-8"
      >
        <div>
          <h2 className="text-2xl font-semibold mb-6">Missões</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missions.map((mission) => (
              <Card key={mission.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name={mission.icon} className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>{mission.name}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {mission.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Módulos disponíveis:</p>
                    <div className="flex flex-wrap gap-2">
                      {missionModules[mission.id as keyof typeof missionModules]?.map((module, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {module}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="border-t pt-8">
          <h2 className="text-2xl font-semibold mb-6">Módulos por Missão</h2>
          <div className="space-y-6">
            {missions.map((mission) => (
              <Card key={mission.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name={mission.icon} className="w-5 h-5" />
                    {mission.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {missionModules[mission.id as keyof typeof missionModules]?.map((module, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary font-bold mt-0.5">•</span>
                        <span className="text-sm">{module}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MissoesModulos;
