/**
 * MascotFull - Large Tiger Head Mascot
 * For: Login page, Hero sections
 * Style: Professional sports logo with circular badge
 */
import tigerImage from 'figma:asset/1aaa74142f57129ef03e813ba2a48c874fe443db.png';

export function MascotFull({ className = "" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* White circular background */}
      <div className="absolute inset-0 bg-white rounded-full" />
      
      {/* Tiger image - centered, larger padding for hero display */}
      <img 
        src={tigerImage} 
        alt="FitConnect Tiger" 
        className="relative w-full h-full object-contain p-[5%]"
      />
    </div>
  );
}