import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from './routes/Home';
import TwitterAuthCallback from './routes/TwitterAuthCallback';

const Root = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/callback" element={<TwitterAuthCallback />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
