import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

import { globalCss } from './styles/stitches.config';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import * as Radix from '@radix-ui/react-dialog';

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, 
    },
  },
});

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
