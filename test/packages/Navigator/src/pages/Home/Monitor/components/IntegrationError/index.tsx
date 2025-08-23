import React, { useState } from 'react';
import ActiveIssue from './ActiveIssue';
import RetryResult from './RetryResult';
import { Commonbox } from '../index';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

export default function index({ isExpand, setExpand, exportExcel }) {
  const [commonBatchNo, setCommonBatchNo] = useState('');
  return (
    <div className={styles.integrationErrorBox}>
      <Commonbox
        title={formatMessageApi({ Label_COM_MonitorCenter: 'IntegrationError' })}
        click={() => setExpand(!isExpand)}
      >
        <ActiveIssue
          setCommonBatchNo={setCommonBatchNo}
          isExpand={isExpand}
          exportExcel={exportExcel}
        />
        <RetryResult
          commonBatchNo={commonBatchNo}
          isExpand={isExpand}
          exportExcel={exportExcel}
        />
      </Commonbox>
    </div>
  );
}
