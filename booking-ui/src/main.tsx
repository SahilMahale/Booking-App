import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthProvider from './Context/AuthContext';
import './index.css';
import Routes from './utils/Routes';

function attachReactToRoot(): void {
  const queryClient = new QueryClient();
  const rootElement: HTMLElement | null = document.getElementById('root')
  if (!rootElement) {
    alert("ROOT ELEMENT not found")
    return
  }
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Routes />
        </QueryClientProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}

attachReactToRoot()
