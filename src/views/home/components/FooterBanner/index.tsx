import styles from './styles.module.scss';

export const FooterBanner: React.FC = () => (
  <section
    id="footer-banner-section"
    className={styles['footer-banner-section']}
  >
    <div className="centralized-container">
      <div className={styles['footer-banner-section-content']}>
        <div className={styles['footer-banner-section-description']}>
          <p className="body2">
            Entre em contato com um especialista de visão ousada e centrada no
            cliente.
          </p>
          <a
            href="https://conteudos.brinov.com/fale-com-um-consultor"
            target="_blank"
            rel="noopener noreferrer"
            title="Falar com um consultor"
          >
            Falar com um Consultor
          </a>
        </div>
      </div>
    </div>
  </section>
);
