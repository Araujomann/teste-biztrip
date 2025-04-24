// src/styles/stitches.config.ts
import { createStitches } from '@stitches/react';

export const { styled, css, globalCss, keyframes, theme, getCssText } =
  createStitches({
    theme: {
      colors: {
        // Cores primárias (baseado no Figma)
        primary: '#0066FF',
        primaryLight: '#E6F0FF',
        secondary: '#FF6B00',
        background: '#FFFFFF',
        surface: '#F5F5F5',
        text: '#333333',
        textLight: '#666666',
        error: '#FF3B30',
        success: '#34C759',
        warning: '#FFCC00',

        // Cores neutras
        gray100: '#F5F5F5',
        gray200: '#EEEEEE',
        gray300: '#E0E0E0',
        gray400: '#BDBDBD',
      },
      fonts: {
        system: 'system-ui, -apple-system, Arial, sans-serif',
      },
      fontSizes: {
        small: '0.875rem',
        medium: '1rem',
        large: '1.25rem',
      },
      space: {
        1: '4px',
        2: '8px',
        3: '16px',
        4: '24px',
      },
      radii: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
    },
    media: {
      mobile: '(max-width: 768px)',
      tablet: '(min-width: 769px) and (max-width: 1024px)',
      desktop: '(min-width: 1025px)',
    },
  });
