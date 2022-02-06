import Image from 'next/image';

import { FiArrowRight } from 'react-icons/fi';

import { ActionLink } from 'components/Utilities/ActionLink';
import { ClickableList } from 'components/Utilities/ClickableList';

import styles from './styles.module.scss';
import { RecourseList } from './RecourseCardList';
import { recourseItems } from './recourseItems';

export const Blog: React.FC = () => (
  <section className={styles['blog-section']}>
    <div className="centralized-container">
      <div className={styles['blog-section-content']}>
        <article className={styles['blog-section-description']}>
          <h2 className="heading2">Explore meus trabalhos</h2>
        </article>
        <RecourseList items={recourseItems} />
      </div>
    </div>
  </section>
);
