import { Modal } from 'antd';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'dva';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import { initialVersionRecovery } from '@/services/owbNbProposalControllerService';
import { Action } from '@/components/AuditLog/Enum';

import useLoadProposalFlagCallback from 'process/NB/ManualUnderwriting/_hooks/useLoadProposalFlagCallback';
import { saveSnashot } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import bpm from 'bpm/pages/OWBEntrance';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { handleInitSustaibality } from 'process/NB/ManualUnderwriting/_hooks/useLoadSustaibalitySnapshot';

export default ({ setLoading }: any) => {
  const taskDetail = useSelector(({ processTask }) => processTask.getTask);
  const { caseCategory, caseNo, businessNo, taskId, activityKey } = taskDetail;
  const dispatch = useDispatch();
  const handleLoadFlag = useLoadProposalFlagCallback();
  return useCallback(() => {
    Modal.confirm({
      title: formatMessageApi({
        Label_BIZ_policy: 'initialVersion',
      }),
      content: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000808' }),
      cancelText: 'Cancel',
      okText: 'Confirm',
      onOk() {
        setLoading(true);
        initialVersionRecovery({
          activityKey,
          businessNo,
          caseCategory,
          caseNo,
          taskId,
        }).then(async (res) => {
          if (res?.success) {
            dispatch({
              type: `${NAMESPACE}/saveBizData`,
              payload: {
                businessData: res?.resultData?.businessData,
              },
            });
            await saveSnashot({
              taskDetail,
              dataForSubmit: res?.resultData?.businessData,
              dataType: 'tempBusinessData',
              optionType: EOptionType.Save,
            });
            bpm.buttonAction('save');
            handleInitSustaibality({ taskId, businessNo, dispatch });
            handleLoadFlag();
          }
          setLoading(false);
        });
        dispatch({
          type: 'auditLogController/logButton',
          payload: {
            action: Action.InitialVersionConfirm,
          },
        });
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
  }, [caseCategory, caseNo, businessNo, taskId, activityKey]);
};
