import lodash from 'lodash';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { taskGoBack } from '@/utils/task';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import CaseCategory from 'basic/enum/CaseCategory';
import { wholeEntities } from './_models/dto/EntriesModel';

export default {
  submit: {
    validate: async ({ dispatch }) => {
      await dispatch({
        type: 'formCommonController/handleSubmited',
      });
      const errors: any = await dispatch({
        type: 'bpOfDataCaptureController/validateFields',
      });
      return errors;
    },
    action: async ({ taskDetail, dispatch, allveriables }) => {
      const {
        taskDefKey,
        taskStatus,
        processInstanceId,
        taskId,
        caseCategory,
        submissionDate,
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
        type: 'bpOfDataCaptureController/getDataForSubmit',
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
      if (caseCategory === CaseCategory.PH_CLM_CTG001) {
        return {
          1: dataForSave,
          2: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[2] }),
          3: dataForSave,
        };
      }
      lodash.set(dataForSubmit, 'submissionDate', submissionDate);
      lodash.set(dataForSubmit, 'submissionChannel', submissionChannel);

      return {
        1: dataForBaseInfoParam,
        2: checkDocInfo,
        3: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[2] }),
        4: dataForBaseInfoParam,
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
        type: 'bpOfDataCaptureController/getDataForSubmit',
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
        type: 'bpOfDataCaptureController/getDataForSubmit',
      });
      dispatch({
        type: 'caseSplitController/splitModalOpen',
        payload: { claimData, wholeEntities },
      });
    },
  },
};
