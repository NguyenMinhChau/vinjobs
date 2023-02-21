import React from 'react';
import ReactDOM from 'react-dom/client';
import AOS from 'aos';
import { BrowserRouter } from 'react-router-dom';
import { UseProvider } from './app/';
import reportWebVitals from './reportWebVitals';
import App from './App';
import 'aos/dist/aos.css';
import './styles/reset.css';
import './styles/index.css';
import './styles/general.css';
import './styles/status.css';
import './styles/table.css';
import './styles/colors.css';
import './styles/reponsive.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
AOS.init();
root.render(
    <UseProvider>
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    </UseProvider>
);

reportWebVitals();
