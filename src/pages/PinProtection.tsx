
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Icon } from '@/components/Icon';
import { motion } from 'framer-motion';

const PinProtection = () => {
  const { isAuthenticated, login } = useAuth();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // If already authenticated, redirect to home
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(pin);
    
    if (!success) {
      setError(true);
      setAttempts(prev => prev + 1);
      // Reset PIN input
      setPin('');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.5 } 
    },
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-nuvme-gray to-white flex items-center justify-center p-4"
    >
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <img 
            src="src/components/images/nuvme-logo.png" 
            alt="Nuvme Logo" 
            className="mx-auto w-32 mb-4"
          />
          <h1 className="text-2xl font-semibold text-nuvme-dark mb-2">
            Calculadora Nuvme
          </h1>
          <p className="text-nuvme-dark-gray">
            Digite o PIN para acessar o guia
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <Icon name="AlertTriangle" className="h-4 w-4" />
            <AlertTitle>PIN Inválido</AlertTitle>
            <AlertDescription>
              O código informado não é válido. Por favor, tente novamente.
              {attempts >= 3 && " Se precisar de ajuda, entre em contato com o administrador."}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <InputOTP 
              maxLength={4} 
              value={pin}
              onChange={setPin}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="h-12 w-12" />
                <InputOTPSlot index={1} className="h-12 w-12" />
                <InputOTPSlot index={2} className="h-12 w-12" />
                <InputOTPSlot index={3} className="h-12 w-12" />
              </InputOTPGroup>
            </InputOTP>
            
            <Button 
              type="submit" 
              className="w-full bg-nuvme-teal hover:bg-nuvme-teal/90"
              disabled={pin.length !== 4}
            >
              <Icon name="Unlock" className="mr-2 h-4 w-4" />
              Acessar
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default PinProtection;
