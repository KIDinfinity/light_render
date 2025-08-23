import React, { useCallback } from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';
import styles from '../index.less';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default ({ coverage, insured }) => {
  const dispatch = useDispatch();
  const handleRemove = useCallback(() => {
    dispatch({
      type: `${NAMESPACE}/deleteClient`,
      payload: {
        insuredId: insured?.id,
        coverageId: coverage?.id,
      },
    });
  }, [dispatch, insured?.id, coverage?.id]);

  return (
    <div className={classnames(styles.icon, styles.clientName)} onClick={handleRemove}>
      <Icon type="close" />
    </div>
  );
};
