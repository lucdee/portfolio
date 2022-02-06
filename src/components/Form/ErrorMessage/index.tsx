import { FiAlertCircle } from 'react-icons/fi';

import styles from './styles.module.scss';

interface ErrorMessageProps {
  error: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => (
  <section className={styles.errorMessageContainer}>
    <FiAlertCircle size={18} />
    <span className="caption">{error}</span>
  </section>
);
