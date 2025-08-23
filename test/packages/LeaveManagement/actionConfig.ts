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
      const businessData = await dispatch({
        type: `${namespace}/getDataForSubmit`,
      });
      const dataForSubmit = {
        businessData,
        caseNo: processInstanceId,
        taskId,
      };

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Submit,
        dataForSubmit: businessData,
      });

      if (lodash.isEmpty(dataForSubmit)) {
        return {
          1: requestHandleType.break,
        };
      }

      return {
        1: dataForSubmit,
        2: dataForSave,
      };
    },
    after: async ({ dispatch }: any) => {
      await dispatch({
        type: `${namespace}/saveState`,
        payload: {
          businessData: {},
          modalTaskId: '',
          showModal: false,
        },
      });
      await dispatch({
        type: `${namespace}/getUserDraftLeaveRequest`,
      });

      await dispatch({
        type: `${namespace}/updateCalendarLeaveData`,
      });

      await dispatch({
        type: `${namespace}/goRouter`,
      });
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
      return { 1: dataForSave };
    },
  },
};
