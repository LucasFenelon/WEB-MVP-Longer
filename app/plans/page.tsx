'use client';

import React, { useEffect } from 'react';
import { Button, Typography, IconButton } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Logger } from '../../src/utils/logger';

const PlansPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    Logger.info('PlansPage component initialized');
    return () => {
      Logger.info('PlansPage component unmounted');
    };
  }, []);

  const handleStartFreeTrial = () => {
    try {
      Logger.info('handleStartFreeTrial function started');
      router.push('/home');
      Logger.info('handleStartFreeTrial function completed');
    } catch (error) {
      Logger.error('Error in handleStartFreeTrial:', error);
    }
  };

  const handleViewPlans = () => {
    try {
      Logger.info('handleViewPlans function started');
      router.push('/pricing');
      Logger.info('handleViewPlans function completed');
    } catch (error) {
      Logger.error('Error in handleViewPlans:', error);
    }
  };

  return (
    <div className="plans-page">
      <div className="plans-content">
        {/* App Logo */}
        <div className="plans-logo">
          <Image
            src="/images/home-logo-complete.svg"
            alt="Longer Logo"
            width={36}
            height={60}
            className="app-logo-blue"
          />
        </div>

        {/* Header with Title */}
        <div className="plans-header">
          <Typography className="plans-title">
            Jornada de saúde e longevidade com a Longer
          </Typography>
        </div>

        {/* Timeline */}
        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <Typography className="timeline-title">Hoje</Typography>
              <Typography className="timeline-description">
                Defina seus objetivos pessoais e informe suas caracteristicas físicas e preferências alimentares. Recebe suas primeiras dietas personalizadas.
              </Typography>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <Typography className="timeline-title">7 dias de uso</Typography>
              <Typography className="timeline-description">
                Siga a sua dieta personalizada e suba seu exames no App para mapearmos sua saúde.
              </Typography>
              <Typography className="timeline-premium">
                Plano Premium: Agende o seu exame de DNA
              </Typography>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <Typography className="timeline-title">1 mês de uso</Typography>
              <Typography className="timeline-description">
                Acompanhe a sua evolução pelo App e defina seus objetivos de acordo com os seus exames e características pessoais.
              </Typography>
              <Typography className="timeline-premium">
                Plano Premium: Receba o resultado do exame de DNA
              </Typography>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <Typography className="timeline-title">Próximos meses</Typography>
              <Typography className="timeline-description">
                Monitore sua saúde e acompanhe a evolução da sua performance física.
              </Typography>
              <Typography className="timeline-premium">
                Plano Premium: Acompanhamento detalhado e personalizado para sua genética
              </Typography>
            </div>
          </div>
        </div>

        {/* Footer with Buttons */}
        <div className="plans-footer">
          <Button
            fullWidth
            variant="contained"
            onClick={handleStartFreeTrial}
            className="free-trial-button"
            sx={{
              backgroundColor: '#0270FF',
              color: '#FFFFFF',
              borderRadius: '12px',
              padding: '14px 20px',
              fontSize: '17px',
              fontWeight: 400,
              textTransform: 'none',
              marginBottom: '16px',
              '&:hover': {
                backgroundColor: '#0056CC',
              },
            }}
          >
            Começar teste grátis de 7 dias
          </Button>
          
          <div className="view-plans-container" onClick={handleViewPlans}>
            <Typography className="view-plans-text">
              Confira nossos planos
            </Typography>
            <IconButton className="chevron-right">
              <ChevronRight sx={{ color: '#007AFF', fontSize: '24px' }} />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansPage; 