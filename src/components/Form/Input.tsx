import { InputHTMLAttributes } from 'react';
import { Field, FormikErrors, FormikTouched } from 'formik';

import { ErrorMessage } from './ErrorMessage';

import styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | FormikErrors<any> | string[] | FormikErrors<any>[];
}

export const Input: React.FC<InputProps> = ({ error, ...rest }) => (
  <section className={styles.fieldSection}>
    <Field
      className={[styles.field, !!error ? styles.isErrored : ''].join(' ')}
      {...rest}
    />
    {error && <ErrorMessage error={`${error}`} />}
  </section>
);
