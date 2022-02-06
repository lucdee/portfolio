import type { BreadcrumbProps } from 'components/Breadcrumb';

import { Menu } from './components/Menu';
import { Footer } from './components/Footer';

import styles from './styles.module.scss';

type DefaultLayoutProps = {
  breadcrumb?: BreadcrumbProps;
};

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  breadcrumb,
}) => (
  <div className={styles.defaultLayoutContainer}>
    <Menu breadcrumb={breadcrumb} />
    {children}
    <Footer />
  </div>
);
