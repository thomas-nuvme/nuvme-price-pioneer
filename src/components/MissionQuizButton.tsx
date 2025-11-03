import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/Icon';
import MissionQuiz from './MissionQuiz';

const MissionQuizButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-nuvme-teal hover:bg-nuvme-teal/90 text-white shadow-lg hover:shadow-xl transition-all"
        size="lg"
      >
        <Icon name="HelpCircle" className="w-5 h-5 mr-2" />
        Descobrir Missão Ideal
      </Button>
      <MissionQuiz open={open} onOpenChange={setOpen} />
    </>
  );
};

export default MissionQuizButton;
