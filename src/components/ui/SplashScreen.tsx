import React, { useState, useEffect } from 'react';
import AnimatedLogo from './AnimatedLogo';
import { Logger } from '../../utils/logger';

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ 
  onComplete, 
  duration = 3500 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);

  useEffect(() => {
    Logger.info('SplashScreen component initialized');

    // Auto-complete after duration if logo animation takes too long
    const autoCompleteTimeout = setTimeout(() => {
      handleComplete();
    }, duration);

    return () => {
      clearTimeout(autoCompleteTimeout);
      Logger.info('SplashScreen component unmounted');
    };
  }, [duration]);

  useEffect(() => {
    // Complete splash screen after logo animation finishes and a brief pause
    if (logoAnimationComplete) {
      const completeTimeout = setTimeout(() => {
        handleComplete();
      }, 500); // Brief pause after logo completes

      return () => clearTimeout(completeTimeout);
    }
  }, [logoAnimationComplete]);

  const handleComplete = () => {
    try {
      Logger.info('SplashScreen.handleComplete started');
      
      setIsVisible(false);
      
      // Wait for fade out animation before calling onComplete
      setTimeout(() => {
        onComplete();
        Logger.info('SplashScreen.handleComplete completed');
      }, 300);
      
    } catch (error) {
      Logger.error('Error in SplashScreen.handleComplete:', error);
      onComplete(); // Fallback
    }
  };

  const handleLogoAnimationComplete = () => {
    try {
      Logger.info('SplashScreen logo animation completed');
      setLogoAnimationComplete(true);
    } catch (error) {
      Logger.error('Error in SplashScreen.handleLogoAnimationComplete:', error);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={`splash-screen ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="splash-content">
        <div className="logo-animation-container">
          <AnimatedLogo 
            size="large"
            onAnimationComplete={handleLogoAnimationComplete}
            className="splash-logo"
          />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen; 