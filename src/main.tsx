import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App.tsx';

import './index.css';



const rootElement: HTMLElement | null = document.getElementById('root');

try {
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
      <Router>
        <StrictMode>
          <App />
        </StrictMode>,
      </Router>
    );
  }
} catch (error) {
  throw new Error(`Could not find root element. Error: ${error}`);
}