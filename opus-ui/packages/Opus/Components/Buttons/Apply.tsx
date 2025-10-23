import React from 'react';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { Button } from 'opus/Components/Antd';

import styles from './index.less';

const Main = ({ handleApply, loading = false }: any) => {
  return (
    <div className={styles.button}>
      <Button
        loading={loading}
        type="primary"
        onClick={(e) => {
          handleApply(e);
        }}
      >
        {formatMessageApi({ Label_BPM_Button: 'Apply' })}
      </Button>
    </div>
  );
};

export default Main;
