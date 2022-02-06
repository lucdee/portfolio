import { BreadcrumbItem } from './BreadcrumbItem';
import styles from './styles.module.scss';

export type BreadcrumbProps = {
  items: Array<{ label: string; href?: string }>;
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <ul className={styles['breadcrumb-container']}>
      {items.map(({ label, href }) => (
        <BreadcrumbItem key={label} label={label} href={href} />
      ))}
    </ul>
  );
};
