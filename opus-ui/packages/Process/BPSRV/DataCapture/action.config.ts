import lodash, { isEqual } from 'lodash';
import { transferData } from 'basic/components/Form/FormItem/utils';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { NAMESPACE } from './activity.config';

export default {
  submit: {
    validate: async ({ dispatch, taskDetail }: any) => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });

      const { mainPolicyId, sourceSystem, policyInfo } = dataForSubmit;
      const hasPolicyInfo = lodash.find(
        policyInfo?.applyToPolicyInfoList,
        (item: any) => item.policyId === mainPolicyId && item.sourceSystem === sourceSystem
      );
      if (!hasPolicyInfo) {
        const result = await dispatch({
          type: `${NAMESPACE}/policyInfoRemote`,
          payload: {
            policyNo: mainPolicyId,
          },
        });
        if (!result) {
          return requestHandleType.break;
        }
      }
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
      });

      const dataForSave = await assembleDefaultDataForSave({
        dataForSubmit,
        taskDetail,
        optionType: EOptionType.Submit,
      });
      const { policyInfo, transactionTypes } = dataForSubmit;

      const newTransactionTypes = transactionTypes.map((item: any) => {
        if (
          item.contactInfo &&
          isEqual(
            transferData(policyInfo.clientContact?.email),
            transferData(item.contactInfo?.email)
          ) &&
          isEqual(
            transferData(policyInfo.clientContact?.phoneNo),
            transferData(item.contactInfo?.phoneNo)
          ) &&
          isEqual(
            transferData(policyInfo.clientContact?.homeNo),
            transferData(item.contactInfo?.homeNo)
          ) &&
          isEqual(
            transferData(policyInfo.clientContact?.workNo),
            transferData(item.contactInfo?.workNo)
          )
        ) {
          return { ...item, contactInfo: null };
        }
        return item;
      });
      const newDataForSubmit = { ...dataForSubmit, transactionTypes: newTransactionTypes };

      return {
        1: dataForBaseInfoParam,
        2: {
          ...getSubmitData({
            taskDetail,
            dataForSubmit: newDataForSubmit,
            variables: allveriables[1],
          }),
          submissionDate: newDataForSubmit.submissionDate,
          activityVariables: { editFlag: '00' },
        },
        3: dataForSave,
      };
    },
    after: async () => {
      // taskGoBack();
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }: any) => {
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
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
