import * as Yup from 'yup';

export const newsLetterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Formato de email inválido')
    .required('O email é obrigatório'),
});
