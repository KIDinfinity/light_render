import React from 'react';
import { Button } from 'antd';
import useHandleAddDPRemarkItem from 'process/NB/ManualUnderwriting/_hooks/useHandleAddDPRemarkItem';
import styles from './index.less';

const AddButton = () => {
  const handleAdd = useHandleAddDPRemarkItem();
  return (
    <div className={styles.container}>
      <Button icon="plus" onClick={handleAdd}>
        Decline/Postpone Remark
      </Button>
    </div>
  );
};

AddButton.displayName = 'addButton';

export default AddButton;
