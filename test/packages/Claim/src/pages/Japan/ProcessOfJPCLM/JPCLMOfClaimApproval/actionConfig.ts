import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import lodash from 'lodash';
import { Action } from '@/components/AuditLog/Enum';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { eOperationType } from '@/enum/eOperationType';
import { EOptionType } from 'basic/enum/EOptionType';

export default {
  submit: {
    action: async ({ dispatch, taskDetail, allveriables }) => {
      const dataForSubmit = await dispatch({
        type: 'JPCLMOfClaimAssessmentController/getDataForSubmit',
      });
      delete dataForSubmit.variables;
      // 前端提交数据时置空notificationList
      delete dataForSubmit.notificationList;
      const isEnd = lodash.get(allveriables[0], 'nextActivity') === 'end';
      const submitData = getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[0] });
      return {
        1: isEnd ? { ...submitData, operationType: eOperationType.close } : submitData,
      };
    },
  },
  reject: {
    action: async ({ dispatch, taskDetail }) => {
      const dataForSubmit = await dispatch({
        type: 'JPCLMOfClaimAssessmentController/getDataForSubmit',
      });
      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Reject,
        dataForSubmit,
      });
      return {
        1: dataForSubmit,
        3: dataForSave,
      };
    },
    after: async ({ dispatch }) => {
      dispatch({
        type: 'auditLogController/logButton',
        payload: {
          action: Action.Reject,
        },
      });
    },
  },
  save: {
    action: async ({ dispatch, taskDetail, isAuto }: any) => {
      const dataForSubmit = await dispatch({
        type: 'JPCLMOfClaimAssessmentController/getDataForSubmit',
      });

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        dataForSubmit,
      });

      return { 1: dataForSave };
    },
    after: async ({ dispatch, isAuto }: any) => {
      const claimProcessData = await dispatch({
        type: 'JPCLMOfClaimAssessmentController/getDataForSubmit',
      });
      dispatch({
        type: 'auditLogController/logButton',
        payload: {
          action: Action.Save,
          isAuto,
          claimProcessData,
        },
      });
    },
  },
  tblSearch: {
    isShowNotice: false,
    action: async ({ dispatch }: any) => {
      dispatch({
        type: 'medicalSearch/changeVisible',
        payload: {
          visible: true,
        },
      });
    },
  },
};
