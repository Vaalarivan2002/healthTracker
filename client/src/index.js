import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext.js';
import axios from 'axios';
import "./index.css"

axios.defaults.baseURL = `${process.env.BACKEND_URL}/api`
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
  </React.StrictMode>
);
