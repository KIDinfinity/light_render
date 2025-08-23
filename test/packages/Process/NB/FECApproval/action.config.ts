import { getSubmitData } from '@/utils/modelUtils/nbUtils';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { NAMESPACE } from './activity.config';

export default {
  submit: {
    validate: async ({ dispatch }: any) => {
      const errors = await dispatch({
        type: `${NAMESPACE}/validateFields`,
      });
      return errors;
    },
    action: async ({ taskDetail, dispatch }: any) => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      return {
        1: getSubmitData({
          taskDetail,
          dataForSubmit,
        }),
      };
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }: any) => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        dataForSubmit: dataForSubmit.businessData,
        dispatch,
      });
      return {
        1: dataForSave,
      };
    },
  },
};
