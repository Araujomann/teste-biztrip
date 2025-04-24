import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

// 1. Configuração do Stitches (CSS-in-JS)
import { globalCss } from './styles/stitches.config';

// 2. Configuração do React Query (Data Fetching)
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 3. Configuração do Radix (Acessibilidade)
import * as Radix from '@radix-ui/react-dialog';

// Estilos globais do Stitches
const globalStyles = globalCss({
  body: {
    fontFamily: '$system',
    margin: 0,
    backgroundColor: '$background',
  },
  '*': {
    boxSizing: 'border-box',
  },
});

// Criação do cliente do React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Otimização para desenvolvimento
    },
  },
});

// Aplica os estilos globais
globalStyles();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Radix.Root>
        <App />
      </Radix.Root>
    </QueryClientProvider>
  </React.StrictMode>
);
