import lodash from 'lodash';
import { NAMESPACE } from './activity.config';
import { Modal } from 'antd';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { taskGoBack } from '@/utils/task';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { requestHandleType } from 'bpm/enum/requestHandleType';

const holdPromise = (dispatch: any, category: string, taskDetail: any) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: `newBusinessManualUnderwriting/setInformationModalShow`,
      payload: {
        category,
        taskDetail,
        resolve: resolve,
        reject: reject,
      },
    });
  });
};

export default {
  submit: {
    validate: async ({ dispatch }: any) => {
      const errors: any = await dispatch({
        type: `${NAMESPACE}/validateFields`,
      });
      return errors;
    },
    action: async ({ taskDetail, dispatch, allveriables }: any) => {
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
        payload: {
          taskDetail,
        },
      });

      const saveDatas = await dispatch({
        type: `${NAMESPACE}/getDataForSave`,
      });
      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Save,
        dataForSubmit: { ...saveDatas },
      });

      return {
        1: dataForBaseInfoParam,
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
    action: async ({ dispatch, taskDetail, isAuto }: any) => {
      const updateOpusParam = lodash.pick(taskDetail, ['taskId', 'caseNo']);
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSave`,
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

  escalate: {
    validate: async ({ taskDetail, dispatch }) => {
      try {
        await holdPromise(dispatch, 'EscalateReason', taskDetail);
      } catch (err) {
        return requestHandleType.break;
      }
    },
  },

  cancel: {
    validate: async ({ taskDetail, dispatch }) => {
      try {
        await holdPromise(dispatch, 'Cancel', taskDetail);
      } catch (err) {
        return requestHandleType.break;
      }
    },
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

      const saveDatas = await dispatch({
        type: `${NAMESPACE}/getDataForSave`,
      });
      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Cancel,
        dataForSubmit: { ...saveDatas },
      });

      return {
        1: dataForBaseInfoParam,
        2: dataForSave,
      };
    },
    after: async ({ dispatch }: any) => {
      return new Promise((resolve) => {
        Modal.success({
          centered: true,
          title: formatMessageApi({ Label_COM_General: 'success' }),
          content: formatMessageApi({ Label_COM_Message: 'MSG_001143' }),
          okText: formatMessageApi({ Label_BPM_Button: 'Close' }),
          onOk: () => {
            dispatch({
              type: `newBusinessManualUnderwriting/setInformationModalShow`,
              payload: {
                cancel: true,
              },
            });
            return resolve(true);
          },
        });
      });
    },
  },
};
