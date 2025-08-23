import lodash from 'lodash';
import { EOptionType } from 'basic/enum';
import { assembleDefaultDataForSave, assemblePendingDataForSave } from 'basic/utils/SnapshotTool';
import { requestHandleType } from 'bpm/enum/requestHandleType';

export default {
  submit: {
    action: async ({ dispatch, taskDetail }: any) => {
      const claimProcessData = await dispatch({
        type: 'permissionConfigurationController/getClaimProcessData',
      });
      const { processInstanceId, taskId, processDefId } = lodash.pick(taskDetail, [
        'processInstanceId',
        'taskId',
        'processDefId',
      ]);
      const dataForSave = await assemblePendingDataForSave({
        optionType: EOptionType.Submit,
        taskDetail,
        dataForSubmit: claimProcessData,
      });

      return {
        1: {
          taskId,
          caseNo: processInstanceId,
          processDefinitionId: processDefId,
          functionId: claimProcessData?.functionId,
          operator: claimProcessData?.operator,
        },
        2: dataForSave,
      };
    },
    after: ({ dispatch }: any) => {
      dispatch({
        type: 'configurationController/hideModal',
      });
    },
    anyway: ({ dispatch, responseCollect }: any) => {
      const code = lodash.get(responseCollect, '1.promptMessages[0].code');
      const success = lodash.get(responseCollect, '1.success');
      if (!success && ['[cc].request.records.duplicate.error.approve'].includes(code)) {
        dispatch({
          type: 'permissionConfigurationController/findDuplicateData',
          payload: {
            isWarning: false,
          },
        });
      }
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }: any) => {
      const claimProcessData = await dispatch({
        type: 'permissionConfigurationController/getClaimProcessData',
      });
      if (!claimProcessData) {
        return { 1: requestHandleType.break };
      }

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        dataForSubmit: claimProcessData,
      });
      return { 1: dataForSave };
    },
  },
  reject: {
    action: async ({ dispatch, taskDetail }: any) => {
      const claimProcessData = await dispatch({
        type: 'permissionConfigurationController/getClaimProcessData',
      });
      const { processInstanceId, taskId, processDefId } = lodash.pick(taskDetail, [
        'processInstanceId',
        'taskId',
        'processDefId',
      ]);

      return {
        1: {
          taskId,
          caseNo: processInstanceId,
          processDefinitionId: processDefId,
          functionId: claimProcessData?.functionId,
          operator: claimProcessData?.operator,
        },
      };
    },
  },
};
