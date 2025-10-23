import React from 'react';
import { Button, Icon } from 'antd';
import { useSelector, useDispatch } from 'dva';
import styles from '../index.less';

export default ({ NAMESPACE }: any) => {
  const dispatch = useDispatch();

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const handleAdd = () => {
    dispatch({
      type: `${NAMESPACE}/paymentPayeeItemAdd`,
    });
  };
  return (
    <Button onClick={handleAdd} className={styles.addButton} disabled={!editable}>
      <Icon type="plus" />
    </Button>
  );
};
