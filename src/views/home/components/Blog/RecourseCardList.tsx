import { RecourseCard } from './RecourseCard';

import styles from './RecourseCardList.module.scss';

type RecourseListProps = {
  items: {
    category: string;
    createdAt: string;
    title: string;
    resume: string;
    img: string;
    link: string;
  }[];
};

export const RecourseList: React.FC<RecourseListProps> = ({ items }) => (
  <section id="recursos-section" className={styles['recursos-section']}>
    <div className="centralized-container">
      <div className={styles['recursos-list-container']}>
        {items.map((item, index) => (
          <RecourseCard key={index} item={item} />
        ))}
      </div>
    </div>
  </section>
);
