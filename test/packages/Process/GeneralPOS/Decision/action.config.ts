import { eOperationType } from '@/enum/eOperationType';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { EOptionType } from 'basic/enum/EOptionType';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import lodash from 'lodash';
import { NAMESPACE } from './activity.config';
import logButton from '@/components/AuditLog/API/logButton';
import { ButtonCode } from 'bpm/enum';
import delay from '@/utils/delay';

export default {
  submit: {
    validate: async ({ dispatch }: any) => {
      const skipValidate = await dispatch({
        type: `${NAMESPACE}/skipValidate`,
        payload: {
          isReAss: false,
        },
      });
      if (skipValidate.result) {
        return [];
      }
      if (!skipValidate.result && skipValidate.hasError) {
        return skipValidate.errors;
      }

      const errors: any = await dispatch({
        type: `${NAMESPACE}/validateFields`,
      });

      if (lodash.isEmpty(errors)) {
        const checkDuplicateResult = await dispatch({
          type: `${NAMESPACE}/dedupCheckIdentifyDouble`,
        });
        if (checkDuplicateResult !== 'end') {
          return requestHandleType.break;
        }

        const isContinue = await dispatch({
          type: `${NAMESPACE}/validateFieldsBefore`,
        });
        if (!isContinue) {
          return requestHandleType.break;
        }
      }

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
        payload: { isSave: false },
      });
      dataForSubmit.showReAssess = {};

      const dataForSave = await assembleDefaultDataForSave({
        dataForSubmit,
        taskDetail,
        optionType: EOptionType.Submit,
      });

      return {
        1: dataForBaseInfoParam,
        2: getSubmitData({
          taskDetail,
          dataForSubmit: dataForSubmit,
          variables: allveriables[1],
        }),
        3: dataForSave,
      };
    },
    anyway: async ({ responseCollect, dispatch, taskDetail, isSuccess }) => {
      try {
        if (
          Object.values(responseCollect)?.find((item) =>
            item.promptMessages?.find((messItem) => messItem?.code === 'bpm.task.is.pend')
          )
        ) {
          logButton({
            buttonCode: ButtonCode.Submit,
            isAuto: false,
            dispatch,
            taskId: taskDetail?.taskId,
            caseNo: taskDetail?.caseNo,
            activityKey: taskDetail?.activityKey,
          });
        }
      } catch (err) {
        console.log('err', err);
      }

      try {
        if (!isSuccess) {
          await delay(300);
          dispatch({
            type: 'navigatorInformationController/loadAllCategoryInformation',
            payload: { caseCategory: taskDetail?.caseCategory },
          });
        }
      } catch (err) {
        console.log('err', err);
      }
    },
    after: async () => {
      // taskGoBack();
    },
  },
  withdraw: {
    hidden: ({ taskDetail }: any) => {
      return;
    },
    action: async ({ dispatch, taskDetail, allveriables }: any) => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      return {
        1: getSubmitData({
          taskDetail,
          dataForSubmit: dataForSubmit,
          variables: allveriables[1],
          operationType: eOperationType.withdraw,
        }),
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
        payload: { isSave: true },
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
  ews: {
    isShowNotice: false,
    action: ({ taskDetail }: any) => {
      const { businessNo, processInstanceId } = lodash.pick(taskDetail, [
        'businessNo',
        'processInstanceId',
      ]);
      if (businessNo && processInstanceId) {
        window.open(`/servicing/ews/${businessNo}/${processInstanceId}`, '_blank');
      }
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
