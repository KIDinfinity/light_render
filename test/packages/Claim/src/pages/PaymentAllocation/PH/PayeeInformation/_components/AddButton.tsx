import React from 'react';
import { Button, Icon } from 'antd';
import { useSelector, useDispatch } from 'dva';
import styles from '../index.less';

export default () => {
  const dispatch = useDispatch();

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const handleAdd = () => {
    dispatch({
      type: 'paymentAllocation/payeeItemAdd',
    });
  };
  return (
    <Button onClick={handleAdd} className={styles.addButton} disabled={!editable}>
      <Icon type="plus" />
    </Button>
  );
};
