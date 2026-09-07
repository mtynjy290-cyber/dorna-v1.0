import React from 'react';
import ReactDOM from 'react-dom/client';
import { AboutPage } from './AboutPage';
import './index.css';
import './lib/smoothScroll';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AboutPage />
  </React.StrictMode>
);
