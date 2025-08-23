import { useCallback } from 'react';
import { notification } from 'antd';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import Mode from 'process/NB/ManualUnderwriting/Enum/Mode';
import { Action } from '@/components/AuditLog/Enum';
import useGetIsRole from 'process/NB/ManualUnderwriting/_hooks/useGetIsRole';
import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';
import useLoadProposalFlagCallback from 'process/NB/ManualUnderwriting/_hooks/useLoadProposalFlagCallback';
import judgeDisplaySustainabiliy from 'process/NB/ManualUnderwriting/utils/judgeDisplaySustainabiliy';
import addUpdateDate from '@/utils/addUpdateDate';
import { saveSnashot } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import useClientAsyncSubmit from 'basic/hooks/useClientAsyncSubmit';
import { deleteData } from '@/services/dcSnapshotService';
import { getSubmitData } from '@/utils/modelUtils/nbUtils';

export default ({ mode, setLoading }: any) => {
  const dispatch = useDispatch();
  const regionCode = tenant.region();
  const isRole = useGetIsRole();
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData,
    shallowEqual
  );
  const taskDetail = useSelector(({ processTask }: any) => processTask.getTask, shallowEqual);

  const { caseNo, businessNo, taskId } = lodash.pick(taskDetail, [
    'caseNo',
    'businessNo',
    'taskId',
  ]);

  const handleLoadProposalFlag = useLoadProposalFlagCallback();

  const handleSubmit = useClientAsyncSubmit({
    requestInterval: 1000,
    requestTimeLimit: 1000 * 60 * 3,
    taskId,
  });
  return useCallback(async () => {
    const { applicationNo } = lodash.pick(businessData, ['applicationNo']);

    dispatch({
      type: 'auditLogController/logTask',
      payload: {
        action: Action.Recalculate,
      },
    });

    if (regionCode === Region.KH && mode === Mode.Edit && !isRole) {
      const validateProduct = await dispatch({
        type: `${NAMESPACE}/validateProduct`,
      });
      if (!validateProduct) {
        return false;
      }
    }
    setLoading(true);
    const dataForSubmit = await dispatch({
      type: `${NAMESPACE}/getDataForSubmit`,
    });
    const data = getSubmitData({
      taskDetail,
      dataForSubmit,
      operationType:
        mode === Mode.Show ? 'manual.underwrite.recalculate' : 'proposal.change.recalculate',
      taskId,
    });

    const response: any = await handleSubmit({
      params: data,
    });

    if (
      lodash.isPlainObject(response) &&
      response.success &&
      !lodash.isEmpty(response.resultData)
    ) {
      await deleteData({
        businessNo,
        dataType: 'mainPage',
        taskId,
      });
      await dispatch({
        type: `${NAMESPACE}/saveCoverageListData`,
        payload: {
          businessData: response?.resultData?.businessData,
        },
      });
      const possibleSusOptNames = lodash.get(
        response,
        'resultData.businessData.possibleSusOptNames'
      );
      if (lodash.isArray(possibleSusOptNames)) {
        dispatch({
          type: `${NAMESPACE}/savePossibleSusOptNames`,
          possibleSusOptNames,
        });
      }
      lodash
        .chain(response)
        .get('resultData.businessData.policyList[0].clientInfoList', [])
        .forEach((clientInfoItem: any) => {
          {
            dispatch({
              type: `${NAMESPACE}/changeBasicInfoFields`,
              payload: {
                changedFields: {
                  customerAge: clientInfoItem?.customerAge,
                },
                id: clientInfoItem?.id,
              },
            });
          }
        })
        .value();
    }
    const { success, resultData }: any = lodash.pick(response, ['success', 'resultData']);

    if (success) {
      await addUpdateDate({ caseNo });

      handleLoadProposalFlag();
      dispatch({
        type: `${NAMESPACE}/saveBizData`,
        payload: {
          businessData: lodash.get(resultData, 'businessData', {}),
        },
      });
      const dataResponse: any = await dispatch({
        type: `${NAMESPACE}/getNBHistoryData`,
        payload: {
          businessNo: applicationNo,
          inquiryBusinessNo: applicationNo,
          caseCategory: businessData?.caseCategory,
        },
      });
      dispatch({
        type: `${NAMESPACE}/saveAgeChange`,
        payload: {
          ageChange: false,
        },
      });
      if (
        lodash.isPlainObject(dataResponse) &&
        dataResponse.success &&
        !lodash.isEmpty(dataResponse.resultData)
      ) {
        await dispatch({
          type: `${NAMESPACE}/updateInitalBusinessData`,
        });
        handleLoadProposalFlag();
        notification.success({
          message: 'recalculate success',
        });
      } else {
        notification.error({
          message: 'recalculate failed',
        });
      }
    }
    if (
      success &&
      judgeDisplaySustainabiliy({
        businessData: lodash.get(resultData, 'businessData'),
      }) &&
      mode === Mode.Show
    ) {
      await saveSnashot({
        taskDetail,
        dataForSubmit: lodash.get(resultData, 'businessData'),
        dataType: 'tempBusinessData',
        optionType: EOptionType.Save,
      });

      dispatch({
        type: `${NAMESPACE}/setSustainabilityCaseModalVisible`,
        payload: {
          setSustainabilityCaseModalVisible: true,
        },
      });

      dispatch({
        type: `${NAMESPACE}/setSustainabilityModalBtnVisable`,
        payload: {
          sustainabilityModalBtnVisible: true,
        },
      });

      dispatch({
        type: `${NAMESPACE}/setSustainabilityCheckingData`,
        payload: {
          sustainabilityCheckingData: lodash.get(resultData, 'businessData'),
        },
      });
    }
    if (!success) {
      handleErrorMessageIgnoreXErrorNotice(response);
    }

    setLoading(false);
    return true;
  }, [
    businessData,
    dispatch,
    regionCode,
    mode,
    isRole,
    setLoading,
    caseNo,
    handleLoadProposalFlag,
    taskDetail,
    businessNo,
    handleSubmit,
    taskId,
  ]);
};
