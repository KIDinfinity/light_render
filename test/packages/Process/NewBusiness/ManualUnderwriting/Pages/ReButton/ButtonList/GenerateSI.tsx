import React, { useState, useMemo } from 'react';
import { Button, Icon, Tooltip } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { Action } from '@/components/AuditLog/Enum';

import { GenerateSIStatus } from 'process/NewBusiness/ManualUnderwriting/_enum';
import styles from './index.less';

const GenerateSI = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const applicationNo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData?.applicationNo
  );
  const generateSIStatus = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.generateSIStatus
  );
  const newSiRequired = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.newSiRequired
  );

  const handleGenerateSI = async () => {
    dispatch({
      type: 'auditLogController/logTask',
      payload: {
        action: Action.GenerateSI,
      },
    });

    setLoading(true);
    await dispatch({
      type: `${NAMESPACE}/generateSI`,
    });

    await dispatch({
      type: `${NAMESPACE}/loadProposalFlags`,
      payload: {
        applicationNo,
      },
    });

    setLoading(false);
  };
  const message = useMemo(() => {
    switch (generateSIStatus) {
      case GenerateSIStatus.InProgress:
        return formatMessageApi({
          Label_COM_WarningMessage: 'MSG_000681',
        });
      case GenerateSIStatus.Init:
      case GenerateSIStatus.PermiumChanged:
      default:
        return formatMessageApi({
          Label_COM_WarningMessage: 'MSG_000691',
        });
    }
  }, [generateSIStatus]);
  return (
    <Button onClick={handleGenerateSI} disabled={loading} loading={loading}>
      {newSiRequired === 'Y' && (
        <div className={styles.reBtnFlag}>
          <Tooltip overlayClassName={styles.reBtnFlagTooltip} title={message}>
            <Icon type="exclamation-circle" className={styles.icon} theme="filled" />
          </Tooltip>
        </div>
      )}
      {formatMessageApi({
        Label_BPM_Button: 'GenerateSI',
      })}
    </Button>
  );
};

GenerateSI.displayName = 'genderateSI';

export default GenerateSI;
