import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import { store } from './store';
import { theme } from './styles/theme';

// Function to render the root component of the application
const render = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Failed to find the root element');

  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

// Call the render function
render();

// Human tasks:
// TODO: Confirm the correct theme configuration for ThemeProvider
// TODO: Verify if any additional global styles or CSS resets need to be imported