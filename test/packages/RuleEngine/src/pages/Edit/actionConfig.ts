import lodash from 'lodash';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import { namespace } from './_models';

export default {
  submit: {
    validate: async ({ dispatch }: any) => {
      await dispatch({
        type: 'formCommonController/handleSubmited',
      });
      const errors = await dispatch({
        type: `${namespace}/validateFields`,
      });

      return errors;
    },
    action: async ({ dispatch, taskDetail }: any) => {
      const { taskId, processInstanceId } = taskDetail;
      const dataSave = await dispatch({
        type: `${namespace}/getDataForSubmit`,
      });
      const dataForSubmitRuleSet = {
        ...dataSave,
        caseNo: processInstanceId,
        taskId,
      };

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Submit,
        dataForSubmit: dataSave,
      });
      if (lodash.isEmpty(dataSave)) {
        return {
          1: requestHandleType.break,
        };
      }

      return {
        1: dataForSubmitRuleSet,
        2: dataForSave,
      };
    },
  },
  approve: {
    action: async ({ dispatch, taskDetail }: any) => {
      const { taskId, processInstanceId } = taskDetail;
      const dataSave = await dispatch({
        type: `${namespace}/getDataForSubmit`,
      });
      const dataForSubmitRuleSet = {
        ...dataSave,
        caseNo: processInstanceId,
        taskId,
      };

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.approve,
        dataForSubmit: dataSave,
      });
      if (lodash.isEmpty(dataSave)) {
        return {
          1: requestHandleType.break,
        };
      }

      return {
        1: dataForSubmitRuleSet,
        2: dataForSave,
      };
    },
  },

  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }: any) => {
      const dataForSubmit = await dispatch({
        type: `${namespace}/getDataForSubmit`,
      });

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        dataForSubmit,
      });
      return { 2: dataForSave };
    },
  },
  reject: {
    action: async ({ dispatch, taskDetail }) => {
      const { taskId, processInstanceId } = lodash.pick(taskDetail, [
        'taskId',
        'processInstanceId',
      ]);

      const dataSave = await dispatch({
        type: `${namespace}/getDataForSubmit`,
      });
      const dataForSubmitRuleSet = {
        ...dataSave,
        caseNo: processInstanceId,
        taskId,
      };

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Reject,
        dataForSubmit: dataSave,
      });
      return {
        1: dataForSubmitRuleSet,
        2: dataForSubmitRuleSet,
        3: dataForSave,
      };
    },
  },
};
