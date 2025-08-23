import React from 'react';
import { Icon, Button } from 'antd';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { ReactComponent as backIcon } from 'bpm/assets/back.svg';

import styles from './index.less';

const ButtonList = ({ handleConfirm, handleCancel }: any) => {
  return (
    <div className={styles.buttonGroup}>
      <Button onClick={handleConfirm} key="confirm">
        <span>
          {formatMessageApi({
            Label_BPM_Button: 'venus_claim.button.confirm',
          })}
        </span>
        <Icon type="check-circle" />
      </Button>
      <Button onClick={handleCancel} key="cancel">
        <span>
          {formatMessageApi({
            Label_BIZ_Claim: 'Return',
          })}
        </span>
        <Icon component={backIcon} />
      </Button>
    </div>
  );
};

export default ButtonList;
