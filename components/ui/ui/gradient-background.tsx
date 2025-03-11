import type React from 'react';

export interface GradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
  primaryGradientColor?: string;
  secondaryGradientColor?: string;
  primaryGlowColor?: string;
  secondaryGlowColor?: string;
  primaryGlowSize?: {
    width: string;
    height: string;
  };
  secondaryGlowSize?: {
    width: string;
    height: string;
  };
}

export function GradientBackground({
  children,
  className = '',
  primaryGradientColor = 'from-gray-950',
  secondaryGradientColor = 'to-gray-900',
  primaryGlowColor = 'bg-purple-900/10',
  secondaryGlowColor = 'bg-cyan-900/10',
  primaryGlowSize = {
    width: '600px',
    height: '600px'
  },
  secondaryGlowSize = {
    width: '400px',
    height: '400px'
  }
}: GradientBackgroundProps) {
  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden bg-gradient-to-br ${primaryGradientColor} ${secondaryGradientColor} ${className}`}
    >
      {/* Circular gradient overlays */}
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${primaryGlowColor} blur-[100px]`}
        style={{
          width: primaryGlowSize.width,
          height: primaryGlowSize.height
        }}
      />
      <div
        className={`absolute left-1/3 top-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full ${secondaryGlowColor} blur-[80px]`}
        style={{
          width: secondaryGlowSize.width,
          height: secondaryGlowSize.height
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
