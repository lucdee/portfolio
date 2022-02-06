import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

import type { MenuNode } from '../utils/MenuNode';

import styles from './styles.module.scss';

type NavItemContentProps = {
  nodes: MenuNode[];
  isMenuActive: boolean;
  href?: string;
  onBackgroundClick: () => void;
};

export const NavItemContent: React.FC<NavItemContentProps> = ({
  nodes,
  isMenuActive,
  href,
  onBackgroundClick,
}) => (
  <>
    <div
      className={`${styles['active-menu-background']} ${
        isMenuActive ? styles['is-menu-active'] : ''
      }`}
      onClick={onBackgroundClick}
    />
    <div className={styles['menu-nodes-container']}>
      {nodes.flatMap(({ title, items }, index) => (
        <article key={index} className={styles['menu-node-item-container']}>
          <h3 className="heading3">
            {href ? (
              <Link href={href}>
                <a>
                  {title}
                  <FiChevronRight size={20} />
                </a>
              </Link>
            ) : (
              title
            )}
          </h3>

          <div className={styles['items-container']}>
            {items.map(({ description, label, path, isAnchor }) =>
              isAnchor ? (
                <a
                  key={label}
                  href={path}
                  title={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <strong className="strong1">{label}</strong>
                  <span className="caption">{description}</span>
                </a>
              ) : (
                <Link key={label} href={path}>
                  <a title={label}>
                    <strong className="strong1">{label}</strong>
                    <span className="caption">{description}</span>
                  </a>
                </Link>
              ),
            )}
          </div>
        </article>
      ))}
    </div>
  </>
);
