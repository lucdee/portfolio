import { FiChevronDown } from 'react-icons/fi';

import styles from './styles.module.scss';

type SeeMoreButtonProps = {
  isDisabled: boolean;
  onClick: () => void;
};

export const SeeMoreButton: React.FC<SeeMoreButtonProps> = ({
  isDisabled,
  onClick,
}) => (
  <button
    type="button"
    title={isDisabled ? '' : 'Clique para exibir mais posts'}
    className={styles['see-more-button']}
    disabled={isDisabled}
    onClick={onClick}
  >
    Exibir mais <FiChevronDown size={24} />
  </button>
);
