'use client';

import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, IconButton, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, Checkbox } from '@mui/material';
import { ArrowBack, HelpOutline, Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { Logger } from '../../src/utils/logger';

interface OnboardingData {
  name: string;
  birthDate: string;
  gender: string;
  activityLevel: string[];
  height: string;
  weight: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const OnboardingPage: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    name: '',
    birthDate: '',
    gender: '',
    activityLevel: [],
    height: '',
    weight: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const totalSteps = 8;
  const progressPercentage = (currentStep / totalSteps) * 100;

  useEffect(() => {
    Logger.info('OnboardingPage component initialized');
    return () => {
      Logger.info('OnboardingPage component unmounted');
    };
  }, []);



  const handleBack = () => {
    try {
      Logger.info('handleBack function started');
      if (currentStep === 1) {
        router.push('/');
      } else {
        setCurrentStep(prev => prev - 1);
      }
      Logger.info('handleBack function completed');
    } catch (error) {
      Logger.error('Error in handleBack:', error);
    }
  };

  const handleContinue = () => {
    try {
      Logger.info('handleContinue function started');
      if (currentStep < totalSteps) {
        setCurrentStep(prev => prev + 1);
      } else {
        // Final step - submit data and navigate to plans
        Logger.info('Onboarding completed with data:', data);
        router.push('/plans');
      }
      Logger.info('handleContinue function completed');
    } catch (error) {
      Logger.error('Error in handleContinue:', error);
    }
  };

  const handleHelp = () => {
    try {
      Logger.info('handleHelp function started');
      Logger.info('Help clicked');
      Logger.info('handleHelp function completed');
    } catch (error) {
      Logger.error('Error in handleHelp:', error);
    }
  };

  const updateData = (field: keyof OnboardingData, value: string | string[]) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleActivityLevelChange = (value: string, checked: boolean) => {
    const updatedActivities = checked
      ? [...data.activityLevel, value]
      : data.activityLevel.filter(activity => activity !== value);
    updateData('activityLevel', updatedActivities);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return data.name.trim().length > 0;
      case 2: return data.birthDate.trim().length > 0;
      case 3: return data.gender.trim().length > 0;
      case 4: return data.activityLevel.length > 0;
      case 5: return data.height.trim().length > 0;
      case 6: return data.weight.trim().length > 0;
      case 7: return data.email.trim().length > 0;
      case 8: return data.password.trim().length > 0 && data.confirmPassword.trim().length > 0;
      default: return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Typography className="onboarding-title">
              Como você deseja ser chamado?
            </Typography>
            <Typography className="onboarding-subtitle">
              Queremos te conhecer um pouco mais 🙂
            </Typography>
            <div className="input-container">
              <TextField
                fullWidth
                placeholder="Nome"
                value={data.name}
                onChange={(e) => updateData('name', e.target.value)}
                className="onboarding-input"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#F5F5F5',
                    borderRadius: '12px',
                    '& fieldset': { border: 'none' },
                  },
                  '& .MuiInputBase-input': {
                    color: data.name ? '#1E1E1E' : '#767676',
                    '&::placeholder': {
                      color: '#767676',
                      opacity: 1,
                    },
                  },
                }}
              />
            </div>
          </>
        );

      case 2:
        return (
          <>
            <Typography className="onboarding-title">
              Qual é a sua data de nascimento?
            </Typography>
            <Typography className="onboarding-subtitle">
              Todas as suas informações são sigilosas
            </Typography>
            <div className="input-container">
              <TextField
                fullWidth
                type="date"
                value={data.birthDate}
                onChange={(e) => updateData('birthDate', e.target.value)}
                className="onboarding-input"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#F5F5F5',
                    borderRadius: '12px',
                    '& fieldset': { border: 'none' },
                  },
                  '& .MuiInputBase-input': {
                    color: '#1E1E1E !important',
                  },
                  '& .MuiInputBase-input:not([value])': {
                    color: '#767676 !important',
                  },
                }}
              />
            </div>
          </>
        );

      case 3:
        return (
          <>
            <Typography className="onboarding-title">
              Qual é o seu gênero?
            </Typography>
            <Typography className="onboarding-subtitle">
              Todas as suas informações são sigilosas
            </Typography>
            <div className="input-container">
              <FormControl component="fieldset" fullWidth>
                <RadioGroup
                  value={data.gender}
                  onChange={(e) => updateData('gender', e.target.value)}
                  sx={{ gap: 2 }}
                >
                  <FormControlLabel 
                    value="masculino" 
                    control={
                      <Radio 
                        sx={{
                          color: '#1E1E1E',
                          '&.Mui-checked': {
                            color: '#0270FF',
                          },
                        }}
                      />
                    } 
                    label="Masculino"
                    sx={{
                      margin: 0,
                      padding: '16px',
                      backgroundColor: '#F5F5F5',
                      borderRadius: '12px',
                      '& .MuiFormControlLabel-label': { 
                        flex: 1,
                        color: '#1E1E1E'
                      }
                    }}
                  />
                  <FormControlLabel 
                    value="feminino" 
                    control={
                      <Radio 
                        sx={{
                          color: '#1E1E1E',
                          '&.Mui-checked': {
                            color: '#0270FF',
                          },
                        }}
                      />
                    } 
                    label="Feminino"
                    sx={{
                      margin: 0,
                      padding: '16px',
                      backgroundColor: '#F5F5F5',
                      borderRadius: '12px',
                      '& .MuiFormControlLabel-label': { 
                        flex: 1,
                        color: '#1E1E1E'
                      }
                    }}
                  />
                  <FormControlLabel 
                    value="outro" 
                    control={
                      <Radio 
                        sx={{
                          color: '#1E1E1E',
                          '&.Mui-checked': {
                            color: '#0270FF',
                          },
                        }}
                      />
                    } 
                    label="Prefiro não informar"
                    sx={{
                      margin: 0,
                      padding: '16px',
                      backgroundColor: '#F5F5F5',
                      borderRadius: '12px',
                      '& .MuiFormControlLabel-label': { 
                        flex: 1,
                        color: '#1E1E1E'
                      }
                    }}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </>
        );

      case 4:
        return (
          <>
            <Typography className="onboarding-title">
              Qual é o seu nível de atividade física?
            </Typography>
            <Typography className="onboarding-subtitle">
              Todas as suas informações são sigilosas
            </Typography>
            <div className="input-container">
              <FormControl component="fieldset" fullWidth>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <FormControlLabel 
                    control={
                      <Checkbox 
                        checked={data.activityLevel.includes('sedentario')}
                        onChange={(e) => handleActivityLevelChange('sedentario', e.target.checked)}
                        sx={{
                          color: '#1E1E1E',
                          '&.Mui-checked': {
                            color: '#0270FF',
                          },
                        }}
                      />
                    }
                    label="Sedentário (pouco ou nenhum exercício)"
                    sx={{
                      margin: 0,
                      padding: '16px',
                      backgroundColor: '#F5F5F5',
                      borderRadius: '12px',
                      '& .MuiFormControlLabel-label': { 
                        flex: 1, 
                        fontSize: '14px',
                        color: '#1E1E1E'
                      }
                    }}
                  />
                  <FormControlLabel 
                    control={
                      <Checkbox 
                        checked={data.activityLevel.includes('leve')}
                        onChange={(e) => handleActivityLevelChange('leve', e.target.checked)}
                        sx={{
                          color: '#1E1E1E',
                          '&.Mui-checked': {
                            color: '#0270FF',
                          },
                        }}
                      />
                    }
                    label="Levemente ativo (exercício leve 1-3 dias/semana)"
                    sx={{
                      margin: 0,
                      padding: '16px',
                      backgroundColor: '#F5F5F5',
                      borderRadius: '12px',
                      '& .MuiFormControlLabel-label': { 
                        flex: 1, 
                        fontSize: '14px',
                        color: '#1E1E1E'
                      }
                    }}
                  />
                  <FormControlLabel 
                    control={
                      <Checkbox 
                        checked={data.activityLevel.includes('moderado')}
                        onChange={(e) => handleActivityLevelChange('moderado', e.target.checked)}
                        sx={{
                          color: '#1E1E1E',
                          '&.Mui-checked': {
                            color: '#0270FF',
                          },
                        }}
                      />
                    }
                    label="Moderadamente ativo (exercício moderado 3-5 dias/semana)"
                    sx={{
                      margin: 0,
                      padding: '16px',
                      backgroundColor: '#F5F5F5',
                      borderRadius: '12px',
                      '& .MuiFormControlLabel-label': { 
                        flex: 1, 
                        fontSize: '14px',
                        color: '#1E1E1E'
                      }
                    }}
                  />
                  <FormControlLabel 
                    control={
                      <Checkbox 
                        checked={data.activityLevel.includes('ativo')}
                        onChange={(e) => handleActivityLevelChange('ativo', e.target.checked)}
                        sx={{
                          color: '#1E1E1E',
                          '&.Mui-checked': {
                            color: '#0270FF',
                          },
                        }}
                      />
                    }
                    label="Muito ativo (exercício intenso 6-7 dias/semana)"
                    sx={{
                      margin: 0,
                      padding: '16px',
                      backgroundColor: '#F5F5F5',
                      borderRadius: '12px',
                      '& .MuiFormControlLabel-label': { 
                        flex: 1, 
                        fontSize: '14px',
                        color: '#1E1E1E'
                      }
                    }}
                  />
                </div>
              </FormControl>
            </div>
          </>
        );

      case 5:
        return (
          <>
            <Typography className="onboarding-title">
              Qual é sua altura?
            </Typography>
            <Typography className="onboarding-subtitle">
              Todas as suas informações são sigilosas
            </Typography>
            <div className="number-input-container">
              <div className="number-display-editable" onClick={() => document.getElementById('height-input')?.focus()}>
                <TextField
                  id="height-input"
                  type="number"
                  placeholder="000"
                  value={data.height}
                  onChange={(e) => updateData('height', e.target.value)}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '48px',
                      fontWeight: 300,
                      color: data.height ? '#1E1E1E' : '#767676',
                      textAlign: 'center',
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                      width: '120px',
                      '&::placeholder': {
                        color: '#767676',
                        opacity: 1,
                      },
                    },
                  }}
                />
                <span className="number-unit">cm</span>
              </div>
            </div>
          </>
        );

      case 6:
        return (
          <>
            <Typography className="onboarding-title">
              Qual é o seu peso atual?
            </Typography>
            <Typography className="onboarding-subtitle">
              Todas as suas informações são sigilosas
            </Typography>
            <div className="number-input-container">
              <div className="number-display-editable" onClick={() => document.getElementById('weight-input')?.focus()}>
                <TextField
                  id="weight-input"
                  type="number"
                  placeholder="00,0"
                  value={data.weight}
                  onChange={(e) => updateData('weight', e.target.value)}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '48px',
                      fontWeight: 300,
                      color: data.weight ? '#1E1E1E' : '#767676',
                      textAlign: 'center',
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                      width: '120px',
                      '&::placeholder': {
                        color: '#767676',
                        opacity: 1,
                      },
                    },
                  }}
                />
                <span className="number-unit">kg</span>
              </div>
            </div>
          </>
        );

      case 7:
        return (
          <>
            <Typography className="onboarding-title">
              Crie uma conta com Longer
            </Typography>
            <div className="input-container">
              <TextField
                fullWidth
                type="email"
                placeholder="Email"
                value={data.email}
                onChange={(e) => updateData('email', e.target.value)}
                className="onboarding-input"
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#F5F5F5',
                    borderRadius: '12px',
                    '& fieldset': { border: 'none' },
                  },
                  '& .MuiInputBase-input': {
                    color: data.email ? '#1E1E1E' : '#767676',
                    '&::placeholder': {
                      color: '#767676',
                      opacity: 1,
                    },
                  },
                }}
              />
            </div>
          </>
        );

      case 8:
        return (
          <>
            <Typography className="onboarding-title">
              Confirme sua senha
            </Typography>
            <div className="input-container">
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                placeholder="Senha"
                value={data.password}
                onChange={(e) => updateData('password', e.target.value)}
                className="onboarding-input"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: '#767676' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                sx={{
                  marginBottom: 2,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#F5F5F5',
                    borderRadius: '12px',
                    '& fieldset': { border: 'none' },
                  },
                  '& .MuiInputBase-input': {
                    color: data.password ? '#1E1E1E' : '#767676',
                    '&::placeholder': {
                      color: '#767676',
                      opacity: 1,
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirme sua senha"
                value={data.confirmPassword}
                onChange={(e) => updateData('confirmPassword', e.target.value)}
                className="onboarding-input"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      sx={{ color: '#767676' }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#F5F5F5',
                    borderRadius: '12px',
                    '& fieldset': { border: 'none' },
                  },
                  '& .MuiInputBase-input': {
                    color: data.confirmPassword ? '#1E1E1E' : '#767676',
                    '&::placeholder': {
                      color: '#767676',
                      opacity: 1,
                    },
                  },
                }}
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-content">
        {/* Header with Back Arrow, Progress Bar, and Help */}
        <div className="onboarding-header">
          <IconButton 
            onClick={handleBack}
            className="back-button"
          >
            <ArrowBack />
          </IconButton>
          
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
          
          <IconButton 
            onClick={handleHelp}
            className="help-button"
          >
            <HelpOutline />
          </IconButton>
        </div>

        {/* Main Content */}
        <div className="onboarding-main">
          {renderStepContent()}
        </div>

        {/* Continue Button */}
        <div className="onboarding-footer">
          <Button
            fullWidth
            variant="contained"
            onClick={handleContinue}
            disabled={!isStepValid()}
            className={`continue-button ${isStepValid() ? 'active' : 'inactive'}`}
            sx={{
              backgroundColor: '#0270FF',
              color: '#FFFFFF',
              borderRadius: '12px',
              padding: '14px 20px',
              fontSize: '16px',
              textTransform: 'none',
              opacity: isStepValid() ? 1 : 0.3,
              '&:hover': {
                backgroundColor: isStepValid() ? '#0056CC' : '#0270FF',
              },
              '&.Mui-disabled': {
                color: '#FFFFFF',
                backgroundColor: '#0270FF',
                opacity: 0.3,
              },
            }}
          >
            {currentStep === totalSteps ? 'Finalizar' : 'Continuar'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage; 