import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Globalstyles } from './styledcomponents/globalStyles.js';
import { ResetStyles } from './styledcomponents/resetStyles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <ResetStyles />
    <Globalstyles/>
  </React.StrictMode>
);

