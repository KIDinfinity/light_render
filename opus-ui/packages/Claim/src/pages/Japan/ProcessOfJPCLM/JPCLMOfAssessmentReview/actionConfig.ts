import { history } from 'umi';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { EOptionType } from 'basic/enum';
import { assemblePendingDataForSave } from 'basic/utils/SnapshotTool';

import { Action } from '@/components/AuditLog/Enum';

export default {
  submit: {
    action: async ({ dispatch, taskDetail, allveriables }) => {
      const claimProcessData = await dispatch({
        type: 'JPCLMOfClaimAssessmentController/getDataForSubmit',
        format: true,
      });

      const dataForSubmit = await dispatch({
        type: 'JPCLMOfClaimAssessmentController/getDataForSubmit',
      });

      const dataForSave = await assemblePendingDataForSave({
        optionType: EOptionType.Submit,
        taskDetail,
        dataForSubmit: claimProcessData,
      });

      return {
        1: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[0] }),
        2: dataForSave,
      };
    },
    after: async ({ dispatch }: any) => {
      dispatch({
        type: 'auditLogController/logButton',
        payload: {
          action: Action.Reject,
        },
      });
      history.back();
    },
  },
  reject: {
    action: async ({ dispatch, taskDetail }) => {
      const claimProcessData = await dispatch({
        type: 'JPCLMOfClaimAssessmentController/getDataForSubmit',
        format: true,
      });

      const dataForSave = await assemblePendingDataForSave({
        optionType: EOptionType.Reject,
        taskDetail,
        dataForSubmit: claimProcessData,
      });

      return {
        1: claimProcessData,
        3: dataForSave,
      };
    },
    after: async ({ dispatch }: any) => {
      history.back();
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
