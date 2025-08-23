import lodash from 'lodash';
import { history } from 'umi';
import { formUtils } from 'basic/components/Form';
import { getSubmitData } from '@/utils/modelUtils/nbUtils';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { NAMESPACE } from '../ManualUnderwriting/activity.config';
import { ButtonCode } from 'bpm/enum';

export default {
  submit: {
    // validate: async ({ dispatch }: any) => {
    //   const errors = await dispatch({
    //     type: `${NAMESPACE}/validateFields`,
    //   });
    //   return errors;
    // },
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
      const withdrawFlag = formUtils.queryValue(taskDetail?.withdraw);
      return withdrawFlag;
    },
    action: async ({ dispatch }: any) => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      return {
        1: dataForSubmit,
      };
    },
  },
  save: {
    timer: 30000,
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
  proposalChange: {
    action: async ({ taskDetail, dispatch }: any) => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSave`,
      });
      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.proposalChange,
        dataForSubmit: {
          ...dataForSubmit,
          isProposalChange: true,
        },
        dispatch,
      });
      return {
        1: dataForSave,
      };
    },
    after: ({ taskDetail }: any) => {
      history.push(`/nb/uw/proposal/${taskDetail?.taskId}`);
    },
    isShowNotice: false,
  },
  ews: {
    isShowNotice: false,
    action: ({ taskDetail }: any) => {
      const { businessNo, processInstanceId } = lodash.pick(taskDetail, [
        'businessNo',
        'processInstanceId',
      ]);
      if (businessNo) {
        window.open(`/nb/uw/ews/${businessNo}/${processInstanceId}`, '_blank');
      }
    },
  },
  appeal: {
    action: () => {
      return {};
    },
    customProcessService: async ({ data, dispatch, buttonConfig, service }: any) => {
      const { buttonServiceUrl } = service;
      const { buttonCode } = buttonConfig;
      if (buttonCode === ButtonCode.Appeal && buttonServiceUrl === '/api/navigator/cases/create') {
        const response = await dispatch({
          type: 'workspaceCases/asyncTouch',
          payload: {
            // appeal create 改用touch->getTouchResult方式，不需要传activityKey
            params: { ...data, operationType: 'asyncAppealCreate', activityKey: undefined },
          },
        });
        // processed返回true，这个接口接下来就不会被bpm call了
        return Promise.resolve({ processed: true, response });
      }

      return Promise.resolve({ processed: false });
    },
    after: ({ responseCollect }: any) => {
      const resultData = lodash.get(responseCollect, '1.resultData');
      history.push(`/process/task/detail/${lodash.get(resultData, 'taskId')}`);
    },
  },
  UpdatePolicy: {
    isShowNotice: false,
    action: ({ dispatch }: any) => {
      dispatch({
        type: `${NAMESPACE}/changeUpdatePolicyModalVisible`,
        payload: {
          updatePolicyModalVisible: true,
        },
      });
      dispatch({
        type: `${NAMESPACE}/startEditPostQClient`,
      });
    },
  },
};
