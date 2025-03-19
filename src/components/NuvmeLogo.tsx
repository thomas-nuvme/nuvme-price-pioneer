
import React from "react";

interface NuvmeLogoProps {
  className?: string;
}

const NuvmeLogo: React.FC<NuvmeLogoProps> = ({ className = "w-24 h-auto" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 1100 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Nuvem (Cloud) */}
      <path 
        d="M717.5 148C717.5 148 805.5 148 842.5 223C879.5 298 825.5 367 717.5 367"
        stroke="#0074BB" 
        strokeWidth="35"
        strokeLinecap="round"
      />
      
      {/* Seta (Arrow) */}
      <path 
        d="M717.5 367C717.5 367 640.5 352 592.5 259C544.5 166 614.5 148 717.5 148"
        stroke="#00C7B1" 
        strokeWidth="35"
        strokeLinecap="round"
      />
      
      {/* Texto "nuv" */}
      <path 
        d="M190 515V280H230L300 400L370 280H410V515H380V330L300 470L220 330V515H190Z" 
        fill="#1C374A" 
      />
      <path 
        d="M500 515C480 515 462 511 446 503C430 495 417 483 408 467C399 451 394.5 432 394.5 410C394.5 388 399 369 408 353C417 337 430 325 446 317C462 309 480 305 500 305C520 305 538 309 554 317C570 325 583 337 592 353C601 369 605.5 388 605.5 410C605.5 432 601 451 592 467C583 483 570 495 554 503C538 511 520 515 500 515ZM500 485C515 485 528 481 539 473C550 465 558.5 453.5 564.5 438.5C570.5 423.5 573.5 408 573.5 410C573.5 388 567 370 554 357C541 344 526 338 500 338C474 338 459 344 446 357C433 370 426.5 388 426.5 410C426.5 432 433 450 446 463C459 476 474 485 500 485Z" 
        fill="#1C374A" 
      />
      <path 
        d="M625 515V295H680V350C685 335 693 325 705 315C717 305 731 295 750 295H777V330H755C735 330 718 338 705 350C692 362 685 375 680 390V515H625Z" 
        fill="#1C374A" 
      />
      
      {/* Texto "me" */}
      <path 
        d="M836 460C846 475 861 485 886 485C911 485 926.5 475 936.5 460C946.5 445 952 435 952 410C952 385 946.5 375 936.5 360C926.5 345 911 335 886 335C861 335 846 345 836 360C826 375 820 385 820 410C820 435 826 445 836 460ZM800 295H855V330C868 310 888 295 919 295C944 295 965 305 981 319C997 333 1002 369 1002 410C1002 451 997 487 981 501C965 515 944 525 919 525C888 525 868 510 855 490V580H800V295Z" 
        fill="#00C7B1" 
      />
      <path 
        d="M1010 515V295H1065V515H1010ZM1010 280V230H1065V280H1010Z" 
        fill="#00C7B1" 
      />
    </svg>
  );
};

export default NuvmeLogo;
