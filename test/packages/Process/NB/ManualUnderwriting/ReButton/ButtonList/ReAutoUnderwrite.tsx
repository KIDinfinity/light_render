import React, { useState } from 'react';
import { Button, Icon, Tooltip } from 'antd';
import {  useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useRetryAutonUnderwrite from 'process/NB/ManualUnderwriting/_hooks/useRetryAutonUnderwrite';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import styles from './index.less';

const ReAutoUnderwrite = () => {
  const [reTryLoading, setReTryLoading] = useState(false);
  const syncSuccessfully = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.businessData?.policyList?.[0]?.syncSuccessfully,
    shallowEqual
  );
  const handleRetryAutoUnderwriting = useRetryAutonUnderwrite({
    setLoading: setReTryLoading,
  });
  return (
    <Button className={styles.element} disabled={reTryLoading} onClick={handleRetryAutoUnderwriting} loading={reTryLoading}>
      {!syncSuccessfully && (
        <div className={styles.reBtnFlag}>
          <Tooltip
            overlayClassName={styles.reBtnFlagTooltip}
            title={formatMessageApi({
              Label_COM_WarningMessage: 'MSG_000679',
            })}
          >
            <Icon type="exclamation-circle" className={styles.icon} theme="filled" />
          </Tooltip>
        </div>
      )}
      {formatMessageApi({
        Label_BPM_Button: 'ReAutoUnderwrite',
      })}
    </Button>
  );
};

ReAutoUnderwrite.displayName = 'reAutoUnderwrite';

export default ReAutoUnderwrite;
