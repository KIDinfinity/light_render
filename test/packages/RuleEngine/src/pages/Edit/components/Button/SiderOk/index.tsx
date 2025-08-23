import React from 'react';
import { Button, Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

function ButtonGroup({ onOk, onCancel, loading = false }) {
  return (
    <div className={styles.buttonBox}>
      <Button onClick={onOk} disabled={loading}>
        <span>{formatMessageApi({ Label_BIZ_Claim: 'form.confirm' })}</span>
        {loading ? <Icon type="loading" /> : <Icon type="check-circle" />}
      </Button>
      <Button onClick={onCancel}>
        <span>{formatMessageApi({ Label_BIZ_Claim: 'form.cancel' })}</span>
        <Icon type="close" />
      </Button>
    </div>
  );
}

export default ButtonGroup;
