import lodash from 'lodash';
import { notification } from 'antd';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import handleMessageModal from '@/utils/commonMessage';
import { wholeEntities } from 'claimBasicProduct/pages/DataCapture/_models/dto/EntriesModel';
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
    validate: async ({ dispatch }) => {
      const dataForSubmit = await dispatch({
        type: 'opusClaimDataCapture/getDataForSubmit',
      });
      const { checkNumberRefresh, policyAgent } = lodash.pick(dataForSubmit, [
        'checkNumberRefresh',
        'policyAgent',
      ]);
      // 判断更改agent number是否有点击refresh icon
      if (!checkNumberRefresh && policyAgent?.agentNumber) {
        notification.error({
          message: formatMessageApi({
            Label_COM_ErrorMessage: 'MSG_000415',
          }),
        });
        return requestHandleType.break;
      }
      await dispatch({
        type: 'formCommonController/handleSubmited',
      });
      const errors: any = await dispatch({
        type: 'opusClaimDataCapture/validateFields',
      });
      const claimTypeValidateErrors = await dispatch({
        type: 'opusClaimDataCapture/validateClaimType',
      });
      if (lodash.isEmpty(errors) && !lodash.isEmpty(claimTypeValidateErrors)) {
        handleMessageModal(claimTypeValidateErrors);
        return requestHandleType.break;
      }
      return errors;
    },
    action: async ({ taskDetail, dispatch, allveriables }) => {
      const { taskDefKey, taskStatus, processInstanceId, taskId, caseCategory, submissionChannel } =
        lodash.pick(taskDetail, [
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
        type: 'opusClaimDataCapture/getDataForSubmit',
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
    action: async ({ dispatch, isAuto }) => {
      const taskDetail = await dispatch({
        type: 'processTask/getTaskDetail',
      });
      const updateOpusParam = lodash.pick(taskDetail, ['taskId', 'caseNo']);
      const dataForSubmit = await dispatch({
        type: 'opusClaimDataCapture/getDataForSubmit',
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
  split: {
    isShowNotice: false,
    action: async ({ dispatch }) => {
      const claimData = await dispatch({
        type: 'opusClaimDataCapture/getDataForSubmit',
      });
      dispatch({
        type: 'caseSplitController/splitModalOpen',
        payload: { claimData, wholeEntities },
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
        type: `opusClaimDataCapture/getDataForSubmit`,
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
};
