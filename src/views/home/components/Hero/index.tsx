import Image from 'next/image';

import styles from './styles.module.scss';

export const Hero: React.FC = () => {
  const scrollToFooter = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 2050, behavior: 'smooth' });
    }
  };
  return (
    <section id="hero-section" className={styles['hero-section']}>
      <div className="centralized-container">
        <div className={styles['hero-section-content']}>
          <article
            data-aos="fade-right"
            className={styles['hero-section-description']}
          >
            <h1 className="heading1">
              <span>Lucas Thomazella</span>
            </h1>
            <p className="body1">Uma viagem para os meus trabalhos</p>
            <p className="body2">Aplicação em Nextjs para portfólio</p>

            <a
              target="_blank"
              rel="noreferrer"
              title="Clique para ler nosso novo Ebook"
              onClick={scrollToFooter}
            >
              Viajar
            </a>
          </article>
          <figure className={styles['image-container']}>
            <Image
              src="/views/home/imgs/astronauta2.png"
              width={1000}
              height={800}
              layout="intrinsic"
              alt="Ilustração mulher com óculos de realidade aumentada"
              title="Ilustração mulher com óculos de realidade aumentada"
            />
          </figure>
        </div>
      </div>
    </section>
  );
};
