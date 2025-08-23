import lodash from 'lodash';
import { EOptionType } from 'basic/enum';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import { assembleDefaultDataForSave, assemblePendingDataForSave } from 'basic/utils/SnapshotTool';
import TaskDefKey from 'enum/TaskDefKey';
import { UwDecision } from './Enum';

export default {
  submit: {
    checkInformationBefore: async ({ dispatch, taskDetail }: any) => {
      if (taskDetail?.taskDefKey === TaskDefKey.PH_POS_ACT002) {
        const dataSave = await dispatch({
          type: `GeneralPOSPHNotCFTController/getDataForSave`,
        });
        const uwDecision = lodash.get(
          dataSave,
          'businessData.transactionTypes[0].uwInformation.uwDecision'
        );
        return uwDecision !== UwDecision.Approved;
      }
      return true;
    },
    validate: async ({ dispatch }: any) => {
      const errors = await dispatch({
        type: `GeneralPOSPHNotCFTController/validateFields`,
      });
      return errors;
    },
    action: async ({ dispatch, taskDetail }: any) => {
      const dataSave = await dispatch({
        type: `GeneralPOSPHNotCFTController/getDataForSave`,
      });
      const dataForSubmit = await dispatch({
        type: `GeneralPOSPHNotCFTController/getDataForSubmit`,
        payload: {
          operationType: 'submit',
        },
      });

      const dataForSave = await assemblePendingDataForSave({
        optionType: EOptionType.Submit,
        taskDetail,
        dataForSubmit,
      });

      if (lodash.isEmpty(dataForSubmit) || !dataSave) {
        return {
          1: requestHandleType.break,
        };
      }

      return {
        1: dataForSubmit,
        2: dataForSubmit,
        3: dataForSave,
      };
    },
    anyway: ({ dispatch, responseCollect }: any) => {
      const code = lodash.get(responseCollect, '2.promptMessages[0].code');
      const success = lodash.get(responseCollect, '2.success');
      if (!success && ['duplicated.transaction.type.not.allowed'].includes(code)) {
        dispatch({
          type: 'GeneralPOSPHNotCFTController/updatePosRequestInformation',
          payload: {
            changedFields: { transactionType: '' },
          },
        });
      }
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, isAuto }: any) => {
      const taskDetail = await dispatch({
        type: 'processTask/getTaskDetail',
      });

      const dataSave = await dispatch({
        type: `GeneralPOSPHNotCFTController/getDataForSave`,
      });
      const dataSaveUsTaxInfo = await dispatch({
        type: `GeneralPOSPHNotCFTController/getDataSaveUsTaxInfo`,
      });

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        dataForSubmit: dataSave,
      });

      if (
        isAuto &&
        (lodash.isEmpty(dataSave?.transactionTypes) ||
          lodash.isEmpty(dataSave?.transactionTypes?.[0]))
      ) {
        return { 1: requestHandleType.break, 2: requestHandleType.break };
      }

      if (!taskDetail?.inquiryBusinessNo) {
        return { 1: dataForSave, 2: requestHandleType.break };
      }
      return { 1: dataForSave, 2: dataSaveUsTaxInfo };
    },
  },

  reject: {
    action: async ({ dispatch, taskDetail, isAuto }: any) => {
      const dataSave = await dispatch({
        type: `GeneralPOSPHNotCFTController/getDataForSave`,
      });
      const dataForSubmit = await dispatch({
        type: `GeneralPOSPHNotCFTController/getDataForSubmit`,
        payload: {
          operationType: 'reject',
        },
      });

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Reject,
        dataForSubmit: dataSave,
      });

      if (lodash.isEmpty(dataForSubmit) || !dataSave) {
        return {
          1: requestHandleType.break,
        };
      }
      return {
        1: dataForSubmit,
        2: dataForSubmit,
        3: dataForSave,
      };
    },
  },
};
