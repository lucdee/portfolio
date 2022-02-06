import Link, { LinkProps } from 'next/link';
import type { ComponentType } from 'react';
import type { IconBaseProps } from 'react-icons';

import type { BackgroundVariations } from './utils/BackgroundVariations';

import styles from './styles.module.scss';

interface ActionLinkProps extends LinkProps {
  label: string;
  isOutlined?: boolean;
  background?: BackgroundVariations;
  icon?: ComponentType<IconBaseProps>;
  className?: string;
}

export const ActionLink: React.FC<ActionLinkProps> = ({
  label,
  isOutlined,
  icon: Icon,
  background,
  children,
  className,
  ...rest
}) => (
  <Link {...rest}>
    <a
      className={[
        styles.actionLinkContainer,
        `${background ? styles[`btn-${background}`] : styles[`btn-primary`]}`,
        `${isOutlined ? styles[`btn-outlined-${background}`] : ''}`,
        `${className ? className : ''}`,
      ].join(' ')}
      title={label}
    >
      {label}
      {Icon && <Icon size={22} />}
    </a>
  </Link>
);
