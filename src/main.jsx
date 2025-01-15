// src/index.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { HelmetProvider } from 'react-helmet-async'; // Import HelmetProvider
import './index.css';
import './firebase'; // Ensure Firebase is initialized

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HelmetProvider> {/* Wrap your application with HelmetProvider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// Remove the call to reportWebVitals to prevent early execution
// reportWebVitals();
