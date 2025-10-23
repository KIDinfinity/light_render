import React from 'react';
import styles from './index.less';
import { ReactComponent as BackIcon } from './back.svg';
import { taskGoBack } from '@/utils/task';

const BackButton = () => {
  const back = () => {
    taskGoBack();
  };
  return (
    <div className={styles.back} onClick={back}>
      <BackIcon />
    </div>
  );
};

BackButton.displayName = 'backButton';

export default BackButton;
