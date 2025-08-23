import React, { useCallback } from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';
import styles from '../index.less';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default ({ item }: any) => {
  const dispatch = useDispatch();
  const handleAddClient = useCallback(() => {
    dispatch({
      type: `${NAMESPACE}/addClient`,
      payload: {
        coverageId: item?.id,
      },
    });
  }, [dispatch, item?.id]);

  return (
    <div className={classnames(styles.icon, styles.clientName)} onClick={() => handleAddClient()}>
      <Icon type="plus" />
    </div>
  );
};
