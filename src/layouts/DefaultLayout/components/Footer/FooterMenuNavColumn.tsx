import styles from './styles.module.scss';

type FooterMenuNavColumnProps = {
  title: string;
};

export const FooterMenuNavColumn: React.FC<FooterMenuNavColumnProps> = ({
  title,
  children,
}) => (
  <nav className={styles['footer-menu-nav-column']}>
    <p>{title}</p>
    {children}
  </nav>
);
