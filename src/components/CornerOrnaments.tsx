"use client";

interface CornerOrnamentsProps {
  className?: string;
}

function CornerSVG({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
      <path d="M0 0 h 30 v 2 H 2 v 28 H 0 Z" />
    </svg>
  );
}

export default function CornerOrnaments({ className = "text-champagne" }: CornerOrnamentsProps) {
  return (
    <>
      <div className={`absolute top-6 left-6 w-8 h-8 opacity-50 pointer-events-none ${className}`} aria-hidden="true">
        <CornerSVG className="w-full h-full" />
      </div>
      <div className={`absolute top-6 right-6 w-8 h-8 opacity-50 rotate-90 pointer-events-none ${className}`} aria-hidden="true">
        <CornerSVG className="w-full h-full" />
      </div>
      <div className={`absolute bottom-6 left-6 w-8 h-8 opacity-50 -rotate-90 pointer-events-none ${className}`} aria-hidden="true">
        <CornerSVG className="w-full h-full" />
      </div>
      <div className={`absolute bottom-6 right-6 w-8 h-8 opacity-50 rotate-180 pointer-events-none ${className}`} aria-hidden="true">
        <CornerSVG className="w-full h-full" />
      </div>
    </>
  );
}
