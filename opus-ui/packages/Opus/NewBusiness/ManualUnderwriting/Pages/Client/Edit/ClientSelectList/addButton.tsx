import React, { useCallback } from 'react';
import { Button, Icon } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import configs from 'opus/NewBusiness/ManualUnderwriting/Pages/Client/_section';
import styles from '../../index.less';

export default () => {
  const dispatch = useDispatch();

  const handleAdd = useCallback(async () => {
    const errors: any = await dispatch({
      type: `${NAMESPACE}/validateForms`,
      payload: { formKeys: [...configs] },
    });

    if (errors?.length > 0) {
      return;
    }
    dispatch({
      type: `${NAMESPACE}/addNewClient`,
    });
  }, [configs]);
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
