import Slider, { Settings } from 'react-slick';

import { NextArrow } from './NextArrow';
import { PrevArrow } from './PrevArrow';

import styles from './styles.module.scss';

export const Carousel: React.FC<Settings> = ({ children, ...rest }) => (
  <section className={styles.carouselContainer}>
    <Slider
      autoplay
      dots
      dotsClass={`slick-dots ${styles.customDots}`}
      infinite
      speed={1000}
      slidesToShow={1}
      rows={1}
      nextArrow={<NextArrow />}
      prevArrow={<PrevArrow />}
      {...rest}
    >
      {children}
    </Slider>
  </section>
);
