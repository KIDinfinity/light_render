import React from 'react';
import styles from './index.less';

const Card = ({ title, right, txt, bottom }: any) => {
  return (
    <div className={styles.CardWrapper}>
      <div className={styles.head}>
        <div className={styles.title}>{title}</div>
        <div className={styles.right}>{right}</div>
      </div>

      <div className={styles.Comment}>{txt}</div>
      <div className={styles.bottom}>{bottom}</div>
    </div>
  );
};

export default Card;
