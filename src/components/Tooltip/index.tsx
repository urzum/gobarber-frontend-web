import React from 'react';

import { Container } from './styles';

interface ToolstipProps {
  title: string;
  className?: string; // quando se utiliza o componente chamado de outro Styles, é preciso colocar a classe para que ele erde a classe de onde está sendo chamado
}

const Tooptip: React.FC<ToolstipProps> = ({ title, className, children }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooptip;
