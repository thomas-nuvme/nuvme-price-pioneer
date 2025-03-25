
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/Icon";

const PlanQuizButton = () => {
  return (
    <div className="flex justify-center my-8">
      <Link to="/plano">
        <Button className="bg-nuvme-blue hover:bg-nuvme-blue/90 text-white flex items-center gap-2 px-6 py-6 text-lg rounded-xl shadow-md hover:shadow-lg transition-all">
          <Icon name="Search" className="w-5 h-5" />
          Fazer quiz para escolher o plano ideal
        </Button>
      </Link>
    </div>
  );
};

export default PlanQuizButton;
