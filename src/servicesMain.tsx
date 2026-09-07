import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ServicesPage } from './ServicesPage.tsx';
import './index.css';
import './lib/smoothScroll';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ServicesPage />
  </StrictMode>,
);
