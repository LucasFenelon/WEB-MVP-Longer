import React, { useState, useEffect } from 'react';
import { Logger } from '../../utils/logger';

interface AnimatedLogoProps {
  onAnimationComplete?: () => void;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ 
  onAnimationComplete, 
  size = 'large',
  className = '' 
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    Logger.info('AnimatedLogo component initialized');
    
    const animationSequence = [
      { frame: 0, delay: 0 },      // Empty state
      { frame: 1, delay: 500 },   // Union base appears
      { frame: 2, delay: 1000 },  // First ellipse appears
      { frame: 3, delay: 1500 },  // Second ellipse appears
      { frame: 4, delay: 2000 },  // Third ellipse appears (complete logo)
    ];

    const timeouts: NodeJS.Timeout[] = [];

    animationSequence.forEach(({ frame, delay }) => {
      const timeout = setTimeout(() => {
        setCurrentFrame(frame);
        
        if (frame === 4) {
          // Animation complete
          setTimeout(() => {
            setIsAnimating(false);
            if (onAnimationComplete) {
              onAnimationComplete();
            }
            Logger.info('AnimatedLogo animation completed');
          }, 800); // Hold the complete logo for a moment
        }
      }, delay);
      
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
      Logger.info('AnimatedLogo component unmounted');
    };
  }, [onAnimationComplete]);

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-12 h-12';
      case 'medium':
        return 'w-16 h-16';
      case 'large':
      default:
        return 'w-20 h-20';
    }
  };

  const getFrameImage = () => {
    switch (currentFrame) {
      case 0:
        return null; // Empty state
      case 1:
        return '/images/logo-animation/frame-1-union-only.svg';
      case 2:
        return '/images/logo-animation/frame-2-union-ellipse1.svg';
      case 3:
        return '/images/logo-animation/frame-3-union-ellipse1-2.svg';
      case 4:
        return '/images/logo-animation/frame-4-complete-logo.svg';
      default:
        return null;
    }
  };

  const frameImage = getFrameImage();

  return (
    <div className={`animated-logo ${getSizeClasses()} ${className}`}>
      <div className="logo-container">
        {frameImage ? (
          <img
            src={frameImage}
            alt={`Logo animation frame ${currentFrame}`}
            className={`logo-frame fade-in ${isAnimating ? 'animating' : 'complete'}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        ) : (
          <div className="logo-placeholder" />
        )}
      </div>
    </div>
  );
};

export default AnimatedLogo; 