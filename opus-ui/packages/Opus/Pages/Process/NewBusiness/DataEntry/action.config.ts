import lodash from 'lodash';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import { eOperationType } from '@/enum/eOperationType';

import { NAMESPACE } from './activity.config';

export default {
  submit: {
    validate: async ({ dispatch }: any) => {
      const errors: any = await dispatch({
        type: `${NAMESPACE}/validateFields`,
      });

      return errors;
    },
    action: async ({ taskDetail, dispatch, allveriables }: any) => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });

      const params = {
        businessData: dataForSubmit,
        ...lodash.pick(taskDetail, [
          // 'activityKey',
          'assignee',
          'businessNo',
          'caseCategory',
          'caseNo',
          'inquiryBusinessNo',
          'companyCode',
          'taskId',
        ]),
        activityKey: taskDetail?.taskDefKey,
        operationType: eOperationType.submit,
      };

      return {
        1: params,
      };
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, isAuto }: any) => {
      const taskDetail = await dispatch({
        type: 'processTask/getTaskDetail',
      });
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
      };
    },
  },
};
