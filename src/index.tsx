import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './app/stores/index'
import { Provider } from 'react-redux'
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import LoginForm from './app/modules/LoginForm'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="login" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);