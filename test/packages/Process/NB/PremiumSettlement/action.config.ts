import { history } from 'umi';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getSubmitData } from '@/utils/modelUtils/nbUtils';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { NAMESPACE } from './activity.config';

export default {
  pend: {
    hidden: ({ taskDetail }: any) => {
      const hiddenFlag = taskDetail?.withdraw || taskDetail?.notWait;
      return hiddenFlag;
    },
  },
  submit: {
    validate: async ({ dispatch }: any) => {
      const errors = await dispatch({
        type: `${NAMESPACE}/validateFields`,
      });
      return errors;
    },
    action: async ({ taskDetail, dispatch }: any) => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      return {
        1: dataForSubmit,
        2: getSubmitData({
          taskDetail,
          dataForSubmit,
        }),
      };
    },
  },
  withdraw: {
    hidden: ({ taskDetail }: any) => {
      const withdrawFlag = formUtils.queryValue(taskDetail?.withdraw) || taskDetail?.notWait;
      return withdrawFlag;
    },
    validate: async ({ dispatch }: any) => {
      const errors = await dispatch({
        type: `${NAMESPACE}/validateFields`,
      });
      return errors;
    },
    action: async ({ dispatch }: any) => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      return {
        1: dataForSubmit,
      };
    },
    after: async ({ taskDetail, responseCollect, dispatch }: any) => {
      const prevTaskId = lodash.get(taskDetail, 'taskId');
      const nextTaskId = lodash.get(responseCollect, '1.resultData.taskId');
      const businessData = lodash.get(responseCollect, '1.resultData.businessData');

      if (prevTaskId === nextTaskId) {
        dispatch({
          type: `${NAMESPACE}/saveBizData`,
          payload: {
            businessData,
          },
        });
      } else {
        history.back();
      }
    },
  },
  save: {
    // timer: 30000,
    hidden: ({ taskDetail }: any) => {
      const hiddenFlag = taskDetail?.withdraw || taskDetail?.notWait;
      return hiddenFlag;
    },
    action: async ({ dispatch, taskDetail, isAuto }: any) => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSave`,
      });
      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        dataForSubmit,
        dispatch,
      });

      return {
        1: dataForSave,
      };
    },
  },
  ews: {
    isShowNotice: false,
    action: ({ taskDetail }: any) => {
      const { businessNo, processInstanceId } = lodash.pick(taskDetail, [
        'businessNo',
        'processInstanceId',
      ]);
      if (businessNo && processInstanceId) {
        window.open(`/nb/uw/ews/${businessNo}/${processInstanceId}`, '_blank');
      }
    },
  },
  reject: {
    action: async ({ dispatch }: any) => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      return {
        1: dataForSubmit,
      };
    },
  },
};
