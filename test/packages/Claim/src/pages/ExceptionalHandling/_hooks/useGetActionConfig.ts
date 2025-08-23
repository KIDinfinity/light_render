import { isEmpty, pick } from 'lodash';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import { eOperationType } from '@/enum/eOperationType';
import { EOptionType } from 'basic/enum';
import { assemblePendingDataForSave, assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import TaskDefKey from 'enum/TaskDefKey';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { useMemo } from 'react';

export default () => {
  const retry = useSelector(
    (state: any) => state.exceptionalHandlingController?.claimProcessData?.retry,
    shallowEqual
  );

  const retryList = useSelector(
    (state: any) => state.exceptionalHandlingController.retryList,
    shallowEqual
  );
  return useMemo(() => {
    return {
      submit: {
        validate: {
          progress: async ({ dispatch, taskDetail }: any) => {
            const errors: any = await dispatch({
              type: 'exceptionalHandlingController/validateFields',
            });
            const showMappingModal = await dispatch({
              type: 'exceptionalHandlingController/getShowMappingModal',
            });
            if (
              errors?.length === 0 &&
              !showMappingModal &&
              taskDetail?.taskDefKey === TaskDefKey.BP_IE_ACT001
            ) {
              return requestHandleType.break;
            }
            return errors;
          },
          after: async ({ dispatch }: any) => {
            const showMappingModal = await dispatch({
              type: 'exceptionalHandlingController/getShowMappingModal',
            });
            const taskDetail = await dispatch({
              type: 'exceptionalHandlingController/getTaskDetail',
            });
            if (!showMappingModal && taskDetail?.taskDefKey === TaskDefKey.BP_IE_ACT001) {
              dispatch({
                type: 'exceptionalHandlingController/showMappingModal',
                payload: { showMappingModal: true },
              });
            }
          },
        },
        action: async ({ dispatch, taskDetail }: any) => {
          const claimProcessData = await dispatch({
            type: 'exceptionalHandlingController/getDataForSubmit',
          });

          const submitData: any = {
            ...pick(taskDetail, [
              'caseNo',
              'taskId',
              'caseCategory',
              'businessNo',
              'inquiryBusinessNo',
              'submissionDate',
              'activityKey',
              'assessmentType',
            ]),
            businessData: claimProcessData,
            operationType: eOperationType.submit,
          };

          const dataForSave = await assemblePendingDataForSave({
            optionType: EOptionType.Submit,
            taskDetail,
            dataForSubmit: claimProcessData,
          });
          return {
            1: submitData,
            2: submitData,
            3: dataForSave,
          };
        },
        anyway: ({ dispatch }: any) => {
          dispatch({
            type: 'exceptionalHandlingController/showMappingModal',
            payload: { showMappingModal: false },
          });
        },
      },
      save: {
        timer: 30000,
        action: async ({ dispatch, taskDetail, isAuto }: any) => {
          const dataForSubmit = await dispatch({
            type: 'exceptionalHandlingController/getDataForSubmit',
          });

          const dataForSave = await assembleDefaultDataForSave({
            dataForSubmit,
            taskDetail,
            optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
          });

          return { 1: dataForSave };
        },
      },
      retry: {
        hidden: ({ taskDetail }: any) => {
          return (
            isEmpty(retry) ||
            isEmpty(retryList) ||
            taskDetail?.activityKey !== TaskDefKey.BP_IE_ACT002
          );
        },
        action: async ({ dispatch }: any) => {
          const claimProcessData = await dispatch({
            type: 'exceptionalHandlingController/getDataForSubmit',
          });
          const retryData = {
            caseNo: claimProcessData?.businessInfo?.bizCaseNo,
            taskId: claimProcessData?.businessInfo?.bizTaskId,
            caseCategory: claimProcessData?.businessInfo?.bizCaseCategory,
            activityKey: claimProcessData?.businessInfo?.bizActivity,
            businessNo: claimProcessData?.businessInfo?.businessNo,
            operationType: 'auto',
            retry: !isEmpty(claimProcessData?.retry),
            retryIntegrationCodes: claimProcessData?.retry?.join(','),
          };
          return {
            1: retryData,
            2: requestHandleType.break,
          };
        },
        anyway: async ({ dispatch }: any) => {
          await dispatch({
            type: 'exceptionalHandlingController/getRetryList',
          });
        },
      },
    };
  }, [retry, retryList]);
};
