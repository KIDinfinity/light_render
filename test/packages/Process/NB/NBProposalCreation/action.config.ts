import { getSubmitData } from '@/utils/modelUtils/nbUtils';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import requestHandleType from 'bpm/enum/requestHandleType';

export default {
  save: {
    action: async ({ taskDetail, dispatch }: any) => {
      let dataForSubmit = await dispatch({
        type: `manualUnderwriting/getDataForSubmit`,
      });

      dataForSubmit = {
        businessCode: 'BIZ003',
        interfaceId: 'I004002',
        submissionBatchDatas: [
          {
            businessData: dataForSubmit.businessData,
          },
        ],
        taskId: taskDetail?.taskId,
      };

      const dataForSave = await assembleDefaultDataForSave({
        dataForSubmit,
        taskDetail,
        optionType: EOptionType.Save,
      });

      return {
        1: dataForSave,
      };
    },
    timer: 30000,
  },
  submit: {
    validate: async ({ dispatch }: any) => {
      const errors = await dispatch({
        type: `manualUnderwriting/validateFields`,
      });
      if (errors?.length > 0) {
        return errors;
      }
      const validateRole: boolean = await dispatch({
        type: 'manualUnderwriting/validatePerposal',
      });
      return validateRole ? [] : requestHandleType.break;
    },

    action: async ({ taskDetail, dispatch }: any) => {
      const dataForSubmit = await dispatch({
        type: `manualUnderwriting/getDataForPaperSubmission`,
      });
      return {
        1: dataForSubmit,
        2: getSubmitData({
          taskDetail,
          dataForSubmit,
        }),
      };
    },
  },
};
