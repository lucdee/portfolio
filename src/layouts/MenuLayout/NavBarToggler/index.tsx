import styles from './styles.module.scss';

type NavBarTogglerProps = {
  isMenuOpen: boolean;
  onClick: () => void;
};

export const NavBarToggler: React.FC<NavBarTogglerProps> = ({
  isMenuOpen,
  onClick,
}) => (
  <button
    className={`${styles['toggler-button']} ${
      isMenuOpen ? styles['is-menu-open'] : ''
    }`}
    onClick={onClick}
    type="button"
  >
    <span className={styles.line} />
    <span className={styles.line} />
    <span className={styles.line} />
  </button>
);
