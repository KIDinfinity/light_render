import lodash from 'lodash';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { taskGoBack } from '@/utils/task';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { wholeEntities } from '../ManualAssessment/_models/dto/EntriesModel';
import { NAMESPACE } from '../ManualAssessment/activity.config';

// import { handleMessageModal, handleWarnMessageModal } from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import { Modal } from 'antd';

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
    //     type: 'OpusClaimAssessment/validateFields',
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
        type: `${NAMESPACE}/getDataForSubmit`,
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
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }) => {
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
      taskGoBack();
    },
  },
  split: {
    isShowNotice: false,
    action: async ({ dispatch }) => {
      const claimData = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      dispatch({
        type: 'caseSplitController/splitModalOpen',
        payload: { claimData, wholeEntities },
      });
    },
  },
  qaPass: {
    validate: async ({ dispatch }) => {
      const promise = new Promise((res) => {
        Modal.confirm({
          title: formatMessageApi({ Label_COM_Opus: 'confirmation' }),
          content: formatMessageApi({ Label_COM_WarningMessage: 'MSG_001071' }),
          centered: true,
          okText: formatMessageApi({ Label_BPM_Button: 'Confirm' }),
          cancelText: formatMessageApi({ Label_COM_Opus: 'cancel' }),
          onOk() {
            res(true);
          },
          onCancel() {
            res(false);
          },
        });
      });

      const res = await promise;
      if (res) return [];
      else return requestHandleType.break;
    },
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
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      const dataForSave = await assembleDefaultDataForSave({
        dataForSubmit,
        taskDetail,
        optionType: EOptionType.Submit,
      });
      return {
        2: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[1] }),
        3: dataForSave,
      };
    },
    after: async ({ dispatch }: any) => {
      Modal.success({
        centered: true,
        title: formatMessageApi({ Label_COM_General: 'success' }),
        content: formatMessageApi({ Label_COM_Message: 'MSG_001072' }, 'QA'),
        okText: formatMessageApi({ Label_BPM_Button: 'Close' }),
        onOk: () => {
          dispatch({
            type: `newBusinessManualUnderwriting/setInformationModalShow`,
            payload: {
              cancel: true,
            },
          });
          taskGoBack();
        },
      });
    },
  },
  qaFail: {
    validate: async ({ taskDetail, dispatch }) => {
      try {
        await holdPromise(dispatch, 'QAFail', taskDetail);
      } catch (err) {
        return requestHandleType.break;
      }
    },
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
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Reject,
        dataForSubmit,
      });
      return {
        2: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[1] }),
        3: dataForSave,
      };
    },
    after: async ({ dispatch }) => {
      Modal.success({
        centered: true,
        title: formatMessageApi({ Label_COM_General: 'success' }),
        content: formatMessageApi({ Label_COM_Message: 'MSG_001074' }, 'QA'),
        okText: formatMessageApi({ Label_BPM_Button: 'Close' }),
        onOk: () => {
          dispatch({
            type: `newBusinessManualUnderwriting/setInformationModalShow`,
            payload: {
              cancel: true,
            },
          });
          taskGoBack();
        },
      });
    },
  },
  qcPass: {
    validate: async ({ dispatch }: any) => {
      const promise = new Promise((res) => {
        Modal.confirm({
          title: formatMessageApi({ Label_COM_Opus: 'confirmation' }),
          content: formatMessageApi({ Label_COM_WarningMessage: 'MSG_001071' }),
          centered: true,
          okText: formatMessageApi({ Label_BPM_Button: 'Confirm' }),
          cancelText: formatMessageApi({ Label_COM_Opus: 'cancel' }),
          onOk() {
            res(true);
          },
          onCancel() {
            res(false);
          },
        });
      });

      const res = await promise;
      if (res) return [];
      else return requestHandleType.break;
    },
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
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      const dataForSave = await assembleDefaultDataForSave({
        dataForSubmit,
        taskDetail,
        optionType: EOptionType.Submit,
      });
      return {
        1: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[1] }),
        2: dataForSave,
      };
    },
    after: async ({ dispatch }: any) => {
      Modal.success({
        centered: true,
        title: formatMessageApi({ Label_COM_General: 'success' }),
        content: formatMessageApi({ Label_COM_WarningMessage: 'MSG_001140' }),
        okText: formatMessageApi({ Label_BPM_Button: 'Close' }),
        onOk: () => {
          dispatch({
            type: `newBusinessManualUnderwriting/setInformationModalShow`,
            payload: {
              cancel: true,
            },
          });
          taskGoBack();
        },
      });
    },
  },
  qcFail: {
    validate: async ({ taskDetail, dispatch }) => {
      try {
        await holdPromise(dispatch, 'QCFail', taskDetail);
      } catch (err) {
        return requestHandleType.break;
      }
    },
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
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Reject,
        dataForSubmit,
      });
      return {
        1: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[1] }),
        2: dataForSave,
      };
    },
    after: async ({ dispatch }) => {
      Modal.success({
        centered: true,
        title: formatMessageApi({ Label_COM_General: 'success' }),
        content: formatMessageApi({ Label_COM_Message: 'MSG_001074' }, 'QC'),
        okText: formatMessageApi({ Label_BPM_Button: 'Close' }),
        onOk: () => {
          dispatch({
            type: `newBusinessManualUnderwriting/setInformationModalShow`,
            payload: {
              cancel: true,
            },
          });
          taskGoBack();
        },
      });
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
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
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
        type: `${NAMESPACE}/setNameScreeningVisible`,
        payload: {
          nameScreeningVisible: true,
        },
      });
      return requestHandleType.break;
    },
  },
};
