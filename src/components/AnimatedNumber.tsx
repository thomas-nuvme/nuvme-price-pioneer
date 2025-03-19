
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
  formatter?: (value: number) => string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 500,
  className,
  formatter = (val) => val.toFixed(0),
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const startValue = displayValue;
    const endValue = value;
    const startTime = performance.now();
    
    const animateValue = (timestamp: number) => {
      const runtime = timestamp - startTime;
      const progress = runtime / duration;
      
      if (runtime < duration) {
        const currentValue = startValue + (endValue - startValue) * Math.min(progress, 1);
        setDisplayValue(currentValue);
        requestAnimationFrame(animateValue);
      } else {
        setDisplayValue(endValue);
      }
    };
    
    requestAnimationFrame(animateValue);
  }, [value, duration]);
  
  return (
    <span className={cn("transition-all duration-300", className)}>
      {formatter(displayValue)}
    </span>
  );
};

export default AnimatedNumber;
