import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-tailwind/react';
import './index.css';
import { setupStore } from 'store/store';
import App from './App';

const store = setupStore();
const root = createRoot(document.getElementById('root') as HTMLDivElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
