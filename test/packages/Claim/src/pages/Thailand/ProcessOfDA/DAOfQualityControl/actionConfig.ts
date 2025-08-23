import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';

export default {
  submit: {
    validate: async ({ dispatch }: any) => {
      await dispatch({
        type: 'formCommonController/handleSubmited',
      });
      const errors = await dispatch({
        type: 'daOfClaimCaseController/validateFields',
      });
      return errors;
    },
    action: async ({ dispatch, taskDetail, allveriables }: any) => {
      const dataForSubmit = await dispatch({
        type: 'daOfClaimCaseController/getDataForSubmit',
      });
      return {
        1: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[0] }),
      };
    },
    after: async ({ dispatch }) => {
      await dispatch({
        type: 'followUpClaim/saveSnapshot',
      });
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }) => {
      const dataForSubmit = await dispatch({
        type: 'daOfClaimCaseController/getDataForSubmit',
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
  image: {
    action: ({ taskDetail }: any) => {
      const caseNo = taskDetail?.processInstanceId;
      window.open(`/documentManage/${caseNo}`);
    },
    isShowNotice: false,
  },
};
