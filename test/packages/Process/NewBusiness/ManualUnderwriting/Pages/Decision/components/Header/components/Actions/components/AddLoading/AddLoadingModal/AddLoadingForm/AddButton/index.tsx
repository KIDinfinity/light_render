import React, { useCallback } from 'react';
import { Button } from 'antd';
import styles from './index.less';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

const AddButton = () => {
  const dispatch = useDispatch();
  const handleAdd = useCallback(() => {
    dispatch({
      type: `${NAMESPACE}/addingLoadingItem`,
    });
  }, [dispatch]);
  return (
    <div className={styles.container}>
      <Button icon="plus" onClick={handleAdd}>
        Loading
      </Button>
    </div>
  );
};

AddButton.displayName = 'addButton';

export default AddButton;
