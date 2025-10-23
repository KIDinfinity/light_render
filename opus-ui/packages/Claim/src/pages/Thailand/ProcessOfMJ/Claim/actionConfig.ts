import { getSubmitData } from '@/utils/modelUtils/claimUtils';

export default {
  submit: {
    action: async ({ dispatch, taskDetail, allveriables }) => {
      const dataForSubmit = await dispatch({
        type: 'mjProcessController/getDataForSubmit',
      });
      return {
        1: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[0] }),
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
