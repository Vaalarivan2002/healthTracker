import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext.js';
import axios from 'axios';
import "./index.css"
import { BACKEND_URL } from './constants.js';



axios.defaults.baseURL = `${BACKEND_URL}/api`;
console.log(process.env);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
  </React.StrictMode>
);
