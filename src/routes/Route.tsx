import React from 'react';
import {
  Redirect,
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRoutesProps,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRoutesProps {
  isPrivate?: boolean;
  component: React.ComponentType; // sobrescre a forma de receber o componente, ao invés de receber <Compoent/>, recebe apenas o nome do componente {Compoent}
}

// Rota Privada / Autenticado
// true / true = ok
// true / false = Redirecionar ele para o login
// false / true = Redirecionar para o Dashboard
// false / false = ok

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Componet,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Componet />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dasboard',
              state: { from: location }, // para não perder o histórico
            }}
          />
        );
      }}
    />
  );
};

export default Route;
