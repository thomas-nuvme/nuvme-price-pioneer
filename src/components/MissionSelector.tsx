
import React from "react";
import { cn } from "@/lib/utils";
import { MissionType, Mission } from "@/utils/calculatorData";
import { Icon } from "@/components/Icon";

interface MissionSelectorProps {
  missions: Mission[];
  selectedMission: MissionType | null;
  onSelectMission: (mission: MissionType) => void;
}

const MissionSelector: React.FC<MissionSelectorProps> = ({
  missions,
  selectedMission,
  onSelectMission,
}) => {
  return (
    <div className="w-full">
      <h2 className="text-lg font-medium mb-4">Selecione sua missão</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {missions.map((mission) => (
          <button
            key={mission.id}
            onClick={() => onSelectMission(mission.id)}
            className={cn(
              "relative flex flex-col items-center p-6 rounded-2xl border transition-all duration-300 overflow-hidden",
              "hover:shadow-md hover:border-nuvme-teal/50",
              "focus:outline-none focus:ring-2 focus:ring-nuvme-teal focus:ring-offset-2",
              selectedMission === mission.id
                ? "border-nuvme-teal bg-nuvme-light-teal shadow-sm"
                : "border-border bg-white"
            )}
          >
            <div
              className={cn(
                "w-12 h-12 flex items-center justify-center rounded-full mb-3 transition-all duration-300",
                selectedMission === mission.id
                  ? "bg-nuvme-teal text-white"
                  : "bg-secondary text-nuvme-dark"
              )}
            >
              <Icon name={mission.icon} className="w-5 h-5" />
            </div>
            <h3 className="font-medium text-base">{mission.name}</h3>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {mission.description}
            </p>
            
            {selectedMission === mission.id && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-nuvme-teal" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MissionSelector;
