import { cloneElement, useEffect, useState } from 'react';

import { ListOptions } from './ListOptions';

import styles from './styles.module.scss';

type ClickableListProps = {
  labels: string[];
  children: JSX.Element[];
};

export const ClickableList: React.FC<ClickableListProps> = ({
  children,
  labels,
}) => {
  const [activeItem, setActiveItem] = useState(labels[0]);
  const [applyAnimation, setApplyAnimation] = useState(false);

  useEffect(() => {
    setApplyAnimation(true);

    const interval = setInterval(() => {
      setApplyAnimation(false);
    }, 500);

    return () => clearInterval(interval);
  }, [activeItem]);

  return (
    <div className={styles.clickableListContainer}>
      <ListOptions
        labels={labels}
        activeItem={activeItem}
        onItemClick={label => setActiveItem(label)}
      />

      <div
        className={`${styles.listContent} ${
          !!applyAnimation ? styles.animate : ''
        }`}
      >
        {cloneElement(
          children[labels.findIndex(value => value === activeItem)],
        )}
      </div>
    </div>
  );
};
