import React from 'react';
import { Button } from 'antd';
import useHandleAddAddingLoadingItem from 'process/NB/ManualUnderwriting/_hooks/useHandleAddAddingLoadingItem';
import styles from './index.less';

const AddButton = () => {
  const handleAdd = useHandleAddAddingLoadingItem();
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
