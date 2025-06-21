'use client';

import React, { useEffect } from 'react';
import { Typography, IconButton, Button } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Logger } from '../../src/utils/logger';

const PricingPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    Logger.info('PricingPage component initialized');
    return () => {
      Logger.info('PricingPage component unmounted');
    };
  }, []);

  const handleClose = () => {
    try {
      Logger.info('handleClose function started');
      router.push('/plans');
      Logger.info('handleClose function completed');
    } catch (error) {
      Logger.error('Error in handleClose:', error);
    }
  };

  const handleStartNow = () => {
    try {
      Logger.info('handleStartNow function started');
      router.push('/home');
      Logger.info('handleStartNow function completed');
    } catch (error) {
      Logger.error('Error in handleStartNow:', error);
    }
  };

  const features = [
    {
      name: 'Assistente de AI',
      essential: true,
      premium: true
    },
    {
      name: 'Dietas personalizadas',
      essential: true,
      premium: true
    },
    {
      name: 'Use fotos e audio para salvar suas refeições diárias',
      essential: true,
      premium: true
    },
    {
      name: 'Salve suas receitas',
      essential: true,
      premium: true
    },
    {
      name: 'Relatório de evolução',
      essential: true,
      premium: true
    },
    {
      name: 'Lembretes diários',
      essential: true,
      premium: true
    },
    {
      name: 'Salve seus exames de sangue',
      essential: false,
      premium: true
    },
    {
      name: 'Carteira de saúde',
      essential: false,
      premium: true
    },
    {
      name: 'Exame de DNA',
      essential: false,
      premium: true
    },
    {
      name: 'Dieta personalizada com base na sua genética',
      essential: false,
      premium: true
    },
    {
      name: 'Propensão a doenças',
      essential: false,
      premium: true
    },
    {
      name: 'Desconto em fármacos',
      essential: false,
      premium: true
    },
    {
      name: 'Desconto em suplementos',
      essential: false,
      premium: true
    },
    {
      name: '2 consultas com nutricionistas no ano',
      essential: false,
      premium: true,
      additionalCost: '+ R$59,90 ao mês'
    },
    {
      name: '1 Exame de sangue*',
      essential: false,
      premium: true,
      additionalCost: '+ R$39,00'
    }
  ];

  return (
    <div className="pricing-page">
      <div className="pricing-content">
        {/* Header with background image */}
        <div className="pricing-header-section">
          <div className="pricing-header-content">
            <div className="pricing-logo">
              <Image
                src="/images/app-logo.png"
                alt="Longer App Logo"
                width={50}
                height={60}
                className="w-[36px] h-[60px]"
              />
            </div>
            
            <Typography className="pricing-title">
              Nossos planos
            </Typography>
            
            <Typography className="pricing-subtitle">
              Entenda todo o potencial da Longer na sua saúde e longevidade
            </Typography>
            
            <IconButton 
              className="pricing-close-button"
              onClick={handleClose}
            >
              <Close sx={{ color: '#1E1E1E', fontSize: '24px' }} />
            </IconButton>
          </div>
        </div>

        {/* Pricing and Features */}
        <div className="pricing-comparison">
          {/* Pricing Header */}
          <div className="pricing-plans-header">
            <div className="pricing-plan">
              <Typography className="plan-name">Essencial</Typography>
              <div className="plan-price">
                <Typography className="price-installments">12x</Typography>
                <Typography className="price-value">29,90</Typography>
              </div>
            </div>
            <div className="pricing-plan">
              <Typography className="plan-name">Premium</Typography>
              <div className="plan-price">
                <Typography className="price-installments">12x</Typography>
                <Typography className="price-value">129,90</Typography>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="features-list">
            {features.map((feature, index) => (
              <div key={index} className="feature-row">
                <div className="feature-name">
                  <Typography className="feature-text">
                    {feature.name}
                  </Typography>
                </div>
                <div className="feature-columns">
                  <div className="feature-column">
                    {feature.essential ? (
                      <div className="check-icon">✓</div>
                    ) : (
                      <div className="x-icon">✕</div>
                    )}
                  </div>
                  <div className="feature-column">
                    {feature.additionalCost ? (
                      <Typography className="additional-cost">
                        {feature.additionalCost}
                      </Typography>
                    ) : (
                      <div className="check-icon">✓</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer with Start Button */}
        <div className="pricing-footer">
          <Button
            fullWidth
            variant="contained"
            onClick={handleStartNow}
            className="start-now-button"
            sx={{
              backgroundColor: '#0270FF',
              color: '#FFFFFF',
              borderRadius: '12px',
              padding: '14px 20px',
              fontSize: '17px',
              fontWeight: 400,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#0056CC',
              },
            }}
          >
            Começar agora
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingPage; 