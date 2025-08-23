import { useCallback } from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';

import { Action } from '@/components/AuditLog/Enum';
import useGetNamespace from 'basic/components/NamespaceProvider/hooks/useGetNamespace';
import { handleWarnMessageModal } from '@/utils/commonMessage';
import useRefreshChequeInfoCallback from 'process/NB/Share/hooks/useRefreshChequeInfoCallback';
import useGetChequeEditStatus from 'process/NB/Share/hooks/useGetChequeEditStatus';
import ChequeEditStatus from 'process/NB/Enum/ChequeEditStatus';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default () => {
  const NAMESPACE = useGetNamespace();
  const dispatch = useDispatch();
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData,
    shallowEqual
  );
  const chequeEditStatus = useGetChequeEditStatus();
  const handleRefresh = useRefreshChequeInfoCallback();
  return useCallback(() => {
    dispatch({
      type: 'auditLogController/logButton',
      payload: {
        action: Action.Refresh,
      },
    });
    if (chequeEditStatus === ChequeEditStatus.Editing) {
      handleWarnMessageModal(
        [
          {
            content: formatMessageApi({
              Label_COM_WarningMessage: 'MSG_000757',
            }),
          },
        ],
        {
          okFn: () => {
            handleRefresh({ businessData, forceRefresh: true });
          },
        }
      );
    } else {
      handleRefresh({ businessData });
    }
  }, [handleRefresh, businessData, chequeEditStatus]);
};
