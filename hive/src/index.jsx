import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material/styles';
import { UserProvider } from './contexts/userContext';
import customTheme from './styles/textFieldTheme';
import { AppointmentsProvider } from './contexts/appointmentsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <AppointmentsProvider>
        <ThemeProvider theme={customTheme}>
          <App />
        </ThemeProvider>
      </AppointmentsProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
