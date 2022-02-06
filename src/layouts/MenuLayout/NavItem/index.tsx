import { FiChevronRight } from 'react-icons/fi';

import styles from './styles.module.scss';

type NavItemProps = {
  label: string;
  onClick: () => void;
  isActive: boolean;
};

export const NavItem: React.FC<NavItemProps> = ({
  isActive,
  label,
  onClick,
}) => (
  <li
    className={`${styles['nav-item-container']} ${
      isActive ? styles['is-active'] : ''
    }`}
    onClick={onClick}
    title={`Ver menu ${label}`}
  >
    <p className="body3">{label}</p>
    <FiChevronRight size={18} />
  </li>
);
