import React from 'react';
import { useTransition } from 'react-spring'; // controla a transição de um elemento quando entra e sai da tela

import Toast from './Toast';
// importei uma interface para ficar mais facil criar outra interface
import { ToastMessage } from '../../hooks/toast';
import { Container } from './styles';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const massagesWithTransitions = useTransition(
    messages, // recebe as mensagens
    message => message.id, // recebe chave unica
    {
      from: { right: '-120%', opacity: 0 }, // onde inicia o objeto
      enter: { right: '0%', opacity: 1 }, // posição final da criação
      leave: { right: '-120%', opacity: 0 }, // onde termina o objeto
    },
  );

  return (
    <Container>
      {massagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
