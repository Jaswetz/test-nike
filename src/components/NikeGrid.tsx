// NikeGrid: Responsive grid layout for Nike microsite
// 12-column (desktop), 8-column (tablet), 4-column (mobile)
// Max width: 1440px, 24px/20px/16px gutters
import React from 'react';

export const NikeGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className="mx-auto w-full max-w-[1440px] px-4 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-5 lg:gap-6"
    style={{
      // Gutters: 16px (mobile), 20px (tablet), 24px (desktop)
      // Responsive via Tailwind classes
    }}
  >
    {children}
  </div>
);
