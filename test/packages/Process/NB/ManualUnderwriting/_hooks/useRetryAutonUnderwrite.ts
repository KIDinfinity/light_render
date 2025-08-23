import { useCallback } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { notification } from 'antd';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Action } from '@/components/AuditLog/Enum';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import useLoadProposalFlagCallback from 'process/NB/ManualUnderwriting/_hooks/useLoadProposalFlagCallback';
import judgeDisplaySustainabiliy from 'process/NB/ManualUnderwriting/utils/judgeDisplaySustainabiliy';
import addUpdateDate from '@/utils/addUpdateDate';
import { saveSnashot } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import useClientAsyncSubmit from 'basic/hooks/useClientAsyncSubmit';
import { getSubmitData } from '@/utils/modelUtils/nbUtils';
import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';

export default ({ setLoading }: any) => {
  const dispatch = useDispatch();
  const handleLoadProposalFlag = useLoadProposalFlagCallback();
  const taskDetail = useSelector(({ processTask }: any) => processTask.getTask, shallowEqual);

  const { taskId } = lodash.pick(taskDetail, ['caseNo', 'businessNo', 'taskId']);

  const handleSubmit = useClientAsyncSubmit({
    requestInterval: 1000,
    requestTimeLimit: 1000 * 60 * 3,
    taskId,
  });
  return useCallback(async () => {
    dispatch({
      type: 'auditLogController/logTask',
      payload: {
        action: Action.ReUnderwrite,
      },
    });
    setLoading(true);
    const dataForSubmit = await dispatch({
      type: `${NAMESPACE}/getDataForSubmit`,
    });
    const data = getSubmitData({
      taskDetail,
      dataForSubmit: dataForSubmit,
      operationType: 'case.auto.underwriting.retry',
    });

    const res: any = await handleSubmit({
      params: data,
    });

    if (res?.success) {
      const response = await dispatch({ type: `${NAMESPACE}/reLoadBizDataSkipSnapshot` });

      const syncSuccessfully = lodash.get(
        response,
        'resultData.businessData.policyList[0].syncSuccessfully'
      );
      if (syncSuccessfully) {
        await addUpdateDate(lodash.get(response, 'resultData.caseNo'));
        notification.success({
          message: formatMessageApi({
            Label_COM_WarningMessage: 'venus_bpm.message.retry.success',
          }),
        });
      }
      if (res?.success) {
        dispatch({ type: 'insured360/getCustomerTypeConfig' });
        dispatch({
          type: `${NAMESPACE}/saveBizData`,
          payload: {
            businessData: lodash.get(res, 'resultData.businessData', {}),
          },
        });
        dispatch({
          type: `${NAMESPACE}/getRiskIndicator`,
          payload: {
            applicationNo: taskDetail?.businessNo,
          },
        });
        handleLoadProposalFlag();
        dispatch({
          type: `envoyController/initEnvoyData`,
        });
      }

      if (res?.success) {
        if (
          judgeDisplaySustainabiliy({ businessData: lodash.get(res, 'resultData.businessData') })
        ) {
          await saveSnashot({
            taskDetail,
            dataForSubmit: lodash.get(res, 'resultData.businessData'),
            dataType: 'tempBusinessData',
            optionType: EOptionType.Save,
          });

          dispatch({
            type: `${NAMESPACE}/setSustainabilityModalBtnVisable`,
            payload: {
              sustainabilityModalBtnVisible: true,
            },
          });

          dispatch({
            type: `${NAMESPACE}/setSustainabilityCaseModalVisible`,
            payload: {
              setSustainabilityCaseModalVisible: true,
            },
          });

          dispatch({
            type: `${NAMESPACE}/setSustainabilityCheckingData`,
            payload: {
              sustainabilityCheckingData: lodash.get(res, 'resultData.businessData'),
            },
          });
        }
      }
    } else {
      handleErrorMessageIgnoreXErrorNotice(res);
    }
    setLoading(false);
  }, [dispatch, handleLoadProposalFlag, setLoading, taskDetail, handleSubmit]);
};
