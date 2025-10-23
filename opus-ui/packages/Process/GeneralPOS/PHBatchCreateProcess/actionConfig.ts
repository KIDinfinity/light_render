import lodash from 'lodash';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';

export default {
  submit: {
    validate: async ({ dispatch }) => {
      await dispatch({
        type: 'formCommonController/handleSubmited',
      });
      const errors = await dispatch({
        type: 'PHBatchCreateProcessController/validateFields',
      });
      return errors;
    },
    action: async ({ taskDetail, dispatch, allveriables }: any) => {
      const data = await dispatch({
        type: 'PHBatchCreateProcessController/getDataForSubmit',
      });

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Submit,
        dataForSubmit: data,
      });
      return {
        1: getSubmitData({
          taskDetail,
          dataForSubmit: data,
          variables: allveriables[1],
        }),
        2: dataForSave,
      };
    },
    after: async ({ dispatch, responseCollect = {} }: any) => {
      const taskId = lodash.get(responseCollect, '1.resultData.businessData.taskId');
      dispatch({
        type: 'global/visitTaskDetail',
        payload: { taskId },
      });
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }) => {
      const dataForSubmit = await dispatch({
        type: 'PHBatchCreateProcessController/getDataForSubmit',
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
};
