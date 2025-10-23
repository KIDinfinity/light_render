import lodash from 'lodash';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { requestHandleType } from 'bpm/enum/requestHandleType';

import { NAMESPACE } from './activity.config';

export default {
  submit: {
    validate: async ({ dispatch }: any) => {},
    action: async ({ taskDetail, dispatch, allveriables }: any) => {
      const { taskDefKey, taskStatus, processInstanceId, taskId, submissionChannel } = lodash.pick(
        taskDetail,
        [
          'taskId',
          'taskStatus',
          'processInstanceId',
          'taskDefKey',
          'caseCategory',
          'submissionDate',
          'submissionChannel',
        ]
      );
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
        optionType: EOptionType.Submit,
        dataForSubmit,
      });

      dataForSubmit.submissionChannel = dataForSubmit?.submissionChannel || submissionChannel;

      return {
        1: dataForBaseInfoParam,
        2: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[1] }),
        3: dataForSave,
      };
      return {};
    },
  },
  save: {
    // timer: 30000,
    action: async ({ dispatch, isAuto }: any) => {
      const taskDetail = await dispatch({
        type: 'processTask/getTaskDetail',
      });
      const updateOpusParam = lodash.pick(taskDetail, ['taskId', 'caseNo']);
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        dataForSubmit,
        syncData: true,
      });

      return {
        1: dataForSave,
        2: updateOpusParam,
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
        1: dataForBaseInfoParam,
        3: dataForSave,
        4: dataForBaseInfoParam,
      };
    },
    after: async () => {
      // taskGoBack();
    },
  },
};
