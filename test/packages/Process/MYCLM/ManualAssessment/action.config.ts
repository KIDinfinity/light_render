import lodash from 'lodash';
import { NAMESPACE } from './activity.config';
import { EOptionType } from 'basic/enum/EOptionType';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { taskGoBack } from '@/utils/task';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { wholeEntities } from './_models/dto/EntriesModel';
import { ClaimDecision } from 'claim/pages/utils/claim';
/**
 * TODO:error,warn提示弹窗应该放在一个方法里面处理
 */

export default {
  submit: {
    checkInformationBefore: async ({ taskDetail, dispatch }: any) => {
      if (taskDetail.taskDefKey !== 'BP_CLM_ACT004') {
        return true;
      }
      // BP_CLM_ACT004;
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
        payload: { clearData: true },
      });
      const skipIntegration = lodash.get(dataForSubmit, 'skipIntegration');
      return skipIntegration === 'Y';
    },
    validate: async ({ dispatch, taskDetail }: any) => {
      if (taskDetail.taskDefKey === 'PH_CLMUW_ACT001') return [];
      dispatch({
        type: `${NAMESPACE}/packAdjustmentFactorForSubmit`,
      });
      await dispatch({
        type: `${NAMESPACE}/packDataForSubmit`,
      });
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
        payload: { clearData: true },
      });
      // const skipIntegration = dataForSubmit?.skipIntegration || 'N';

      // if (skipIntegration !== 'Y' && !dataForSubmit.appeal) {
      //   const payableError = await dispatch({
      //     type: `${NAMESPACE}/validateSubmitPayable`,
      //   });
      //   if (payableError) {
      //     handleMessageModal([
      //       {
      //         content: payableError,
      //       },
      //     ]);
      //     return requestHandleType.break;
      //   }
      // }
      const { checkNumberRefresh, policyAgent } = lodash.pick(dataForSubmit, [
        'checkNumberRefresh',
        'policyAgent',
      ]);

      const errors: any = await dispatch({
        type: `${NAMESPACE}/validateFields`,
      });

      if (dataForSubmit.claimDecision?.assessmentDecision !== ClaimDecision.deny) {
        const payeeErrors = await dispatch({
          type: `${NAMESPACE}/paymentValidateCertainTab`,
          payload: { isSubmit: true, NAMESPACE },
        });
        return [...errors, ...payeeErrors];
      }

      return errors;
    },
    action: async ({ taskDetail, dispatch, allveriables }: any) => {
      const { taskDefKey, taskStatus, processInstanceId, taskId } = lodash.pick(taskDetail, [
        'taskId',
        'taskStatus',
        'processInstanceId',
        'taskDefKey',
        'caseCategory',
        'activityKey',
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
        payload: { clearData: true },
      });

      const dataForSubmitSaveVer = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      const dataForSave = await assembleDefaultDataForSave({
        dataForSubmit: dataForSubmitSaveVer,
        taskDetail,
        optionType: EOptionType.Submit,
      });

      const common = {
        1: dataForBaseInfoParam,
        2: { taskId },
        3: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[1] }),
        4: dataForSave,
      };

      return common;
    },
    after: async () => {
      taskGoBack();
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }: any) => {
      const taskNotEditable = await dispatch({
        type: 'claimEditable/getTaskNotEditable',
      });

      dispatch({
        type: `${NAMESPACE}/packAdjustmentFactorForSubmit`,
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
        1: dataForSave,
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
        payload: { clearData: true },
      });

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Reject,
        dataForSubmit,
      });
      return {
        1: dataForBaseInfoParam,
        3: dataForSave,
        4: dataForBaseInfoParam,
      };
    },
    after: async () => {
      taskGoBack();
    },
  },
  split: {
    isShowNotice: false,
    action: async ({ dispatch }: any) => {
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
