import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { CalculatorPage } from './CalculatorPage.tsx';
import './index.css';

const isCalculatorRoute = typeof window !== 'undefined' && window.location.pathname.includes('calculator');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isCalculatorRoute ? <CalculatorPage /> : <App />}
  </StrictMode>,
);

