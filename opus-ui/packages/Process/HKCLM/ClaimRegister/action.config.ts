import lodash from 'lodash';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { EOptionType } from 'basic/enum/EOptionType';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { NAMESPACE } from './activity.config';
import handleMessageModal from '@/utils/commonMessage';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import { taskGoBack } from '@/utils/task';
import { wholeEntities } from 'claimBasicProduct/pages/DataCapture/_models/dto/EntriesModel';

export default {
  submit: {
    validate: async ({ dispatch }) => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      const { promptMessages } = lodash.pick(dataForSubmit, [
        'checkNumberRefresh',
        'policyAgent',
        'promptMessages',
      ]);

      // 判断调integration接口是否返回error
      if (promptMessages) {
        handleMessageModal(promptMessages);
        return requestHandleType.break;
      }

      await dispatch({
        type: 'formCommonController/handleSubmited',
      });

      const errors: any = await dispatch({
        type: `${NAMESPACE}/validateFields`,
        payload: {
          assuranceProcess: true,
        },
      });

      return errors;
    },
    action: async ({ taskDetail, dispatch }: any) => {
      const { submissionDate } = taskDetail;
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Submit,
        dataForSubmit,
      });
      dataForSubmit.submissionDate = submissionDate || dataForSubmit?.submissionDate;
      const submitData = getSubmitData({ taskDetail, dataForSubmit });
      submitData.inquiryBusinessNo = dataForSubmit.inquiryClaimNo;
      submitData.submissionDate = submissionDate || dataForSubmit?.submissionDate;

      return {
        5: submitData,
        10: submitData,
        15: dataForSave,
      };
    },
    after: async () => {
      taskGoBack();
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }) => {
      const taskNotEditable = await dispatch({
        type: 'claimEditable/getTaskNotEditable',
      });

      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        dataForSubmit,
        taskNotEditable,
      });

      return {
        5: dataForSave,
      };
    },
  },
  reject: {
    action: async ({ taskDetail, dispatch }: any) => {
      const { taskDefKey, taskStatus, processInstanceId, taskId } = lodash.pick(taskDetail, [
        'taskId',
        'taskStatus',
        'processInstanceId',
        'taskDefKey',
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
        type: `${NAMESPACE}/getDataForSubmit`,
      });

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Reject,
        dataForSubmit,
      });
      return {
        5: dataForBaseInfoParam,
        10: dataForSave,
        15: dataForBaseInfoParam,
      };
    },
    after: async () => {
      taskGoBack();
    },
  },
  split: {
    isShowNotice: false,
    action: async ({ dispatch }) => {
      const claimData = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      dispatch({
        type: 'caseSplitController/splitModalOpen',
        payload: { claimData, wholeEntities },
      });
    },
  },
};
