import * as Yup from 'yup';

export const contactFormSchema = Yup.object().shape({
  firstName: Yup.string().required('Primeiro nome obrigatório.'),
  lastName: Yup.string(),
  jobTitle: Yup.string().required('Cargo obrigatório.'),
  email: Yup.string()
    .email('Email inválido.')
    .required('Email corporativo obrigatório.'),
  phoneNumber: Yup.string().required('Número de telefone obrigatório.'),
  companyName: Yup.string().required('Nome da empresa obrigatório.'),
  cnpj: Yup.string().required('CNPJ obrigatório.'),
  contributors: Yup.number().required('Nº de colaboradores obrigatório.'),
  additionalInformation: Yup.string(),
});
