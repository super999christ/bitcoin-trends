// External Dependencies

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

// Internal Depedencies
import CryptoTracker from './Components/CryptoTracker';

import './App.css';

const queryClient = new QueryClient();
const queryClientTwo = new QueryClient();

const App = () => (
  <div>
    <div className='bitcoin-wrapper'>
      <QueryClientProvider client={queryClient}>
        <CryptoTracker cryptoName="bitcoin" />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
    <br></br>
    <div className='ethereum-wrapper'>
      <QueryClientProvider client={queryClientTwo}>
        <CryptoTracker cryptoName="ethereum" />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  </div>
);

export default App;