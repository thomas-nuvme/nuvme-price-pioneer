import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/Icon";
import PlanQuizModal from "./PlanQuizModal";

const PlanQuizButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-nuvme-blue hover:bg-nuvme-blue/90 text-white flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
        size="lg"
      >
        <Icon name="Search" className="w-5 h-5" />
        Descobrir Plano Ideal
      </Button>
      <PlanQuizModal open={open} onOpenChange={setOpen} />
    </>
  );
};

export default PlanQuizButton;
