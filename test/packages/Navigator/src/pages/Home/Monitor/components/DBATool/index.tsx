import React, { useState } from 'react';
import ExecuteFile from './ExecuteFile';
import ExecutedHistory from './ExecutedHistory';
import { Commonbox } from '../index';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import classNames from 'classnames';

export default function index({ isExpand, setExpand }) {
  const [autoSearch, setAutoSearch] = useState(false);
  return (
    <Commonbox
      click={() => setExpand(!isExpand)}
      className={styles.ov}
      title={formatMessageApi({ Label_COM_MonitorCenter: 'DBA' })}
    >
      <div className={classNames(styles.DBATool, { [styles.expandTool]: isExpand })}>
        <ExecuteFile isExpand={isExpand} setAutoSearch={setAutoSearch} />
        <ExecutedHistory isExpand={isExpand} autoSearch={autoSearch} />
      </div>
    </Commonbox>
  );
}
