import { ValidationError } from 'yup'; // importa todos as propriedades de erros do Yup

// cria uma interface para que seja utilizados por todos os campos deixando o key para dizer que é uma string
interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const ValidationErrors: Errors = {};

  err.inner.forEach(error => {
    ValidationErrors[error.path] = error.message;
  });

  return ValidationErrors;
}
