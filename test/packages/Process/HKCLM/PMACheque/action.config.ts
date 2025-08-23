import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { taskGoBack } from '@/utils/task';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { Action } from '@/components/AuditLog/Enum';
import { NAMESPACE } from './activity.config';

export default {
  submit: {
    validate: async ({ dispatch }) => {
      const errors: any = await dispatch({
        type: `${NAMESPACE}/validateFields`,
      });

      return errors;
    },
    action: async ({ taskDetail, dispatch, allveriables }) => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Submit,
        dataForSubmit,
      });

      return {
        1: dataForSubmit,
        2: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[1] }),
        3: dataForSave,
      };
    },
    after: async () => {
      taskGoBack();
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }) => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
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
  reject: {
    action: async ({ taskDetail, dispatch }: any) => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Submit,
        dataForSubmit,
      });

      return {
        1: dataForSubmit,
        3: dataForSave,
        4: dataForSubmit,
      };
    },
    after: async ({ dispatch }: any) => {
      dispatch({
        type: 'auditLogController/logButton',
        payload: {
          action: Action.Reject,
        },
      });
      taskGoBack();
    },
  },
};
