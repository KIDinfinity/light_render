import React from 'react';

import emptyIcon from 'opus/Assets/Group.png';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './Table.less';

const Main = () => {
  return (
    <div className={styles.emptyText}>
      <div className={styles.container}>
        <img src={emptyIcon} alt="empty" className={styles.img} />
        <div className={styles.text}>
          {formatMessageApi({ Label_COM_Message:'MSG_001139' })}
        </div>
      </div>
    </div>
  );
};

export default Main;
