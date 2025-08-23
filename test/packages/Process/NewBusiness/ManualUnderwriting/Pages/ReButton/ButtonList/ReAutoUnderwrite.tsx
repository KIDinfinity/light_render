import React, { useState } from 'react';
import { Button, Icon, Tooltip } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import { Action } from '@/components/AuditLog/Enum';
import { OptionType } from 'process/NewBusiness/ManualUnderwriting/_enum';

import styles from './index.less';

const ReAutoUnderwrite = () => {
  const dispatch = useDispatch();
  const [reTryLoading, setReTryLoading] = useState(false);
  const syncSuccessfully = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.processData?.planInfoData?.syncSuccessfully,
    shallowEqual
  );

  const handleRetryAutoUnderwriting = async () => {
    setReTryLoading(true);

    await dispatch({
      type: `${NAMESPACE}/getReUw`,
      payload: {
        action: Action.ReUnderwrite,
        type: OptionType.retry,
      },
    });
    setReTryLoading(false);
  };
  return (
    <Button
      className={styles.element}
      disabled={reTryLoading}
      onClick={handleRetryAutoUnderwriting}
      loading={reTryLoading}
    >
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
