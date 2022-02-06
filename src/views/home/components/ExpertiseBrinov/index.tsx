import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';

export const ExpertiseBrinov: React.FC = () => (
  <section
    id="expertise-brinov-section"
    className={styles['expertise-section']}
  >
    <div className="centralized-container">
      <div className={styles['expertise-section-content']}>
        <div className={styles['companies-logos']}>
          <Image
            src="/views/home/imgs/astronauta3.png"
            width={500}
            height={500}
            alt="decathlon"
          />
        </div>

        <article
          data-aos="fade-up"
          className={styles['expertise-section-description']}
        >
          <Link href="https://github.com/lucdee">
            <a target="_blank">
              <Image
                src="/views/home/imgs/github.png"
                width={500}
                height={500}
                alt="decathlon"
              />
            </a>
          </Link>
        </article>
      </div>
    </div>
  </section>
);
