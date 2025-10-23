import React from 'react';

import { Button } from 'opus/Components/Antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

const Main = ({ handleApply, handleClear }: any) => {
  return (
    <div className={styles.buttonWrap}>
      <span
        className={styles.clearWrap}
        onClick={() => {
          handleClear();
        }}
      >
        {formatMessageApi({ Label_BPM_Button: 'Clear' })}
      </span>
      <Button
        className={styles.applyWrap}
        onClick={() => {
          handleApply();
        }}
        type="primary"
      >
        {formatMessageApi({ Label_BPM_Button: 'Apply' })}
      </Button>
    </div>
  );
};

export default Main;
