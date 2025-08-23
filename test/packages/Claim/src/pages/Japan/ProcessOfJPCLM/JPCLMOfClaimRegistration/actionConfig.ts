import lodash from 'lodash';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { formUtils } from 'basic/components/Form';
import { EOptionType } from 'basic/enum/EOptionType';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { eOperationType } from '@/enum/eOperationType';

export default {
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }) => {
      const dataForSubmit = await dispatch({
        type: 'JPCLMOfClaimRegistrationController/prepareClaimData',
      });

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        dataForSubmit,
      });
      return {
        1: dataForSave,
      };
    },
  },
  // 发送请求送付书
  sendAppForm: {
    hidden: ({ claimStates }) => {
      const parentClaimNo = formUtils.queryValue(claimStates?.parentClaimNo);
      return !parentClaimNo;
    },
    validate: async ({ dispatch }) => {
      await dispatch({
        type: 'formCommonController/handleSubmited',
      });
      const claimErrors = await dispatch({
        type: 'JPCLMOfClaimRegistrationController/validateFields',
      });
      const claimNoErrors = await dispatch({
        type: 'menuCreateCaseClaim/validate',
      });
      const errors = lodash.merge(claimErrors, claimNoErrors);
      return errors;
    },
    action: async ({ dispatch, taskDetail, allveriables }) => {
      const claimData = await dispatch({
        type: 'JPCLMOfClaimRegistrationController/prepareClaimData',
      });
      const autoPendData = await dispatch({
        type: 'JPCLMOfClaimRegistrationController/handleAutoPendData',
      });
      return {
        1: claimData,
        2: claimData,
        3: getSubmitData({ taskDetail, dataForSubmit: autoPendData, variables: allveriables[2] }),
      };
    },
    after: async ({ dispatch }) => {
      await dispatch({
        type: 'envoyController/getEnvoyInfo',
      });
      dispatch({
        type: 'envoyController/getReasonConfigs',
      });
    },
  },
  // 非该当提出
  nonApplicableSubmit: {
    hidden: ({ claimStates }) => {
      const parentClaimNo = formUtils.queryValue(claimStates?.parentClaimNo);
      return !!parentClaimNo;
    },
    validate: async ({ dispatch }) => {
      const errors = await dispatch({
        type: 'menuCreateCaseClaim/validate',
      });
      return errors;
    },
    action: async ({ dispatch, taskDetail, allveriables }) => {
      const autoPendData = await dispatch({
        type: 'JPCLMOfClaimRegistrationController/handleAutoPendData',
      });
      return {
        1: {
          ...getSubmitData({ taskDetail, dataForSubmit: autoPendData, variables: allveriables[0] }),
          operationType: eOperationType.close,
        },
      };
    },
  },
};
