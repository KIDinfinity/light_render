import lodash from 'lodash';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { taskGoBack } from '@/utils/task';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { wholeEntities } from 'claimBasicProduct/pages/ManualAssessment/_models/dto/EntriesModel';
import { tenant, Region } from '@/components/Tenant';

export default {
  submit: {
    // validate: async ({ dispatch }) => {
    //   await dispatch({
    //     type: 'formCommonController/handleSubmited',
    //   });
    //   const errors: any = await dispatch({
    //     type: 'HKCLMOfClaimAssessmentController/validateFields',
    //   });
    //   return errors;
    // },
    action: async ({ taskDetail, dispatch, allveriables }) => {
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
        type: 'HKCLMOfClaimAssessmentController/getDataForSubmit',
      });
      const dataForSave = await assembleDefaultDataForSave({
        dataForSubmit,
        taskDetail,
        optionType: EOptionType.Submit,
      });
      const HKOnly = {
        1: dataForBaseInfoParam,
        2: { taskId },
        3: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[1] }),
        4: dataForBaseInfoParam,
        5: dataForSave,
      };

      const common = {
        1: dataForBaseInfoParam,
        2: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[1] }),
        3: dataForBaseInfoParam,
        4: dataForSave,
      };

      return tenant.region() === Region.HK ? HKOnly : common;
    },
    after: async () => {
      taskGoBack();
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }) => {
      const dataForSubmit = await dispatch({
        type: 'HKCLMOfClaimAssessmentController/getDataForSubmit',
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
    action: async ({ taskDetail, dispatch }) => {
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
        type: 'HKCLMOfClaimAssessmentController/getDataForSubmit',
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
    action: async ({ dispatch }) => {
      const claimData = await dispatch({
        type: 'HKCLMOfClaimAssessmentController/getDataForSubmit',
      });
      dispatch({
        type: 'caseSplitController/splitModalOpen',
        payload: { claimData, wholeEntities },
      });
    },
  },
};
