import { ReactComponent as DiamondIcon } from './diamond.svg';
import { ReactComponent as DiamondIconFilled } from './diamondFilled.svg';
import React from 'react';
import styles from '../index.less';

const CustomerButton = ({ highlighted, onToggle }: any) => {
  return (
    <>
      <span className={styles.diamond} onClick={onToggle}>
        {highlighted ? <DiamondIconFilled /> : <DiamondIcon />}
      </span>
    </>
  );
};

export default CustomerButton;
