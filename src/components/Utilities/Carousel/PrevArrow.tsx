import styles from './styles.module.scss';

export const PrevArrow = props => {
  return (
    <div
      className={`${props.className} ${styles.slickArrow} ${styles.slickPrev}`}
      onClick={props.onClick}
    />
  );
};
