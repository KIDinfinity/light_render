import React from 'react';
import styles from './index.less';
import { Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';

interface IProps {
  display: boolean;
}

export default ({ display }: IProps) => {
  return (
    <>
      {display && (
        <div className={styles.block}>
          <span className={styles.icon}>
            <Icon type="exclamation-circle" />
          </span>
          <span className={styles.message}>
            {formatMessageApi({
              Label_COM_Message: 'ExceptionCase',
            })}
          </span>
        </div>
      )}
    </>
  );
};
