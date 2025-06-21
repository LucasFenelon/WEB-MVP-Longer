'use client';

import React, { useEffect, useState } from 'react';
import { Typography, IconButton, TextField } from '@mui/material';
import { HelpOutline, CalendarToday, Chat } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Logger } from '../../src/utils/logger';

const HomePage: React.FC = () => {
  const router = useRouter();
  
  // Editable state for card values
  const [consumedKcal, setConsumedKcal] = useState<string>('0');
  const [exerciseBurned, setExerciseBurned] = useState<string>('0');
  const [sleepHours, setSleepHours] = useState<string>('0');

  useEffect(() => {
    Logger.info('HomePage component initialized');
    return () => {
      Logger.info('HomePage component unmounted');
    };
  }, []);

  // Nutrition data
  const totalKcal = 1920;
  // consumedKcal is now managed by state
  const consumedKcalNum = parseInt(consumedKcal) || 0;
  const remainingKcal = Math.max(totalKcal - consumedKcalNum, 0);
  const progressPercentage = Math.min((consumedKcalNum / totalKcal) * 100, 100);

  // Exercise data - using same target as nutrition (1920 kcal)
  const exerciseTarget = totalKcal; // Use same target as nutrition (1920 kcal)
  // exerciseBurned is now managed by state
  const exerciseBurnedNum = parseInt(exerciseBurned) || 0;
  const exercisePercentage = Math.min((exerciseBurnedNum / exerciseTarget) * 100, 100);

  // Sleep data
  const sleepTarget = 8; // Target hours of sleep
  // sleepHours is now managed by state
  const sleepHoursNum = parseInt(sleepHours) || 0;
  const sleepPercentage = Math.min((sleepHoursNum / sleepTarget) * 100, 100);

  const calculateNutritionProgress = (consumed: number, total: number) => {
    try {
      Logger.info('calculateNutritionProgress function started');
      const remaining = Math.max(total - consumed, 0);
      const percentage = Math.min((consumed / total) * 100, 100);
      Logger.info('calculateNutritionProgress function completed');
      return { remaining, percentage };
    } catch (error) {
      Logger.error('Error in calculateNutritionProgress:', error);
      return { remaining: total, percentage: 0 };
    }
  };

  const calculateExerciseProgress = (burned: number, target: number) => {
    try {
      Logger.info('calculateExerciseProgress function started');
      const percentage = Math.min((burned / target) * 100, 100);
      Logger.info('calculateExerciseProgress function completed');
      return { percentage };
    } catch (error) {
      Logger.error('Error in calculateExerciseProgress:', error);
      return { percentage: 0 };
    }
  };

  const calculateSleepProgress = (hours: number, target: number) => {
    try {
      Logger.info('calculateSleepProgress function started');
      const percentage = Math.min((hours / target) * 100, 100);
      Logger.info('calculateSleepProgress function completed');
      return { percentage };
    } catch (error) {
      Logger.error('Error in calculateSleepProgress:', error);
      return { percentage: 0 };
    }
  };

  const weekDays = [
    { day: 'seg.', date: '26', active: true },
    { day: 'ter.', date: '27', active: false },
    { day: 'qua.', date: '28', active: false },
    { day: 'qui.', date: '29', active: false },
    { day: 'sex.', date: '30', active: false },
    { day: 'sab.', date: '31', active: false },
    { day: 'dom.', date: '01', active: false },
  ];

  const handleChatNavigation = () => {
    try {
      Logger.info('handleChatNavigation function started');
      router.push('/chat');
      Logger.info('handleChatNavigation function completed');
    } catch (error) {
      Logger.error('Error in handleChatNavigation:', error);
    }
  };

  const handleValueChange = (type: 'nutrition' | 'exercise' | 'sleep', value: string) => {
    try {
      Logger.info(`handleValueChange function started for ${type}`);
      
      switch (type) {
        case 'nutrition':
          setConsumedKcal(value);
          break;
        case 'exercise':
          setExerciseBurned(value);
          break;
        case 'sleep':
          const numValue = parseInt(value) || 0;
          setSleepHours(Math.min(numValue, 24).toString()); // Cap sleep at 24 hours
          break;
      }
      Logger.info(`handleValueChange function completed for ${type} with value: ${value}`);
    } catch (error) {
      Logger.error(`Error in handleValueChange for ${type}:`, error);
    }
  };

  return (
    <div className="home-page">
      {/* Header */}
      <div className="home-header">
        <div className="header-left">
          <Image
            src="/images/user-avatar.svg"
            alt="User Profile"
            width={32}
            height={32}
            className="profile-avatar-img"
          />
        </div>
        <div className="header-center">
          <Image
            src="/images/home-logo-complete.svg"
            alt="Longer Logo"
            width={16}
            height={25}
            className="home-app-logo"
          />
        </div>
        <div className="header-right">
          <IconButton className="header-icon">
            <HelpOutline sx={{ color: 'rgba(0,0,0,0.8)', fontSize: '24px' }} />
          </IconButton>
          <IconButton className="header-icon">
            <CalendarToday sx={{ color: 'rgba(0,0,0,0.8)', fontSize: '24px' }} />
          </IconButton>
        </div>
      </div>

      {/* Main Content */}
      <div className="home-main">
        {/* Weekly Calendar */}
        <div className="week-calendar">
          {weekDays.map((day, index) => (
            <div key={index} className={`day-card ${day.active ? 'active' : ''}`}>
              <Typography className="day-name">{day.day}</Typography>
              <Typography className="day-number">{day.date}</Typography>
              <div className="day-indicator"></div>
            </div>
          ))}
        </div>

        {/* DNA Exam Card */}
        <div className="dna-card">
          <Typography className="dna-text">Agende seu exame de DNA</Typography>
        </div>

        {/* Cards Container for Desktop Grid Layout */}
        <div className="cards-container">
          {/* Nutrition Card */}
          <div className="nutrition-card">
            <div className="card-header">
              <Typography className="card-title">🍎 Alimentação</Typography>
              <div className="arrow-icon">→</div>
            </div>
            <div className="nutrition-stats">
              <div className="stat-item">
                <Typography className="stat-label">kcal consumidas</Typography>
                <TextField
                  type="number"
                  value={consumedKcal}
                  onChange={(e) => handleValueChange('nutrition', e.target.value)}
                  variant="standard"
                  className="no-spinner"
                  inputProps={{
                    min: 0,
                    style: {
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: '68px',
                      lineHeight: '0.941',
                      letterSpacing: '-1.47%',
                      color: '#000000',
                      textAlign: 'left',
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                      padding: 0,
                      margin: 0,
                    }
                  }}
                  sx={{
                    '& .MuiInput-underline:before': { display: 'none' },
                    '& .MuiInput-underline:after': { display: 'none' },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { display: 'none' },
                  }}
                />
              </div>
              <div className="stat-item">
                <Typography className="stat-label">kcal restantes</Typography>
                <Typography className="stat-value remaining">{remainingKcal}</Typography>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-bar-inner">
                <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
              </div>
            </div>
          </div>

          {/* Exercise Card */}
          <div className="exercise-card">
            <div className="card-header">
              <Typography className="card-title">🧘 Exercícios</Typography>
              <div className="arrow-icon">→</div>
            </div>
            <div className="exercise-content">
              <div className="exercise-stats">
                <Typography className="stat-label">kcal queimadas</Typography>
                <TextField
                  type="number"
                  value={exerciseBurned}
                  onChange={(e) => handleValueChange('exercise', e.target.value)}
                  variant="standard"
                  className="no-spinner"
                  inputProps={{
                    min: 0,
                    style: {
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: '68px',
                      lineHeight: '0.941',
                      letterSpacing: '-1.47%',
                      color: '#000000',
                      textAlign: 'left',
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                      padding: 0,
                      margin: 0,
                    }
                  }}
                  sx={{
                    '& .MuiInput-underline:before': { display: 'none' },
                    '& .MuiInput-underline:after': { display: 'none' },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { display: 'none' },
                  }}
                />
              </div>
              <div className="circular-progress">
                <svg className="progress-ring" width="88" height="88">
                  <circle
                    className="progress-ring-bg"
                    cx="44"
                    cy="44"
                    r="40"
                    fill="transparent"
                    stroke="#EFEFEF"
                    strokeWidth="4"
                  />
                  <circle
                    className="progress-ring-fill"
                    cx="44"
                    cy="44"
                    r="40"
                    fill="transparent"
                    stroke="url(#exerciseGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - exercisePercentage / 100)}`}
                    transform="rotate(-90 44 44)"
                  />
                  <defs>
                    <linearGradient id="exerciseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#83B9FF" />
                      <stop offset="100%" stopColor="#007AFF" />
                    </linearGradient>
                  </defs>
                </svg>
                <Typography className="circle-value">{Math.round(exercisePercentage)}%</Typography>
              </div>
            </div>
          </div>

          {/* Sleep Card */}
          <div className="sleep-card">
            <div className="card-header">
              <Typography className="card-title">🛌 Sono</Typography>
              <div className="arrow-icon">→</div>
            </div>
            <div className="sleep-content">
              <div className="sleep-stats">
                <Typography className="stat-label">Tempo de cama</Typography>
                <TextField
                  type="number"
                  value={sleepHours}
                  onChange={(e) => handleValueChange('sleep', e.target.value)}
                  variant="standard"
                  className="no-spinner"
                  inputProps={{
                    min: 0,
                    max: 24,
                    style: {
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 400,
                      fontSize: '68px',
                      lineHeight: '0.941',
                      letterSpacing: '-1.47%',
                      color: '#000000',
                      textAlign: 'left',
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                      padding: 0,
                      margin: 0,
                      width: 'auto',
                    }
                  }}
                  sx={{
                    '& .MuiInput-underline:before': { display: 'none' },
                    '& .MuiInput-underline:after': { display: 'none' },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': { display: 'none' },
                    width: 'auto',
                    minWidth: '80px',
                  }}
                />
              </div>
              <div className="circular-progress">
                <svg className="progress-ring" width="88" height="88">
                  <circle
                    className="progress-ring-bg"
                    cx="44"
                    cy="44"
                    r="40"
                    fill="transparent"
                    stroke="#EFEFEF"
                    strokeWidth="4"
                  />
                  <circle
                    className="progress-ring-fill"
                    cx="44"
                    cy="44"
                    r="40"
                    fill="transparent"
                    stroke="url(#sleepGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - sleepPercentage / 100)}`}
                    transform="rotate(-90 44 44)"
                  />
                  <defs>
                    <linearGradient id="sleepGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#83B9FF" />
                      <stop offset="100%" stopColor="#007AFF" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="moon-icon">🌙</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <div className="floating-chat-button" onClick={handleChatNavigation}>
        <IconButton className="chat-fab">
          <Chat sx={{ color: '#FFFFFF', fontSize: '28px' }} />
        </IconButton>
      </div>
    </div>
  );
};

export default HomePage; 