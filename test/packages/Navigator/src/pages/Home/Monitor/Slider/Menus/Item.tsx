import React from 'react';
import styles from './item.less';

interface IProps {
  title: string;
  onClick: () => void;
}
export default ({ title, onClick }: IProps) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {title}
    </button>
  );
};
