import React, { useEffect, useState } from 'react';
import { Router } from 'react-router-dom';

import './App.scss';

import history from './history';

import CLayout from './components/CLayout/CLayout';
import Login from './pages/Login/Login';

import { hasToken } from './services/authSvc';

export const App = () => {
  const [isToken, setIsToken] = useState(hasToken());

  useEffect(() => history.listen(() => setIsToken(hasToken())), []);

  return (
    <>
      <Router history={history}>
        {isToken ? (
          <CLayout
            handlerToken={() => {
              setIsToken(false);
            }}
          />
        ) : (
          <Login setIsToken={setIsToken} />
        )}
      </Router>
    </>
  );
};

export default App;
