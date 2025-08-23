import React from 'react';
import { Button } from 'antd';
import { useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import styles from './index.less';

const AddLinkedPolicy = () => {
  const dispatch = useDispatch();
  const setAddLinkedPolicyModalVisible = () => {
    dispatch({
      type: `${NAMESPACE}/setAddLinkedPolicyModalVisible`,
      payload: {
        visible: true,
      },
    });
  };
  return (
    <Button className={styles.element} onClick={setAddLinkedPolicyModalVisible}>
      {formatMessageApi({
        Label_BPM_Button: 'AddLinkedPolicy',
      })}
    </Button>
  );
};

AddLinkedPolicy.displayName = 'addLinkedPolicy';

export default AddLinkedPolicy;
