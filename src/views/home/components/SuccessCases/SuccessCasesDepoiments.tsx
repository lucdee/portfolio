import Image from 'next/image';

import { ClickableList } from 'components/Utilities/ClickableList';

import styles from './styles.module.scss';

export const SuccessCasesDepoiments: React.FC = () => {
  return (
    <ClickableList labels={['Objetivos', 'Focos', 'Conhecimentos']}>
      <div data-aos="fade-up" className={styles['depoiment-card']}>
        <div className={styles['depoiment-card-content']}>
          <p className="body6">
            <b>
              Oportunidade em desenvolvimento Front end, onde eu possa colocar
              minhas habilidades em prática e colaborar com equipes de trabalho,
              crescimento da empresa e meu próprio crescimento pessoal e
              profissional.
            </b>
          </p>
        </div>
      </div>

      <div className={styles['depoiment-card']}>
        <div className={styles['depoiment-card-content']}>
          <p className="caption">
            <b>
              Estou atualmente focado em me desenvolver em Front end, utilizando
              NextJs(Reactjs), estilização em Sass, consumir Apis em GraphQl e
              Rest, porém também estou aberto em aprender com qualquer outra
              biblioteca em javascript.
            </b>
          </p>
        </div>
      </div>

      <div className={styles['depoiment-card']}>
        <div className={styles['depoiment-card-content']}>
          <p className="caption">
            <b>
              Possuo conhecimento em Front end com ReactJs/NextJs, Angular,
              VueJs, implementaçao e criaçao de Apis Rest e GraphQl,
              versionamento de código com Git e GitHub, além de conhecimentos no
              Back end em mysql e java com spring boot.
            </b>{' '}
          </p>
        </div>
      </div>
    </ClickableList>
  );
};
