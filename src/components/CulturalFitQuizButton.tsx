import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/Icon';
import CulturalFitQuiz from './CulturalFitQuiz';

const CulturalFitQuizButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
        size="lg"
      >
        <Icon name="Heart" className="w-5 h-5 mr-2" />
        Avaliar Fit Cultural
      </Button>
      <CulturalFitQuiz open={open} onOpenChange={setOpen} />
    </>
  );
};

export default CulturalFitQuizButton;
