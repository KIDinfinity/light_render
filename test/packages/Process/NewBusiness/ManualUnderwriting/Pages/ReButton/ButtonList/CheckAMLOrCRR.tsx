import React, { useState } from 'react';
import { Button, Icon, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { OptionType } from 'process/NewBusiness/ManualUnderwriting/_enum';
import styles from './index.less';
import { Action } from '@/components/AuditLog/Enum';

const CheckAMLOrCRR = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const shouldCheckAMLOrCRRHighlight = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.shouldCheckAMLOrCRRHighlight,
    shallowEqual
  );

  const handleCheckAMLOrCRR = async () => {
    dispatch({
      type: 'auditLogController/logTask',
      payload: {
        action: Action.CheckAMLOrCRR,
      },
    });
    setLoading(true);
    await dispatch({
      type: `${NAMESPACE}/checkAMLOrCRR`,
      payload: {
        type: OptionType.checkAMLOrCRR,
      },
    });
    setLoading(false);
  };
  return (
    <Button onClick={handleCheckAMLOrCRR} disabled={loading} loading={loading}>
      {shouldCheckAMLOrCRRHighlight && (
        <div className={styles.reBtnFlag}>
          <Tooltip
            overlayClassName={styles.reBtnFlagTooltip}
            title={formatMessageApi({ Label_COM_WarningMessage: 'MSG_000818' })}
          >
            <Icon type="exclamation-circle" className={styles.icon} theme="filled" />
          </Tooltip>
        </div>
      )}
      {formatMessageApi({
        Label_BPM_Button: 'CheckAMLOrCRR',
      })}
    </Button>
  );
};

CheckAMLOrCRR.displayName = 'checkAMLOrCRR';

export default CheckAMLOrCRR;
