import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CalculatorPage } from './CalculatorPage.tsx';
import './index.css';
import './lib/smoothScroll';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CalculatorPage />
  </StrictMode>,
);
