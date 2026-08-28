import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BlogPage } from './BlogPage';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BlogPage />
  </StrictMode>,
);
