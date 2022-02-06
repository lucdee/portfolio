import styles from './RecourseCard.module.scss';

type RecourseCardProps = {
  item: {
    category: string;
    createdAt: string;
    title: string;
    resume: string;
    img: string;
    link: string;
  };
};

export const RecourseCard: React.FC<RecourseCardProps> = ({ item }) => {
  return (
    <a href={`${item.link}`} className={styles['link']}>
      <div className={styles['recourse-card-container']}>
        <div className={styles['recourse-card-title']}>
          <p>{item.category}</p>
          <p>{item.createdAt}</p>
        </div>

        <figure className={styles['recourse-card-image-container']}>
          <img
            src={`${item.img}`}
            alt={`${item.category} - Imagem ilustrativa`}
            title={`${item.category} - Imagem ilustrativa`}
          />
        </figure>

        <article className={styles['recourse-card-content']}>
          <h3>{item.title}</h3>
          <p className="body6">{item.resume}</p>
        </article>
      </div>
    </a>
  );
};
