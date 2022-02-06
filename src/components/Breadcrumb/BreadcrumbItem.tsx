import Link from 'next/link';

import styles from './styles.module.scss';

type BreadcrumbItemProps = {
  label: string;
  href?: string;
};

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  label,
  href,
}) => {
  return (
    <li className={styles['breadcrumb-item-container']}>
      {href ? (
        <Link href={href}>
          <a>{label}</a>
        </Link>
      ) : (
        <p>{label}</p>
      )}
    </li>
  );
};
