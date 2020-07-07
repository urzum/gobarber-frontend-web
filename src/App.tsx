import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/global';

import AppProvider from './hooks';

import Routes from './routes';

// AppProvider = Tudo o que colocar dentro dele, terá acesso aos dados, ou seja, cria uma variavel global

const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <Routes />
    </AppProvider>
    <GlobalStyle />
  </BrowserRouter>
);
export default App;
