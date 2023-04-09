import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext'
import { GoogleOAuthProvider } from '@react-oauth/google';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <GoogleOAuthProvider clientId="17844522649-st5727v3qabtijgdvveg9ngsq944bdpo.apps.googleusercontent.com">
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
