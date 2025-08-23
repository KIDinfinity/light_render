import React, { useState } from 'react';
import { Button, Icon, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import { Action } from '@/components/AuditLog/Enum';
import { OptionType } from 'process/NewBusiness/ManualUnderwriting/_enum';

import styles from './index.less';
import usePublishEnvoyRefresh from '@mc/hooks/usePublishEnvoyRefresh';

const GetUWMeResult = () => {
  const dispatch = useDispatch();
  const [reTryLoading, setReTryLoading] = useState(false);
  const failCloseEnquiry = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.processData?.failCloseEnquiry,
    shallowEqual
  );
  const displayUwmeButton = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.processData?.displayUwmeButton,
    shallowEqual
  );
  usePublishEnvoyRefresh();
  const handleRetryAutoUnderwriting = async () => {
    setReTryLoading(true);

    await dispatch({
      type: `${NAMESPACE}/getUWResult`,
      payload: {
        action: Action.GetUWMeResult,
        type: OptionType.getUWMEResult,
      },
    });
    setReTryLoading(false);
  };
  if (displayUwmeButton !== 'Y') return null;
  return (
    <Button
      className={styles.element}
      disabled={reTryLoading}
      onClick={handleRetryAutoUnderwriting}
      loading={reTryLoading}
    >
      {failCloseEnquiry === 'Y' && (
        <div className={styles.reBtnFlag}>
          <Tooltip
            overlayClassName={styles.reBtnFlagTooltip}
            title={formatMessageApi({
              Label_COM_WarningMessage: 'MSG_000689',
            })}
          >
            <Icon type="exclamation-circle" className={styles.icon} theme="filled" />
          </Tooltip>
        </div>
      )}
      {formatMessageApi({
        Label_BPM_Button: 'GetUWMeResult',
      })}
    </Button>
  );
};

GetUWMeResult.displayName = 'getUWMeResult';

export default GetUWMeResult;
