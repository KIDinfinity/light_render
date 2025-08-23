import React from 'react';
import { Icon } from 'antd';
import { useDispatch, useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as Remove } from 'navigator/assets/all-remove.svg';
import { ReactComponent as Read } from 'navigator/assets/all-read.svg';
import styles from './BatchBtn.less';

export default () => {
  const dispatch = useDispatch();

  const removeAllLoading = useSelector(
    (state: any) => state.loading.effects['smartCircleNotification/removeAll']
  );
  const removeAll = async () => {
    await dispatch({
      type: 'smartCircleNotification/removeAll',
    });
  };

  const readAllLoading = useSelector(
    (state: any) => state.loading.effects['smartCircleNotification/readAll']
  );
  const readAll = async () => {
    await dispatch({
      type: 'smartCircleNotification/readAll',
    });
  };

  return (
    <div className={styles.box}>
      {removeAllLoading ? (
        <Icon type="loading" className={styles.remove} />
      ) : (
        <Icon
          component={Remove}
          className={styles.remove}
          title={formatMessageApi({ Label_Sider_SmartCircle: 'BatchRemove' })}
          onClick={removeAll}
        />
      )}
      {readAllLoading ? (
        <Icon type="loading" className={styles.read} />
      ) : (
        <Icon
          component={Read}
          className={styles.read}
          title={formatMessageApi({ Label_Sider_SmartCircle: 'MarkAsRead' })}
          onClick={readAll}
        />
      )}
    </div>
  );
};
