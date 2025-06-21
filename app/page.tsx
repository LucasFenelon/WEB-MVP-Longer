'use client';

import React, { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SplashScreen from '../src/components/ui/SplashScreen';
import { Logger } from '../src/utils/logger';

const OnboardingPage: React.FC = () => {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    Logger.info('OnboardingPage component initialized');
    return () => {
      Logger.info('OnboardingPage component unmounted');
    };
  }, []);

  const handleSplashComplete = () => {
    try {
      Logger.info('OnboardingPage.handleSplashComplete started');
      setShowSplash(false);
      
      // Small delay before showing content for smooth transition
      setTimeout(() => {
        setShowContent(true);
        Logger.info('OnboardingPage.handleSplashComplete completed');
      }, 100);
      
    } catch (error) {
      Logger.error('Error in OnboardingPage.handleSplashComplete:', error);
      setShowSplash(false);
      setShowContent(true);
    }
  };

  const handleGetStarted = () => {
    try {
      Logger.info('OnboardingPage.handleGetStarted started');
      console.log('Navigate to onboarding');
      router.push('/onboarding');
      Logger.info('OnboardingPage.handleGetStarted completed');
    } catch (error) {
      Logger.error('Error in OnboardingPage.handleGetStarted:', error);
    }
  };

  const handleSignIn = () => {
    try {
      Logger.info('OnboardingPage.handleSignIn started');
      console.log('Navigate to login');
      Logger.info('OnboardingPage.handleSignIn completed');
    } catch (error) {
      Logger.error('Error in OnboardingPage.handleSignIn:', error);
    }
  };

  return (
    <>
      {/* Splash Screen Animation */}
      {showSplash && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}

      {/* Main Content */}
      {showContent && (
        <div className={`onboarding-container ${showContent ? 'fade-in-content' : ''}`}>
          <div className="content-wrapper">
        {/* App Logo */}
        <div className="app-logo">
          <Image
            src="/images/app-logo.png"
            alt="Longer App Logo"
            width={50}
            height={60}
            className="w-[36px] h-[60px]"
          />
        </div>

        {/* Text Content */}
        <div className="text-content">
          <Typography
            variant="h1"
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: '24px',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              textAlign: 'center',
              color: '#FFFFFF',
              marginBottom: '20px',
              textShadow: '0 2px 12px rgba(0,0,0,0.8)',
            }}
          >
            Sua dieta ideal com monitoramento inteligente.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: 1.4,
              textAlign: 'center',
              color: '#FFFFFF',
              opacity: 0.95,
              textShadow: '0 2px 8px rgba(0,0,0,0.7)',
            }}
          >
            Emagrecimento inteligente com planos baseados no seu DNA e acompanhamento por IA em tempo real.
          </Typography>
        </div>

        {/* Button Container */}
        <div className="button-container">
          <div className="flex flex-col gap-4">
            <Button
              variant="contained"
              fullWidth
              onClick={handleGetStarted}
              sx={{
                backgroundColor: '#FFFFFF',
                color: '#1E1E1E',
                borderRadius: '16px',
                padding: '18px 24px',
                fontSize: '18px',
                fontWeight: 600,
                textTransform: 'none',
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                letterSpacing: '-0.025em',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                '&:hover': {
                  backgroundColor: '#F5F5F5',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
                },
              }}
            >
              Começar agora
            </Button>

            <Button
              variant="text"
              fullWidth
              onClick={handleSignIn}
              sx={{
                color: '#FFFFFF',
                borderRadius: '16px',
                padding: '18px 24px',
                fontSize: '18px',
                fontWeight: 500,
                textTransform: 'none',
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                letterSpacing: '-0.025em',
                textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Já tem uma conta? Entrar
            </Button>
          </div>
        </div>

        {/* Longer Logo at Bottom - Much Larger */}
        <div className="longer-logo-large">
          Longer
        </div>
      </div>
    </div>
      )}
    </>
  );
};

export default OnboardingPage; 