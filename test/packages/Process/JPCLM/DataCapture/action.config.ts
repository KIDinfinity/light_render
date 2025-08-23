import lodash from 'lodash';
import { notification } from 'antd';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { taskGoBack } from '@/utils/task';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import handleMessageModal from '@/utils/commonMessage';
import { wholeEntities } from 'claimBasicProduct/pages/DataCapture/_models/dto/EntriesModel';

export default {
  submit: {
    validate: async ({ dispatch }) => {
      const dataForSubmit = await dispatch({
        type: 'JPCLMOfDataCapture/getDataForSubmit',
      });
      const { checkNumberRefresh, policyAgent } = lodash.pick(dataForSubmit, [
        'checkNumberRefresh',
        'policyAgent',
      ]);
      // 判断更改agent number是否有点击refresh icon
      if (!checkNumberRefresh && policyAgent?.agentNumber) {
        notification.error({
          message: formatMessageApi({
            Label_COM_ErrorMessage: 'MSG_000415',
          }),
        });
        return requestHandleType.break;
      }
      await dispatch({
        type: 'formCommonController/handleSubmited',
      });
      const errors: any = await dispatch({
        type: 'JPCLMOfDataCapture/validateFields',
      });
      const claimTypeValidateErrors = await dispatch({
        type: 'JPCLMOfDataCapture/validateClaimType',
      });
      if (lodash.isEmpty(errors) && !lodash.isEmpty(claimTypeValidateErrors)) {
        handleMessageModal(claimTypeValidateErrors);
        return requestHandleType.break;
      }
      return errors;
    },
    action: async ({ taskDetail, dispatch, allveriables }) => {
      const {
        taskDefKey,
        taskStatus,
        processInstanceId,
        taskId,
        caseCategory,
        submissionChannel,
      } = lodash.pick(taskDetail, [
        'taskId',
        'taskStatus',
        'processInstanceId',
        'taskDefKey',
        'caseCategory',
        'processInstanceId',
        'submissionDate',
        'submissionChannel',
      ]);
      const dataForBaseInfoParam = {
        activityCode: taskDefKey,
        activityStatus: taskStatus,
        caseNo: processInstanceId,
        categoryCode: '',
        creator: '',
        deleted: 0,
        gmtCreate: '',
        gmtModified: '',
        id: '',
        modifier: '',
        taskId,
        transId: '',
      };
      const dataForSubmit = await dispatch({
        type: 'JPCLMOfDataCapture/getDataForSubmit',
      });

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Submit,
        dataForSubmit,
      });
      const checkDocInfo = {
        activityCode: taskDefKey,
        caseCategory,
        caseNo: processInstanceId,
      };
      dataForSubmit.submissionChannel = dataForSubmit?.submissionChannel || submissionChannel;

      return {
        1: dataForBaseInfoParam,
        2: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[1] }),
        3: dataForSave,
      };
      return {};
    },
    after: async () => {
      taskGoBack();
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }) => {
      const dataForSubmit = await dispatch({
        type: 'JPCLMOfDataCapture/getDataForSubmit',
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
  split: {
    isShowNotice: false,
    action: async ({ dispatch }) => {
      const claimData = await dispatch({
        type: 'JPCLMOfDataCapture/getDataForSubmit',
      });
      dispatch({
        type: 'caseSplitController/splitModalOpen',
        payload: { claimData, wholeEntities },
      });
    },
  },
};
