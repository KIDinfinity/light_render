import lodash from 'lodash';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { taskGoBack } from '@/utils/task';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import { wholeEntities } from '../ManualAssessment/_models/dto/EntriesModel';
import { Modal } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';

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
    // validate: async ({ dispatch }) => {
    //   await dispatch({
    //     type: 'formCommonController/handleSubmited',
    //   });
    //   const errors: any = await dispatch({
    //     type: 'opusClaimAssessment/validateFields',
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
        type: 'opusClaimAssessment/getDataForSubmit',
      });
      const dataForSave = await assembleDefaultDataForSave({
        dataForSubmit,
        taskDetail,
        optionType: EOptionType.Submit,
      });
      return {
        1: dataForBaseInfoParam,
        2: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[1] }),
        3: dataForBaseInfoParam,
        4: dataForSave,
      };
    },
    after: async () => {
      taskGoBack();
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }) => {
      const updateOpusParam = lodash.pick(taskDetail, ['taskId', 'caseNo']);
      const dataForSubmit = await dispatch({
        type: 'opusClaimAssessment/getDataForSubmit',
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
  reject: {
    validate: async ({ taskDetail, dispatch }) => {
      try {
        await holdPromise(dispatch, 'Reject', taskDetail);
      } catch (err) {
        return requestHandleType.break;
      }
    },
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
        type: 'opusClaimAssessment/getDataForSubmit',
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
    after: async ({ dispatch }) => {
      await new Promise((resolve) => {
        Modal.success({
          centered: true,
          title: formatMessageApi({ Label_COM_General: 'success' }),
          content: formatMessageApi({ Label_COM_Message: 'MSG_000972' }),
          okText: formatMessageApi({ Label_BPM_Button: 'Close' }),
          onOk: () => {
            dispatch({
              type: `newBusinessManualUnderwriting/setInformationModalShow`,
              payload: {
                cancel: true,
              },
            });
            resolve(true);
          },
        });
      });

      taskGoBack();
    },
  },
  split: {
    isShowNotice: false,
    action: async ({ dispatch }) => {
      const claimData = await dispatch({
        type: 'opusClaimAssessment/getDataForSubmit',
      });
      dispatch({
        type: 'caseSplitController/splitModalOpen',
        payload: { claimData, wholeEntities },
      });
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
      const dataForSubmit = await dispatch({
        type: `opusClaimAssessment/getDataForSubmit`,
      });
      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Cancel,
        dataForSubmit,
      });
      return {
        1: dataForBaseInfoParam,
        3: dataForSave,
        4: dataForBaseInfoParam,
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
  nameScreening: {
    validate: ({ dispatch }: any) => {
      dispatch({
        type: `opusClaimAssessment/setNameScreeningVisible`,
        payload: {
          nameScreeningVisible: true,
        },
      });
      return requestHandleType.break;
    },
  },
};
