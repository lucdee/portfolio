import styles from './styles.module.scss';

export const NextArrow = props => {
  return (
    <div
      className={`${props.className} ${styles.slickArrow} ${styles.slickNext}`}
      onClick={props.onClick}
    />
  );
};
