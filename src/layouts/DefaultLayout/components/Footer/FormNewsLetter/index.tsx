import { useState } from 'react';

import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

import { newsLetterSchema } from '../utils/newsLetterSchema';

import { Button } from '../../../../../components/Form/Button';

import styles from './styles.module.scss';

type RegisterStatus = 'initial' | 'loading' | 'success' | 'error';

type RegisterEmailFormData = {
  email: string;
};

export const FormNewsLetter: React.FC = () => {
  const [registerStatus, setRegisterStatus] =
    useState<RegisterStatus>('initial');

  const handleRegisterEmail = async (formData: RegisterEmailFormData) => {
    setRegisterStatus('loading');

    try {
      const { data } = await axios.post(
        '/api/active-campaign/contact',
        formData,
      );

      setRegisterStatus(data.error ? 'error' : 'success');
    } catch (err) {
      console.error(err.message);
      setRegisterStatus('error');
    }
  };

  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={handleRegisterEmail}
        validationSchema={newsLetterSchema}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ errors }) => (
          <Form>
            <Field
              type="email"
              name="email"
              placeholder="Digite seu email aqui"
              disabled={registerStatus === 'success'}
              className={`${errors.email ? styles.fieldError : ''}`}
            />

            {errors.email && (
              <span className={`${styles.status} ${styles.error}`}>
                <FiAlertCircle /> {errors.email}
              </span>
            )}

            {registerStatus === 'loading' && (
              <span className={`${styles.status} ${styles.loading}`}>
                Cadastrando email...
              </span>
            )}

            {registerStatus === 'success' && (
              <span className={`${styles.status} ${styles.success}`}>
                <FiCheckCircle /> Email cadastrado com sucesso!
              </span>
            )}

            {registerStatus === 'error' && (
              <span className={`${styles.status} ${styles.error}`}>
                <FiAlertCircle /> Erro ao cadastrar este email
              </span>
            )}

            <Button
              type="submit"
              title="Clique para enviar"
              background="secondary"
              disabled={registerStatus === 'success'}
            >
              Enviar
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
