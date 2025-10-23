import { ReactComponent as StarIcon } from './star.svg';
import { ReactComponent as StarIconFilled } from './starFilled.svg';
import React from 'react';
import styles from '../index.less';

const ReinsuranceButton = ({ highlighted, onToggle }: any) => {
  return (
    <>
      <span className={styles.star} onClick={onToggle}>
        {highlighted ? <StarIconFilled /> : <StarIcon />}
      </span>
    </>
  );
};

export default ReinsuranceButton;
