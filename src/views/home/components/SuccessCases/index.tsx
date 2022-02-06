import { SuccessCasesDepoiments } from './SuccessCasesDepoiments';
import Image from 'next/image';
import styles from './styles.module.scss';

export const SuccessCases: React.FC = () => (
  <section
    id="cases-de-sucesso-section"
    className={styles['success-cases-section']}
  >
    <div className="centralized-container">
      <div className={styles['success-cases-section-content']}>
        <span className={styles['gray-circle']} />

        <article className={styles['success-cases-section-description']}>
          <h2 className="heading2">Sobre mim</h2>
        </article>

        <SuccessCasesDepoiments />
      </div>
    </div>
  </section>
);
