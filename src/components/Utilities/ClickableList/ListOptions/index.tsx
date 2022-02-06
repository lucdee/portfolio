import styles from './styles.module.scss';

type ListOptionsProps = {
  labels: string[];
  activeItem: string;
  onItemClick: (label: string) => void;
};

export const ListOptions: React.FC<ListOptionsProps> = ({
  activeItem,
  labels,
  onItemClick,
}) => {
  return (
    <ul className={styles.listOptionsContainer}>
      {labels.map(label => (
        <li
          key={label}
          className={`${styles.listOption} ${
            activeItem === label ? styles.isActive : ''
          }`}
          onClick={() => onItemClick(label)}
          title={`Visualizar ${label}`}
        >
          <p className="text">{label}</p>
        </li>
      ))}
    </ul>
  );
};
