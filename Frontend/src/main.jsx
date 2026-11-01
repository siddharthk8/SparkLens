import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

const rootElement = document.getElementById('root');

const appContent = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// If the page was statically prerendered with SSG, hydrate it; otherwise createRoot
if (rootElement && rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, appContent);
} else if (rootElement) {
  createRoot(rootElement).render(appContent);
}
