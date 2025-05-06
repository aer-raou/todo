'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { ThemeProvider } from './hooks/useTheme';


export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
          <ThemeProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}