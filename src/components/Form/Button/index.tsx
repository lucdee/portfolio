import { ButtonHTMLAttributes } from 'react';

import type { BackgroundVariations } from './utils/BackgroundVariations';

import styles from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  background?: BackgroundVariations;
  isOutlined?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  background,
  isOutlined,
  className,
  ...rest
}) => (
  <button
    className={[
      styles.buttonContainer,
      `${background ? styles[`btn-${background}`] : styles[`btn-primary`]}`,
      `${isOutlined ? styles[`btn-outlined-${background}`] : ''}`,
      `${className ? className : ''}`,
    ].join(' ')}
    {...rest}
  >
    {children}
  </button>
);
