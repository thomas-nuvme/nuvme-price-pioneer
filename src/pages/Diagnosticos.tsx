import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MissionQuizButton from "@/components/MissionQuizButton";
import PlanQuizButton from "@/components/PlanQuizButton";
import { Icon } from "@/components/Icon";

const Diagnosticos = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-foreground">Diagnósticos</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Utilize nossos quizzes para identificar a melhor solução para seu cliente
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
      >
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Target" className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Quiz de Plano Ideal</CardTitle>
            </div>
            <CardDescription>
              Descubra qual plano (Essential, Advanced ou Premier) é o mais adequado para o cliente
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Perguntas sobre nível de parceria e ritmo de operação para identificar o plano adequado.
            </p>
            <PlanQuizButton />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Compass" className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Quiz de Missão Ideal</CardTitle>
            </div>
            <CardDescription>
              Identifique a missão principal e os módulos prioritários (30-90 dias)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Quiz curto (7 perguntas) que retorna a missão recomendada baseada no contexto do cliente.
            </p>
            <MissionQuizButton />
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-3xl mx-auto"
      >
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Lightbulb" className="w-5 h-5 text-yellow-500" />
              Como usar os diagnósticos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              <strong>1. Escute o cliente:</strong> Durante a conversa, identifique os principais desafios e objetivos.
            </p>
            <p>
              <strong>2. Aplique o quiz:</strong> Use as perguntas como guia e marque as respostas mais próximas da realidade do cliente.
            </p>
            <p>
              <strong>3. Adapte a recomendação:</strong> O resultado é uma sugestão baseada em padrões. Ajuste conforme necessário.
            </p>
            <p className="text-muted-foreground italic">
              💡 Os diagnósticos são ferramentas de apoio para vendedores, não substituem a análise individual de cada caso.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Diagnosticos;
