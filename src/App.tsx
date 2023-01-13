import React from 'react';
import CryptoTracker from './CryptoTracker';

import './App.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
   <CryptoTracker cryptoName="bitcoin" />
   <ReactQueryDevtools />
  </QueryClientProvider>
);

export default App;
