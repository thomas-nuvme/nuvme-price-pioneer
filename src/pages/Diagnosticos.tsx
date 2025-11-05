import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MissionQuizButton from "@/components/MissionQuizButton";
import PlanQuizButton from "@/components/PlanQuizButton";
import CulturalFitQuizButton from "@/components/CulturalFitQuizButton";
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
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full hover:shadow-xl transition-shadow border-t-4 border-t-nuvme-blue">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-nuvme-blue/20 flex items-center justify-center">
                  <Icon name="Search" className="w-6 h-6 text-nuvme-blue" />
                </div>
                <CardTitle className="text-xl">Quiz de Plano Ideal</CardTitle>
              </div>
              <CardDescription className="text-sm">
                Identifique qual plano (Essential, Advanced ou Premier) melhor atende o perfil e necessidades do cliente.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                  <Icon name="Target" className="w-4 h-4 text-nuvme-blue" />
                  Para que serve?
                </h3>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Entender o nível de maturidade e necessidades de suporte</li>
                  <li>• Recomendar o plano mais adequado ao momento do cliente</li>
                  <li>• Criar base para conversa comercial alinhada ao ICP</li>
                </ul>
              </div>
              <PlanQuizButton />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="h-full hover:shadow-xl transition-shadow border-t-4 border-t-nuvme-teal">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-nuvme-teal/20 flex items-center justify-center">
                  <Icon name="Target" className="w-6 h-6 text-nuvme-teal" />
                </div>
                <CardTitle className="text-xl">Quiz de Missão Ideal</CardTitle>
              </div>
              <CardDescription className="text-sm">
                Descubra qual missão principal e módulos prioritários fazem mais sentido para o projeto (30-90 dias).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                  <Icon name="Lightbulb" className="w-4 h-4 text-nuvme-teal" />
                  Para que serve?
                </h3>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Identificar a missão principal (Modernização, Segurança, etc.)</li>
                  <li>• Recomendar 2-3 módulos prioritários para começar</li>
                  <li>• Estruturar proposta inicial com foco no que importa</li>
                </ul>
              </div>
              <MissionQuizButton />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="h-full hover:shadow-xl transition-shadow border-t-4 border-t-purple-600">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center">
                  <Icon name="Heart" className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Quiz de Fit Cultural</CardTitle>
              </div>
              <CardDescription className="text-sm">
                Avalie o alinhamento cultural entre a empresa e a Nuvme através de 7 dimensões essenciais.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
                  <Icon name="Users" className="w-4 h-4 text-purple-600" />
                  Para que serve?
                </h3>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Avaliar transparência, parceria e proatividade</li>
                  <li>• Identificar fit alto/médio/baixo com base em 7 dimensões</li>
                  <li>• Definir viabilidade de parceria de longo prazo</li>
                </ul>
              </div>
              <CulturalFitQuizButton />
            </CardContent>
          </Card>
        </motion.div>
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
