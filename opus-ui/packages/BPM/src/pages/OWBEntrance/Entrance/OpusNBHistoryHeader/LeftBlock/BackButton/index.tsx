import React from 'react';
import styles from './index.less';
import { ReactComponent as BackIcon } from './back.svg';
import { history } from 'umi';

const BackButton = () => {
  const back = () => {
    history.back();
  };
  return (
    <div className={styles.back} onClick={back}>
      <BackIcon />
    </div>
  );
};

BackButton.displayName = 'backButton';

export default BackButton;
