import lodash from 'lodash';
import { EXPECTPOLICYINCIDENT } from 'claim/pages/utils/claimConstant';
import { CLM } from 'claim/pages/taskDefKey';
import { CategoryCode } from '@/utils/constant/information';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import { EOptionType } from 'basic/enum';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { eOperationType } from '@/enum/eOperationType';
import { getDocInfoList } from './Utils/documentUtils';
import { assembleDefaultDataForSave, assemblePendingDataForSave } from 'basic/utils/SnapshotTool';
import { DocumentStatus } from './Enum';

const getWithdrawVO = (claimProcessData: any, businessNo: string) => {
  const parentClaimNo = claimProcessData?.parentClaimNo;
  const bpoFormDataList = lodash.get(
    claimProcessData,
    `bpoBatchDataVO.bpoDocumentDataList[0].bpoFormDataList`
  );
  const expectPolicyList = lodash
    .chain(bpoFormDataList)
    .map((item) => {
      const {
        formData: { firstPolicyId, secondPolicyId, thirdPolicyId },
        applicationNo,
      } = item;
      return lodash
        .chain([firstPolicyId, secondPolicyId, thirdPolicyId])
        .compact()
        .uniq()
        .map((po) => ({
          ...EXPECTPOLICYINCIDENT,
          policyId: po,
          applicationNo,
          parentClaimNo,
          claimNo: businessNo,
        }))
        .value();
    })
    .flatten()
    .value();
  return {
    parentClaimNo,
    claimNo: businessNo,
    claimDecisionVO: { claimNo: businessNo },
    expectPolicyList,
  };
};

export default {
  submit: {
    validate: async ({ dispatch, taskDetail }: any) => {
      const { taskDefKey } = lodash.pick(taskDetail, ['taskDefKey']);
      if (taskDefKey === CLM.JP_CLM_ACT008) {
        return [];
      }
      await dispatch({
        type: 'formCommonController/handleSubmited',
      });
      const errors = await dispatch({
        type: 'JPCLMOfQualityController/validateFields',
      });
      return errors;
    },
    action: async ({ dispatch, taskDetail, allveriables }: any) => {
      const claimProcessData = await dispatch({
        type: 'JPCLMOfQualityController/getClaimProcessData',
        format: true,
      });
      const { taskDefKey, businessNo } = lodash.pick(taskDetail, ['taskDefKey', 'businessNo']);

      const dataForSave = await assemblePendingDataForSave({
        optionType: EOptionType.Submit,
        taskDetail,
        dataForSubmit: claimProcessData,
      });

      const docInfoList = getDocInfoList(claimProcessData);
      if (taskDefKey === CLM.JP_CLM_ACT008) {
        return {
          2: getSubmitData({
            taskDetail,
            dataForSubmit: getWithdrawVO(claimProcessData, businessNo),
            variables: allveriables[0],
          }),
          4: dataForSave,
        };
      }
      return {
        1: getSubmitData({
          taskDetail,
          dataForSubmit: claimProcessData,
          variables: allveriables[0],
        }),
        2: dataForSave,
        3: !docInfoList ? requestHandleType.continue : docInfoList,
      };
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }: any) => {
      const dataForSubmit = await dispatch({
        type: 'JPCLMOfQualityController/getClaimProcessData',
      });

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        dataForSubmit,
      });
      return { 1: dataForSave };
    },
  },
  split: {
    isShowNotice: false,
    after: async ({ dispatch }: any) => {
      const claimProcessDataSplit = await dispatch({
        type: 'JPCLMOfQualityController/getDataForSplit',
      });

      dispatch({
        type: 'caseSplitController/splitModalOpen',
        payload: { claimData: claimProcessDataSplit },
      });
    },
  },
  businessCheck: {
    action: async ({ dispatch, taskDetail }: any) => {
      const dataForSubmit = await dispatch({
        type: 'JPCLMOfQualityController/getClaimProcessData',
      });

      const dataForSave = await assembleDefaultDataForSave({
        dataForSubmit,
        taskDetail,
        optionType: EOptionType.BusinessCheck,
      });

      const dataForCheck = await dispatch({
        type: 'JPCLMOfQualityController/getBusinessCheckData',
      });
      return {
        1: dataForSave,
        2: dataForCheck,
      };
    },
    after: async ({ dispatch, responseCollect = {} }: any) => {
      dispatch({
        type: 'navigatorInformationController/handleOpenInformation',
        payload: {
          categoryCode: CategoryCode.BusinessCheck,
        },
      });
      const isPassBusinessCheck = lodash.isEmpty(lodash.get(responseCollect, '2.resultData'));
      if (isPassBusinessCheck) {
        await dispatch({
          type: 'JPCLMOfQualityController/saveDoneBusinessCheck',
          payload: {
            doneBusinessCheck: true,
          },
        });
        await dispatch({
          type: 'JPCLMOfQualityController/saveSnapshot',
        });
      }
    },
  },
  withdrawal: {
    hidden: ({ claimStates }: any) => {
      const bpoFormDataList = lodash.get(claimStates, 'claimEntities.bpoFormDataList', {});
      return lodash.some(
        lodash.values(bpoFormDataList),
        ({ formData }: any) => lodash.toLower(formData.documentStatus) !== DocumentStatus.P
      );
    },
    action: async ({ dispatch, taskDetail }: any) => {
      const { taskId, processInstanceId, businessNo } = lodash.pick(taskDetail, [
        'taskId',
        'businessNo',
        'processInstanceId',
      ]);
      const claimProcessData = await dispatch({
        type: 'JPCLMOfQualityController/getClaimProcessData',
      });

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Withdrawal,
        dataForSubmit: claimProcessData,
      });

      return {
        1: { taskId, processInstanceId },
        2: getWithdrawVO(claimProcessData, businessNo),
        3: { processInstanceId },
        4: dataForSave,
      };
    },
  },
  tblSearch: {
    isShowNotice: false,
    action: async ({ dispatch }: any) => {
      dispatch({
        type: 'medicalSearch/changeVisible',
        payload: {
          visible: true,
        },
      });
    },
  },
  reject: {
    action: async ({ dispatch, taskDetail, allveriables }: any) => {
      const claimProcessData = await dispatch({
        type: 'JPCLMOfQualityController/getClaimProcessData',
        format: true,
      });

      const dataForSave = await assemblePendingDataForSave({
        optionType: EOptionType.Reject,
        taskDetail,
        dataForSubmit: claimProcessData,
      });

      return {
        2: getSubmitData({
          taskDetail,
          variables: allveriables[0],
          operationType: eOperationType.reject,
        }),
        3: dataForSave,
      };
    },
  },
};
