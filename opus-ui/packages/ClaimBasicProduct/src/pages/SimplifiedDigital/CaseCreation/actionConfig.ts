import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { taskGoBack } from '@/utils/task';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';

export default {
  submit: {
    validate: async ({ dispatch }: any) => {
      const errors: any = await dispatch({
        type: 'simplifiedDigitalController/validateFields',
      });

      return errors;
    },
    action: async ({ taskDetail, dispatch, allveriables }: any) => {
      const dataForSubmit = await dispatch({
        type: 'simplifiedDigitalController/getDataForSubmit',
      });
      const dataForSave = await assembleDefaultDataForSave({
        dataForSubmit,
        taskDetail,
        optionType: EOptionType.Submit,
        extra: { businessCode: dataForSubmit?.businessType },
      });
      return {
        1: {},
        2: getSubmitData({
          taskDetail,
          dataForSubmit,
          variables: allveriables[1],
          extra: { businessCode: dataForSubmit?.businessType },
        }),
        3: dataForSave,
      };
    },
    after: async () => {
      taskGoBack();
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto, allveriables }: any) => {
      const dataForSubmit = await dispatch({
        type: 'simplifiedDigitalController/getDataForSubmit',
      });
      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        dataForSubmit,
        extra: { businessCode: dataForSubmit?.businessType },
      });
      return {
        1: dataForSave,
        2: getSubmitData({
          taskDetail,
          dataForSubmit,
          variables: allveriables[1],
          extra: { businessCode: dataForSubmit?.businessType },
        }),
      };
    },
  },
  // TODO 侧边栏按钮唤起Modal
  questionnaire: {
    isShowNotice: false,
    action: ({ dispatch }: any) => {
      dispatch({
        type: 'questionnaireController/saveVisible',
        payload: { visible: true },
      });
    },
  },
};
