import React from 'react';
import { Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

const ButtonOfClaim = ({
  handleClick,
  labelId,
  formatType = 'Label_BIZ_Claim',
  buttonStyle,
  showButton = true,
}: any) => (
  <>
    {showButton ? (
      <div className={styles.buttonWrap}>
        <Button icon="plus" type="primary" onClick={handleClick} style={buttonStyle} block>
          {formatMessageApi({
            [formatType]: labelId,
          })}
        </Button>
      </div>
    ) : (
      ''
    )}
  </>
);

export default ButtonOfClaim;
