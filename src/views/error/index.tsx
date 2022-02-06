import Image from 'next/image';
import Router from 'next/router';

import { Button } from 'components/Form/Button';

import styles from './styles.module.scss';

interface ErrorViewProps {
  error: {
    status?: number;
    message: string;
  };
  description?: string;
}

export const ErrorView: React.FC<ErrorViewProps> = ({
  error: { message, status = 500 },
  description = 'Ocorreu um erro carregar a página',
}) => (
  <div className={styles['error-view-container']}>
    <section>
      <Image
        src="/views/home/imgs/astronaura1.png"
        title=""
        alt=""
        width={180}
        height={80}
      />
      <h1 className="heading1">{status}</h1>
      <p className="text">{description}</p>
      <p className="caption">{message}</p>
      <Button
        title="Clique para voltar"
        background="secondary"
        onClick={() => Router.back()}
      >
        Voltar
      </Button>
    </section>
  </div>
);
