import lodash from 'lodash';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import { NAMESPACE } from '../CustomerIdentification/activity.config';

export default {
  submit: {
    // validate: async ({ dispatch }: any) => {
    //   const errors = await dispatch({
    //     type: `${NAMESPACE}/validateFields`,
    //   });
    //   return errors;
    // },
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
  ews: {
    isShowNotice: false,
    action: ({ taskDetail }: any) => {
      const { inquiryBusinessNo, processInstanceId } = lodash.pick(taskDetail, [
        'inquiryBusinessNo',
        'processInstanceId',
      ]);
      if (inquiryBusinessNo && processInstanceId) {
        window.open(`/nb/uw/ews/${inquiryBusinessNo}/${processInstanceId}`, '_blank');
      }
    },
  },
};
