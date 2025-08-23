import React, { useState } from 'react';
import styles from './index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Button } from 'antd';
import { retry } from '@/services/integrationChecklistService';
import { useDispatch } from 'dva';

interface IProps {}

export default ({ taskDetail }: IProps) => {
  const { processInstanceId, businessNo, caseCategory } = taskDetail || {};
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    const response = await retry({
      caseNo: processInstanceId,
    });
    dispatch({
      type: 'integration/getIntegrationChecklist',
      payload: {
        businessNo: businessNo,
        caseNo: processInstanceId,
        caseCategory: caseCategory,
      },
    });
    setLoading(false);
  };
  return (
    <div className={styles.wrap}>
      <Button
        className={styles.retry}
        icon="redo"
        loading={loading}
        onClick={() => {
          handleClick();
        }}
      >
        {formatMessageApi({ Label_BPM_Button: 'Retry' })}
      </Button>
    </div>
  );
};
