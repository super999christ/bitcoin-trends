// External Dependencies

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

// Internal Depedencies
import CryptoTracker from './CryptoTracker';
import './App.css';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
   <CryptoTracker cryptoName="bitcoin" />
   <ReactQueryDevtools />
  </QueryClientProvider>
);

export default App;
