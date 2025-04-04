
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { motion } from 'framer-motion';

const Welcome = () => {
  const { isAuthenticated, logout } = useAuth();

  // If not authenticated, redirect to PIN protection
  if (!isAuthenticated) {
    return <Navigate to="/pin" replace />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-nuvme-gray to-white p-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <img 
            src="src/components/images/nuvme-logo.png" 
            alt="Nuvme Logo" 
            className="w-32"
          />
          <Button 
            variant="outline" 
            onClick={logout}
            className="flex items-center gap-2"
          >
            <Icon name="LogOut" className="h-4 w-4" />
            Sair
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-semibold text-nuvme-dark mb-6">
            Bem-vindo ao guia da calculadora
          </h1>
          
          <p className="text-lg text-nuvme-dark-gray mb-8">
            Esta é uma página de placeholder. O conteúdo principal do guia estará disponível aqui.
          </p>
          
          <div className="flex gap-4">
            <Button asChild>
              <Link to="/guia">
                <Icon name="FileText" className="mr-2 h-4 w-4" />
                Ver Guia Completo
              </Link>
            </Button>
            
            <Button asChild variant="secondary">
              <Link to="/calculadora">
                <Icon name="Calculator" className="mr-2 h-4 w-4" />
                Ir para Calculadora
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Welcome;
