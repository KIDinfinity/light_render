import lodash from 'lodash';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';

export default {
  submit: {
    validate: async ({ dispatch, taskDetail }: any) => {
      const dataForSubmit = await dispatch({
        type: 'IdentifyHospitalBatchController/getDataForSubmit',
      });

      const tempForSubmit = {
        ...(dataForSubmit?.claimHospitalBillingVO || {}),
      };
      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Submit,
        dataForSubmit: tempForSubmit,
      });
      await dispatch({
        type: 'formCommonController/handleSubmited',
      });
      const formErrors = await dispatch({
        type: 'IdentifyHospitalBatchController/validateFields',
      });
      const otherErrors = await dispatch({
        type: 'IdentifyHospitalBatchController/submitTaskFn',
      });
      const errors = lodash.concat(formErrors, otherErrors);
      return errors;
    },
    action: async ({ dispatch, taskDetail, allveriables }: any) => {
      const dataForSubmit = await dispatch({
        type: 'IdentifyHospitalBatchController/getDataForSubmit',
      });

      const tempForSubmit = {
        ...(dataForSubmit?.claimHospitalBillingVO || {}),
      };

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Submit,
        dataForSubmit: tempForSubmit,
      });

      return {
        1: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables?.[0] }),
        2: dataForSave,
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
