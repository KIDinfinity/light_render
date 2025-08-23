import lodash from 'lodash';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { serialize as objectToFormData } from 'object-to-formdata';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import { errorMessageModal } from 'claim/pages/utils/popModel';
import { VLD_000921 } from 'claim/pages/validators/sectionValidators';

const cliaimDataIsEmpty = (dataForSubmit: any) =>
  !lodash.isObject(dataForSubmit) &&
  dataForSubmit.toString() === requestHandleType.break.toString();

export default {
  submit: {
    validate: async ({ dispatch }: any) => {
      await dispatch({
        type: 'formCommonController/handleSubmited',
      });

      const dataForSubmit = await dispatch({
        type: `hbOfClaimAssessmentController/getDataForSubmit`,
      });

      const isVLD_000921 = VLD_000921(dataForSubmit);
      if(isVLD_000921){
        return await errorMessageModal(
          [{ Label_COM_WarningMessage: 'MSG_000930' }],
          requestHandleType.break
        );
      }

      const errors = await dispatch({
        type: 'hbOfClaimAssessmentController/validateFields',
      });
      return errors;
    },
    action: async ({ dispatch, taskDetail, allveriables }: any) => {
      const { businessNo: claimNo } = taskDetail;
      const dataForSubmit = await dispatch({
        type: 'hbOfClaimAssessmentController/getDataForSubmit',
      });
      const dataClaimNo = objectToFormData({ claimNo });
      delete dataForSubmit?.notificationList;
      return {
        1: cliaimDataIsEmpty(dataForSubmit)
          ? dataForSubmit
          : getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[0] }),
        2: cliaimDataIsEmpty(dataForSubmit) ? dataForSubmit : dataClaimNo,
      };
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }: any) => {
      const dataForSubmit = await dispatch({
        type: 'hbOfClaimAssessmentController/getDataForSubmit',
      });

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        dataForSubmit,
      });
      return {
        1: cliaimDataIsEmpty(dataForSubmit) ? dataForSubmit : dataForSave,
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
