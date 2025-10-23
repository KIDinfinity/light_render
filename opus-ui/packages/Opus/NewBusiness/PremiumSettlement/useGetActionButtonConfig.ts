import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getSubmitData } from '@/utils/modelUtils/nbUtils';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import handleMessageModal from '@/utils/commonMessage';
import { taskGoBack } from '@/utils/task';
import { NAMESPACE } from './activity.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { useMemo } from 'react';
import { requestHandleType } from 'bpm/enum';
import { Modal } from 'antd';
import { serialize as objectToFormData } from 'object-to-formdata';
import bpm from 'bpm/pages/OWBEntrance';
import useBeforeRefreshPremium from 'packages/Opus/NewBusiness/PremiumSettlement/_hooks/useBeforeRefreshPremium';
import useAfterRefreshPremium from './_hooks/useAfterRefreshPremium';
import PremiumType from './Enum/premiumType';

const holdInformationPromise = (dispatch: any, category: string, taskDetail: any) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: `newBusinessManualUnderwriting/setInformationModalShow`,
      payload: {
        category,
        taskDetail,
        resolve: resolve,
        reject: reject,
      },
    });
  });
};

const holdPremiumTransferPromise = (dispatch: any, taskDetail: any) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: `newBusinessManualUnderwriting/setPremiumTransferModalData`,
      payload: {
        show: true,
        taskDetail,
        resolve: resolve,
        reject: reject,
      },
    });
  });
};

export default () => {
  const premiumType = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace.businessData?.premiumType,
    shallowEqual
  );

  const beforeRefresh = useBeforeRefreshPremium();
  const afterRefresh = useAfterRefreshPremium();

  const dispatch = useDispatch();
  return useMemo(() => {
    return {
      pend: {
        hidden: ({ taskDetail }: any) => {
          const hiddenFlag = taskDetail?.withdraw || taskDetail?.notWait;
          return hiddenFlag;
        },
        after: () => {
          bpm.reload();
        },
      },
      submit: {
        validate: async ({}: any) => {
          const bankInfoValidated = await dispatch({
            type: `${NAMESPACE}/validateBankInfo`,
          });
          if (!bankInfoValidated) {
            handleMessageModal([
              {
                content: formatMessageApi({ Label_COM_Message: 'MSG_001225' }),
              },
            ]);

            return requestHandleType.break;
          }
          const errors = await dispatch({
            type: `${NAMESPACE}/validateFields`,
          });

          return errors;
        },
        action: async ({ taskDetail }: any) => {
          const dataForSubmit = await dispatch({
            type: `${NAMESPACE}/getDataForSubmit`,
          });
          return {
            1: dataForSubmit,
            2: getSubmitData({
              taskDetail,
              dataForSubmit,
            }),
          };
        },
      },
      withdraw: {
        validate: async ({ taskDetail, dispatch }: any) => {
          try {
            const errors = await dispatch({
              type: `${NAMESPACE}/validateFields`,
            });

            if (errors.length) {
              return errors;
            }

            await holdInformationPromise(dispatch, 'withdrawReason', taskDetail);
          } catch (err) {
            return requestHandleType.break;
          }
        },
        hidden: ({ taskDetail }: any) => {
          const withdrawFlag = formUtils.queryValue(taskDetail?.withdraw) || taskDetail?.notWait;
          return withdrawFlag;
        },
        action: async () => {
          const dataForSubmit = await dispatch({
            type: `${NAMESPACE}/getDataForSubmit`,
          });
          return {
            1: dataForSubmit,
          };
        },
        after: async ({ taskDetail, responseCollect }: any) => {
          const prevTaskId = lodash.get(taskDetail, 'taskId');
          const nextTaskId = lodash.get(responseCollect, '1.resultData.taskId');
          const businessData = lodash.get(responseCollect, '1.resultData.businessData');

          dispatch({
            type: `${NAMESPACE}/setInformationModalShow`,
            payload: {
              cancel: true,
            },
          });

          Modal.success({
            centered: true,
            title: formatMessageApi({ Label_COM_General: 'success' }),
            content: 'You have successfully withdrawn this case.',
            okText: formatMessageApi({ Label_BPM_Button: 'Close' }),
            onOk: () => {
              if (prevTaskId === nextTaskId) {
                dispatch({
                  type: `${NAMESPACE}/saveBizData`,
                  payload: {
                    businessData,
                  },
                });
              } else {
                taskGoBack();
              }
            },
          });
        },
      },
      save: {
        timer: 30000,
        hidden: ({ taskDetail }: any) => {
          const hiddenFlag = taskDetail?.withdraw || taskDetail?.notWait;
          return hiddenFlag;
        },
        action: async ({ taskDetail, isAuto }: any) => {
          const dataForSubmit = await dispatch({
            type: `${NAMESPACE}/getDataForSave`,
          });
          const dataForSave = await assembleDefaultDataForSave({
            taskDetail,
            optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
            dataForSubmit,
            dispatch,
          });

          return {
            1: dataForSave,
          };
        },
      },
      ews: {
        isShowNotice: false,
        action: ({ taskDetail }: any) => {
          const { businessNo, processInstanceId } = lodash.pick(taskDetail, [
            'businessNo',
            'processInstanceId',
          ]);
          if (businessNo && processInstanceId) {
            window.open(`/nb/uw/ews/${businessNo}/${processInstanceId}`, '_blank');
          }
        },
      },
      reject: {
        validate: async ({ taskDetail, dispatch }) => {
          try {
            await holdInformationPromise(dispatch, 'Reject', taskDetail);
          } catch (err) {
            return requestHandleType.break;
          }
        },
        action: async () => {
          const dataForSubmit = await dispatch({
            type: `${NAMESPACE}/getDataForSubmit`,
          });
          return {
            1: dataForSubmit,
          };
        },
        after: async ({ dispatch }) => {
          Modal.success({
            centered: true,
            title: formatMessageApi({ Label_COM_General: 'success' }),
            content: formatMessageApi({ Label_COM_Message: 'MSG_000972' }),
            okText: formatMessageApi({ Label_BPM_Button: 'Close' }),
            onOk: taskGoBack,
          });
        },
      },
      Refresh: {
        hidden: () => premiumType !== PremiumType.PremiumCollection,
        action: async ({ taskDetail }) => {
          const refreshParams = lodash.pick(taskDetail, ['caseNo', 'businessNo']);

          beforeRefresh();

          return {
            10: objectToFormData(refreshParams),
          };
        },
        after: async ({ responseCollect }: any) => {
          const { resultData, success } = lodash.get(responseCollect, '1');

          if (success) {
            afterRefresh(resultData);
          }
        },
      },
      // payment transfer
      premiumTransfer: {
        disabled: () => true,
        validate: async ({ taskDetail, dispatch }: any) => {
          try {
            await holdPremiumTransferPromise(dispatch, taskDetail);
          } catch (err) {
            return requestHandleType.break;
          }
        },
      },
    };
  }, [dispatch, beforeRefresh, premiumType]);
};
