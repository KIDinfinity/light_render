import React from 'react';
import { Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

function ButtonGroup({ onReset, onSave, disabled }) {
  return (
    <div className={styles.buttonBox}>
      <Button type="primary" onClick={onSave} disabled={disabled}>
        {formatMessageApi({ Label_BIZ_Claim: 'form.save' })}
      </Button>
      <Button onClick={onReset} disabled={disabled}>
        {formatMessageApi({ Label_BIZ_Claim: 'component.tableSearch.reset' })}
      </Button>
    </div>
  );
}

export default ButtonGroup;
