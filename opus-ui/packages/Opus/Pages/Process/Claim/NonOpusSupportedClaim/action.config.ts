import lodash from 'lodash';
import { NAMESPACE } from './activity.config';
import { Modal } from 'antd';
import { taskGoBack } from '@/utils/task';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { handleMessageModal } from '@/utils/commonMessage';
import { EOptionType } from 'basic/enum/EOptionType';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import { relationshipWithInsuredForJP } from 'claim/enum';
import TaskDefKey from 'basic/enum/TaskDefKey';

interface configItem {
  name: string;
  validator: () => any;
  weight: number;
}

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

const holdConfirmPromise = ({ dispatch, errorMessage }: any) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: `${NAMESPACE}/setConfirmModalShow`,
      payload: {
        errorMessage,
        resolve: resolve,
        reject: reject,
      },
    });
  });
};

/**
 * 执行校验配置function
 * @param {Array} validateConfig 校验配置
 */
const loop = async (validateConfig: configItem[]) => {
  const validators = lodash
    .chain(validateConfig)
    .orderBy('weight', 'desc')
    .filter((item: any) => {
      if (lodash.isFunction(item.filterFn)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        item.filterFn() && lodash.isFunction(item.validator);
      }
      return lodash.isFunction(item.validator);
    })
    .map((item) => item?.validator)
    .value();

  let result: any = [];

  for (let i = 0; i < validators.length; i++) {
    result = await validators[i]();
    if (result === requestHandleType.break) break;
  }
  return result;
};

export default {
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }: any) => {
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
  submit: {
    validate: async ({ dispatch, taskDetail }: any) => {
      if (taskDetail?.activityKey === TaskDefKey.JP_CLM_ACT003) {
        // 特殊校验，放在loop前
        const dataForSubmit = await dispatch({
          type: `${NAMESPACE}/getDataForSubmit`,
        });
        const claimAmlNameScreeningDOList = lodash.get(
          dataForSubmit,
          'claimAmlNameScreeningDOList'
        );
        const claimantValidated = [
          relationshipWithInsuredForJP.Self,
          relationshipWithInsuredForJP.PolicyOwner,
        ].includes(lodash.get(dataForSubmit, 'claimant.relationshipWithInsured'));

        if (!claimantValidated && !claimAmlNameScreeningDOList?.length) {
          await handleMessageModal([
            {
              code: 'MSG_001326',
              content: formatMessageApi({
                Label_COM_Message: 'MSG_001326',
              }),
            },
          ]);
          return requestHandleType.break;
        }
      }

      //submit前校验配置，按倒叙执行
      const validateConfig = [
        {
          name: 'formValidator',
          validator: async () => {
            await dispatch({
              type: 'formCommonController/handleSubmited',
            });
            const errors: any = await dispatch({
              type: `${NAMESPACE}/validateFields`,
            });

            return [...errors];
          },
          weight: 0,
        },
      ];
      const result = loop(validateConfig);

      // if (lodash.isEmpty(result)) {
      //   try {
      //     const confirm = await holdConfirmPromise({
      //       dispatch,
      //       errorMessage: formatMessageApi({ Label_COM_WarningMessage: 'MSG_001217' }),
      //     });
      //     if (!confirm) {
      //       return requestHandleType.break;
      //     }
      //   } catch (err) {
      //     return requestHandleType.break;
      //   }
      // }

      return result;
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
      });
      const dataForSave = await assembleDefaultDataForSave({
        dataForSubmit,
        taskDetail,
        optionType: EOptionType.Submit,
      });

      return {
        1: dataForBaseInfoParam,
        2: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[1] }),
        3: dataForSave,
      };
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
  escalate: {
    validate: async ({ taskDetail, dispatch }) => {
      try {
        await holdPromise(dispatch, 'EscalateReason', taskDetail);
      } catch (err) {
        return requestHandleType.break;
      }
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
  qaPass: {
    validate: async ({ dispatch }) => {
      // 补充Follow up task校验
      const validateConfig = [
        {
          name: 'formValidator',
          validator: async () => {
            await dispatch({
              type: 'formCommonController/handleSubmited',
            });
            const errors: any = await dispatch({
              type: `${NAMESPACE}/validateFields`,
            });

            return [...errors];
          },
          weight: 0,
        },
      ];
      const validateResult = await loop(validateConfig);

      if (validateResult.length) {
        return validateResult;
      }

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
      dispatch({
        type: `newBusinessManualUnderwriting/setInformationModalShow`,
        payload: {
          cancel: true,
        },
      });

      Modal.success({
        centered: true,
        title: formatMessageApi({ Label_COM_General: 'success' }),
        content: formatMessageApi({ Label_COM_Message: 'MSG_001072' }, 'QA'),
        okText: formatMessageApi({ Label_BPM_Button: 'Close' }),
        onOk: () => {
          taskGoBack();
        },
      });
    },
  },
  qaFail: {
    validate: async ({ taskDetail, dispatch }) => {
      // 补充Follow up task校验
      const validateConfig = [
        {
          name: 'formValidator',
          validator: async () => {
            await dispatch({
              type: 'formCommonController/handleSubmited',
            });
            const errors: any = await dispatch({
              type: `${NAMESPACE}/validateFields`,
            });

            return [...errors];
          },
          weight: 0,
        },
      ];
      const validateResult = await loop(validateConfig);

      if (validateResult.length) {
        return validateResult;
      }

      try {
        await holdPromise(dispatch, 'QAFail', taskDetail);
      } catch (err) {
        return requestHandleType.break;
      }
    },
    action: async ({ taskDetail, dispatch, allveriables }) => {
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
      dispatch({
        type: `newBusinessManualUnderwriting/setInformationModalShow`,
        payload: {
          cancel: true,
        },
      });

      Modal.success({
        centered: true,
        title: formatMessageApi({ Label_COM_General: 'success' }),
        content: formatMessageApi({ Label_COM_Message: 'MSG_001074' }, 'QA'),
        okText: formatMessageApi({ Label_BPM_Button: 'Close' }),
        onOk: () => {
          taskGoBack();
        },
      });
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
    after: async ({ dispatch }: any) => {
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
            return resolve(true);
          },
        });
      });
    },
  },
};
