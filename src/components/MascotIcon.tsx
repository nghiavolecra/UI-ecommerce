/**
 * MascotIcon - Tiger Head Mascot Logo
 * Style: Professional sports logo with circular badge
 * Use: Logo, App Icon, Header, UI System
 */
import tigerImage from 'figma:asset/1aaa74142f57129ef03e813ba2a48c874fe443db.png';

export function MascotIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center overflow-hidden ${className}`}>
      {/* Tiger image - scaled up to reduce white space */}
      <img 
        src={tigerImage} 
        alt="FitConnect Tiger" 
        className="w-[120%] h-[120%] object-contain"
      />
    </div>
  );
}