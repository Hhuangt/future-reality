import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { assetUrl } from './lib/assetUrl';
import './index.css';

document.documentElement.style.setProperty(
  '--nyc-sunset-url',
  `url("${assetUrl('poster/nyc-sunset.jpg')}")`,
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
