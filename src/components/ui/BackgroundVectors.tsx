'use client';

import React from 'react';
import Image from 'next/image';

const BackgroundVectors: React.FC = () => {
  return (
    <div className="background-vectors">
      <div className="relative w-[402px] h-[124.6px]">
        {/* Vector 1 */}
        <Image
          src="/images/background-vector-1.svg"
          alt="Background Vector 1"
          width={41.08}
          height={71.99}
          className="absolute"
          style={{ top: '24.81px', left: '360.92px' }}
        />
        
        {/* Vector 2 */}
        <Image
          src="/images/background-vector-2.svg"
          alt="Background Vector 2"
          width={67.28}
          height={73.89}
          className="absolute"
          style={{ top: '24.81px', left: '287.93px' }}
        />
        
        {/* Vector 3 */}
        <Image
          src="/images/background-vector-3.svg"
          alt="Background Vector 3"
          width={68.2}
          height={99.78}
          className="absolute"
          style={{ top: '24.81px', left: '213.3px' }}
        />
        
        {/* Vector 4 */}
        <Image
          src="/images/background-vector-4.svg"
          alt="Background Vector 4"
          width={61.55}
          height={71.99}
          className="absolute"
          style={{ top: '24.81px', left: '144.58px' }}
        />
        
        {/* Vector 5 */}
        <Image
          src="/images/background-vector-5.svg"
          alt="Background Vector 5"
          width={70.77}
          height={73.89}
          className="absolute"
          style={{ top: '24.81px', left: '66.69px' }}
        />
        
        {/* Vector 6 */}
        <Image
          src="/images/background-vector-6.svg"
          alt="Background Vector 6"
          width={66.16}
          height={96.8}
          className="absolute"
          style={{ top: '0px', left: '0px' }}
        />
      </div>
    </div>
  );
};

export default BackgroundVectors; 