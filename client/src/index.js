import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import HttpsRedirect from 'react-https-redirect';
import { ThemeContextProvider } from "./utils/themeContext";
import { createRoot } from 'react-dom/client'
createRoot.render(
  <React.StrictMode>
    <HttpsRedirect>
    <ThemeContextProvider>
    <App />
    </ThemeContextProvider>
    </HttpsRedirect>
   
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
