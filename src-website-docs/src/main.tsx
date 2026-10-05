import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/site.css';

// Mount the documentation app in the Vite HTML shell and load its site-wide styles.
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
