'use client';

import React from 'react';
import Image from 'next/image';

const AnimationComponent: React.FC = () => {
  return (
    <div className="relative w-8 h-[49.07px]">
      {/* Union SVG */}
      <Image
        src="/images/animation-union.svg"
        alt="Animation Union"
        width={32}
        height={49.07}
        className="absolute top-0 left-0"
      />
      
      {/* Ellipse animations - positioned according to Figma specs */}
      <div className="absolute top-0 left-[17.96px] w-[14.04px] h-[14.04px] bg-white rounded-full opacity-90 animate-pulse" />
      <div className="absolute top-[35.04px] left-[17.96px] w-[14.04px] h-[14.04px] bg-white rounded-full opacity-80 animate-pulse delay-300" />
      <div className="absolute top-[17.2px] left-0 w-[14.04px] h-[14.04px] bg-white rounded-full opacity-70 animate-pulse delay-150" />
    </div>
  );
};

export default AnimationComponent; 