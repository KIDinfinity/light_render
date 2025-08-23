import lodash from 'lodash';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import { NAMESPACE } from './activity.config';
import configs from './SuspectClients/ClientOptionSelection/config';

export default {
  submit: {
    validate: async ({ dispatch }: any) => {
      const errors = await dispatch({
        type: `${NAMESPACE}/validateFields`,
        payload: {
          formKeys: [...configs],
        },
      });
      const authorisedSignatoryValidate = await dispatch({
        type: `${NAMESPACE}/authorisedSignatoryValidate`,
      });
      if (authorisedSignatoryValidate) {
        return requestHandleType.break;
      }
      return errors;
    },
    action: async ({ dispatch }: any) => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
        payload: {
          operationType: 'submit',
        },
      });
      return { 1: dataForSubmit, 2: dataForSubmit };
    },
    anyway: ({ dispatch, responseCollect, taskDetail }: any) => {
      const { businessNo } = taskDetail;
      dispatch({
        type: `${NAMESPACE}/handleUpdateClientInfo`,
        payload: { businessNo, submitResponse: lodash.get(responseCollect, '2') },
      });
      dispatch({
        type: 'formCommonController/handleUnSubmited',
      });
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }: any) => {
      const { inquiryBusinessNo } = lodash.pick(taskDetail, ['inquiryBusinessNo']);
      const dataSave = await dispatch({
        type: `${NAMESPACE}/getDataForSave`,
      });
      const dataForSave = dataSave
        ? await assembleDefaultDataForSave({
            taskDetail,
            optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
            dataForSubmit: dataSave,
            dispatch,
          })
        : false;
      if (!inquiryBusinessNo) {
        return { 1: dataForSave, 2: requestHandleType.break };
      }
      return { 1: dataForSave };
    },
  },
  image: {},
  dedupCheck: {
    action: async ({ dispatch }: any) => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
        payload: {
          operationType: 'retry',
        },
      });
      return { 1: dataForSubmit };
    },
    anyway: async ({ dispatch, responseCollect, taskDetail }: any) => {
      const { businessNo } = taskDetail;
      const success = lodash.get(responseCollect, '1.success');
      const clientInfoList = lodash.get(
        responseCollect,
        '1.resultData.businessData.policyList[0].clientInfoList'
      );
      if (success) {
        await dispatch({
          type: `${NAMESPACE}/saveRetryData`,
          payload: {
            clientInfoList,
          },
        });

        const dataSave = await dispatch({
          type: `${NAMESPACE}/getDataForSave`,
        });
        const dataForSave = await assembleDefaultDataForSave({
          taskDetail,
          optionType: EOptionType.Save,
          dataForSubmit: dataSave || {},
          dispatch,
        });
        if (dataForSave !== requestHandleType.break) {
          dispatch({
            type: 'claimCaseController/saveSnapshot',
            payload: {
              postData: dataForSave,
            },
          });
        }
      } else {
        dispatch({
          type: `${NAMESPACE}/getCustomerIdentificationData`,
          payload: { businessNo },
        });
      }
    },
  },
};
