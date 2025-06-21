'use client';

import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Metadata } from 'next';
import './globals.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#F3F3F3',
    },
    background: {
      default: '#000000',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#F3F3F3',
    },
  },
  typography: {
    fontFamily: 'Inter, SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '24px',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    body1: {
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: 1.4,
    },
    button: {
      fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
      fontWeight: 400,
      fontSize: '17px',
      lineHeight: 1.29,
      letterSpacing: '-0.025em',
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '14px 20px',
          fontSize: '17px',
          fontWeight: 400,
          textTransform: 'none',
        },
        contained: {
          backgroundColor: '#FFFFFF',
          color: '#1E1E1E',
          '&:hover': {
            backgroundColor: '#F5F5F5',
          },
        },
        text: {
          color: '#F5F5F5',
          '&:hover': {
            backgroundColor: 'rgba(245, 245, 245, 0.1)',
          },
        },
      },
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Longer - Sua dieta ideal com monitoramento inteligente</title>
        <meta name="description" content="Emagrecimento inteligente com planos baseados no seu DNA e acompanhamento por IA em tempo real." />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
} 