'use client';

import React from 'react';
import Image from 'next/image';
import { Logger } from '@/utils/logger';

interface StatusBarProps {
  time?: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ time = '9:41' }) => {
  Logger.info('StatusBar component initialized');

  try {
    return (
      <div className="flex justify-between items-center w-full px-4 pt-5 pb-0 h-[50px]">
        {/* Time Section */}
        <div className="flex justify-center items-center flex-1 px-4">
          <span className="status-bar-time">{time}</span>
        </div>

        {/* Dynamic Island Spacer */}
        <div className="w-[124px] h-[10px]" />

        {/* Status Icons Section */}
        <div className="flex justify-center items-center gap-[7px] flex-1 px-4">
          {/* Cellular Connection */}
          <Image
            src="/images/cellular-connection.svg"
            alt="Cellular Connection"
            width={19.2}
            height={12.23}
            className="w-[19.2px] h-[12.23px]"
          />
          
          {/* WiFi */}
          <Image
            src="/images/wifi-icon.svg"
            alt="WiFi"
            width={17.14}
            height={12.33}
            className="w-[17.14px] h-[12.33px]"
          />

          {/* Battery */}
          <div className="relative w-[27.33px] h-[13px]">
            {/* Battery Border */}
            <div className="absolute top-0 left-0 w-[25px] h-[13px] border border-white opacity-35 rounded-[4.3px]" />
            
            {/* Battery Cap */}
            <div className="absolute top-[4.78px] left-[26px] w-[1.33px] h-[4.08px] bg-white opacity-40" />
            
            {/* Battery Capacity */}
            <div className="absolute top-[2px] left-[2px] w-[21px] h-[9px] bg-white rounded-[2.5px]" />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    Logger.error('Error rendering StatusBar component', error);
    return <div className="h-[50px]" />;
  }
};

export default StatusBar; 