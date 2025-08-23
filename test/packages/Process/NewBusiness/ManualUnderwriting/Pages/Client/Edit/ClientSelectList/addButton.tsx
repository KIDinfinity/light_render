import React from 'react';
import { Button, Icon } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import styles from '../../index.less';

export default () => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch({
      type: `${NAMESPACE}/addNewClient`,
    });
  };
  const disabled = useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable,
    shallowEqual
  );
  return (
    <Button onClick={handleAdd} className={styles.addButton} disabled={disabled}>
      <Icon type="plus" />
    </Button>
  );
};
