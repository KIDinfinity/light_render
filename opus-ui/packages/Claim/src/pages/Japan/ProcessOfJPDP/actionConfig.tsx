import { formatMessageApi } from '@/utils/dictFormatMessage';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { formUtils } from 'basic/components/Form';
import { VLD_000065 } from '@/utils/validations';

export default {
  submit: {
    validate: async ({ dispatch }: any) => {
      const errors = await dispatch({
        type: 'JPDPOfDocumentDispatchController/validateFields',
      });
      const businessData = await dispatch({
        type: 'JPDPOfDocumentDispatchController/getBusinessData',
      });
      if (!VLD_000065(businessData?.dispatchDocs)) {
        errors.push(
          formatMessageApi({
            Label_COM_WarningMessage: 'ERR_000138',
          })
        );
      }
      return errors;
    },
    action: async ({ dispatch, taskDetail }: any) => {
      const {
        taskId,
        processInstanceId,
        caseCategory,
        inquiryBusinessNo,
        activityKey,
      } = taskDetail;
      const businessData = await dispatch({
        type: 'JPDPOfDocumentDispatchController/getBusinessData',
      });
      const dataForSubmit = formUtils.cleanValidateData(businessData);
      return {
        1: {
          taskId,
          caseNo: processInstanceId,
          caseCategory,
          inquiryBusinessNo,
          activityKey,
          businessData: dataForSubmit,
          operationType: 'submit',
        },
      };
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }: any) => {
      const businessData = await dispatch({
        type: 'JPDPOfDocumentDispatchController/getBusinessData',
      });
      const dataForSubmit = formUtils.cleanValidateData(businessData);
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
};
