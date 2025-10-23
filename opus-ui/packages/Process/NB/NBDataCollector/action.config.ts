import lodash from 'lodash';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import { NAMESPACE } from './activity.config';
import { getSubmitData } from '@/utils/modelUtils/nbUtils';

export default {
  submit: {
    // validate: async ({ dispatch }: any) => {
    //   const errors = await dispatch({
    //     type: `${NAMESPACE}/validateFields`,
    //   });
    //   return errors;
    // },
    action: async ({ dispatch, taskDetail }: any) => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
        payload: {
          operationType: 'submit',
        },
      });
      return { 1: getSubmitData({dataForSubmit, taskDetail})};
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
};
