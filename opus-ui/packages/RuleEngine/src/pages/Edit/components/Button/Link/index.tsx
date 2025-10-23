import React from 'react';
import { Button, Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

function ButtonGroup({ onUnBind }: any) {
  return (
    <div className={styles.buttonBox}>
      <Button onClick={onUnBind}>
        <span>
          {formatMessageApi({
            Label_BIZ_Claim: 'venus_claim.ruleEngine.label.unbind',
          })}{' '}
        </span>
        <Icon type="link" />
      </Button>
    </div>
  );
}

export default ButtonGroup;
