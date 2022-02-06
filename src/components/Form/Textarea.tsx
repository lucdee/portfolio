import { TextareaHTMLAttributes } from 'react';
import { Field, FormikErrors, FormikTouched } from 'formik';

import { ErrorMessage } from './ErrorMessage';

import styles from './styles.module.scss';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string | FormikErrors<any> | string[] | FormikErrors<any>[];
}

export const Textarea: React.FC<TextareaProps> = ({ error, ...rest }) => (
  <section className={styles.fieldSection}>
    <Field
      as="textarea"
      type="textarea"
      className={[
        styles.field,
        styles.textareaField,
        !!error ? styles.isErrored : '',
      ].join(' ')}
      {...rest}
    />
    {error && <ErrorMessage error={`${error}`} />}
  </section>
);
