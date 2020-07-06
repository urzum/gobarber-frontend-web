import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

// faz uma interface com extenção dos componentes HTML
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}

// na utilização de Formulario, passa-se parametros no qual que especifico e depois faz a desestroturação do restante '...rest'
const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFielled, setIsFielled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  // useCallback é utilizada pois toda função criada dentro de outra função, quando se reenderiza a função principal, a função interna também é recriada
  // nesse caso, ela só ira carregada se houver uma mudanção de estada nos parametros ,[] que estiverem no final dela. No exemplo baixo, nunca será recriada
  // pois o parametro está vazio
  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFielled(!!inputRef.current?.value);
  }, []);

  // gera o estado do componente total, utilizando o registerField com dados do campo que quer o estado buscando pelo nome do campo
  useEffect(() => {
    registerField({
      name: fieldName, // nome do campo
      ref: inputRef.current, // referencia usada como se fosse um getElement
      path: 'value', // conteudo do campo
    });
  }, [fieldName, registerField]);

  // o ...rest são todos os metodos restantes de um campo input padrão
  return (
    <Container isErrored={!!error} isFielled={isFielled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};
export default Input;
