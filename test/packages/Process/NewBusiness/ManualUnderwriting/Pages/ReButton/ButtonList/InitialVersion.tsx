import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useDispatch } from 'dva';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Action } from '@/components/AuditLog/Enum';
import AuthorizedAtom from '@/auth/Components/Authorized/AuthorizedAtom';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import ReButtonType from 'process/NewBusiness/ManualUnderwriting/_enum/ReButtonType';

import styles from './index.less';

const InitialVersion = () => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);

  const handleInitialVersion = () => {
    Modal.confirm({
      title: formatMessageApi({
        Label_BIZ_policy: 'initialVersion',
      }),
      content: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000808' }),
      cancelText: 'Cancel',
      okText: 'Confirm',
      onOk() {
        setLoading(true);

        dispatch({
          type: `${NAMESPACE}/getInitialVersionRecovery`,
          payload: {
            type: ReButtonType.I,
          },
        });
        dispatch({
          type: 'auditLogController/logButton',
          payload: {
            action: Action.InitialVersionConfirm,
          },
        });
        setLoading(false);
      },
      onCancel() {
        dispatch({
          type: 'auditLogController/logButton',
          payload: {
            action: Action.InitialVersionCancel,
          },
        });
      },
    });
  };

  return (
    <AuthorizedAtom
      currentAuthority="RS_NB_Button_ManualUW_InitialVersion"
      key="RS_NB_Button_ManualUW_InitialVersion"
    >
      <Button
        className={styles.element}
        disabled={isLoading}
        onClick={handleInitialVersion}
        loading={isLoading}
      >
        {formatMessageApi({
          Label_BPM_Button: 'initialVersion',
        })}
      </Button>
    </AuthorizedAtom>
  );
};

InitialVersion.displayName = 'initialVersion';

export default InitialVersion;
