import lodash from 'lodash';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';

export default {
  submit: {
    validate: async ({ dispatch }: any) => {
      await dispatch({
        type: 'formCommonController/handleSubmited',
      });
      const formErrors = await dispatch({
        type: 'IdentifyHospitalBatchController/validateFields',
      });
      const otherErrors = await dispatch({
        type: 'IdentifyHospitalBatchController/submitTaskFn',
      });
      const errors = lodash.merge(formErrors, otherErrors);
      return errors;
    },
    action: async ({ dispatch, taskDetail, allveriables }: any) => {
      const dataForSubmit = await dispatch({
        type: 'IdentifyHospitalBatchController/getDataForSubmit',
      });
      return {
        1: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables?.[0] }),
      };
    },
    image: {
      action: ({ taskDetail }: any) => {
        const caseNo = taskDetail?.processInstanceId;
        window.open(`/documentManage/${caseNo}`);
      },
      isShowNotice: false,
    },
  },
};
