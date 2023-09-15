import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Home from './routes/Home';
import TwitterAuthCallback from './routes/TwitterAuthCallback';
import Dashboard from './routes/Dashboard';

// Função de verificação de parâmetros
function isCallbackAllowed(params) {
  return params.has('state') && params.has('code');
}

// Verifica se há um accessTokenStorage no localStorage
const isAuthenticated = !!localStorage.getItem('accessTokenStorage');

const Root = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        {/* Rota Home (não requer autenticação) */}
        <Route index element={isAuthenticated ? <Dashboard /> : <Home />} />

        {/* Rota de callback (restringe por parâmetros) */}
        <Route
          path="/callback"
          element={
            !isAuthenticated && isCallbackAllowed(new URLSearchParams(window.location.search)) ? (
              <TwitterAuthCallback />
            ) : (
              isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/" />
            )
          }
        />

        {/* Rota de dashboard (requer autenticação) */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
