import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icon } from "@/components/Icon";

const Index = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted px-4 py-10 md:py-16">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto space-y-10"
      >
        <motion.div variants={itemVariants} className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Bem-vindo ao Guia Nuvme
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Utilize o menu lateral para navegar entre Missões, Planos, Diagnósticos e Calculadora
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card 
              className="hover:shadow-lg transition-shadow cursor-pointer" 
              onClick={() => navigate('/missoes-modulos')}
            >
              <CardHeader>
                <Icon name="Layers" className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Missões & Módulos</CardTitle>
                <CardDescription>
                  Explore as missões e módulos disponíveis
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="hover:shadow-lg transition-shadow cursor-pointer" 
              onClick={() => navigate('/planos')}
            >
              <CardHeader>
                <Icon name="Target" className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Planos</CardTitle>
                <CardDescription>
                  Conheça os planos Essential, Advanced e Premier
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="hover:shadow-lg transition-shadow cursor-pointer" 
              onClick={() => navigate('/diagnosticos')}
            >
              <CardHeader>
                <Icon name="FileText" className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Diagnósticos</CardTitle>
                <CardDescription>
                  Quizzes para identificar soluções ideais
                </CardDescription>
              </CardHeader>
            </Card>

            <Card 
              className="hover:shadow-lg transition-shadow cursor-pointer" 
              onClick={() => navigate('/calculadora')}
            >
              <CardHeader>
                <Icon name="Calculator" className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Calculadora</CardTitle>
                <CardDescription>
                  Calcule valores de projetos e módulos
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
