import Link from 'next/link';
import Image from 'next/image';

import { socialMediaItems } from './utils/socialMediaItems';

import { FormNewsLetter } from './FormNewsLetter';
import { FooterMenuNavColumn } from './FooterMenuNavColumn';

import styles from './styles.module.scss';

export const Footer: React.FC = () => (
  <>
    <section id="footer-section" className={styles['footer-section']}>
      <div className="centralized-container">
        <div className={styles['footer-section-content']}>
          <div className={styles['footer-layout-container']}>
            <section className={styles['contact-address']}>
              <h2 data-aos="fade-right">Lt</h2>
            </section>
          </div>
        </div>
      </div>
    </section>
  </>
);
