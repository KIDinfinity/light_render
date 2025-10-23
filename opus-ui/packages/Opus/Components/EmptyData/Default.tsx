import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import emptyIcon from 'opus/Assets/icon-empty.png';
import emptyBlackIcon from 'opus/Assets/icon-empty_black.png';

import styles from './Default.less';

const Main = ({ type }: any) => {
  return (
    <div className={styles.emptyText}>
      <div className={styles.container}>
        <img
          src={type === 'black' ? emptyBlackIcon : emptyIcon}
          alt="empty"
          className={styles.img}
        />
        <div className={styles.text}>
          {type === 'black' ? formatMessageApi({Label_COM_Message:'MSG_001139'}) : formatMessageApi({Label_COM_Message:'MSG_001139'})}{' '}
        </div>
      </div>
    </div>
  );
};

export default Main;
