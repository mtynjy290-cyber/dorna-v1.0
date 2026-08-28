import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ProductsPage } from './ProductsPage.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductsPage />
  </StrictMode>,
);
