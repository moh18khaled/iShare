import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios';
import { GoogleOAuthProvider } from '@react-oauth/google';
const CLIENT_ID =  import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Set axios to send cookies with all requests
axios.defaults.withCredentials = true;
createRoot(document.getElementById('root')).render(
    <GoogleOAuthProvider clientId={CLIENT_ID}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </GoogleOAuthProvider>
)
