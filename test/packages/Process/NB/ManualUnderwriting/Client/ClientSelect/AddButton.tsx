import React from 'react';
import { Button, Icon } from 'antd';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import useAddClientDetail from 'process/NB/ManualUnderwriting/_hooks/useAddClientDetail';
import useJudgeAddClientButtonDisabled from 'process/NB/ManualUnderwriting/_hooks/useJudgeAddClientButtonDisabled';
import styles from './index.less';

export default () => {
  const handleAdd = useAddClientDetail();
  const disabled = useJudgeAddClientButtonDisabled();
  const editable = !useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable,
    shallowEqual
  );
  return (
    <Button onClick={handleAdd} className={styles.addButton} disabled={disabled || !editable}>
      <Icon type="plus" />
    </Button>
  );
};
