import lodash from 'lodash';
import { NAMESPACE } from './activity.config';

import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { EOptionType } from 'basic/enum/EOptionType';
import { taskGoBack } from '@/utils/task';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import { wholeEntities } from './_models/dto/EntriesModel';
import { errorMessageModal } from 'claim/pages/utils/popModel';
import { VLD_000573 } from 'claim/pages/HongKong/FurtherClaim/validator';
import handleMessageModal from '@/utils/commonMessage';
import { validateSubmit } from 'process/Utils';

export default {
  submit: {
    validate: async ({ dispatch, taskDetail }: any) => {
      if (taskDetail.taskDefKey === 'TH_CLM_ACT008') {
        return [];
      }

      await dispatch({
        type: `${NAMESPACE}/packDataForSubmit`,
      });

      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });

      const { promptMessages } = lodash.pick(dataForSubmit, ['promptMessages']);

      //VLD_000574 updating some key claim information which may affect serial claim selection
      const isSame = await dispatch({
        type: 'claimCaseController/compareClaimDataV2',
        payload: {
          targetDataPath: `${NAMESPACE}/getDataForSubmit`,
        },
      });

      if (!isSame) {
        // eslint-disable-next-line no-return-await
        return await errorMessageModal(
          [{ Label_COM_Message: 'MSG_000495' }],
          requestHandleType.break
        );
      }

      if (isSame) {
        const comparedClaimData = await dispatch({
          type: 'claimCaseController/getComparedClaimData',
        });

        if (!VLD_000573(dataForSubmit, comparedClaimData)) {
          // eslint-disable-next-line no-return-await
          return await errorMessageModal(
            [{ Label_COM_Message: 'MSG_000494' }],
            requestHandleType.break
          );
        }
      }

      // 校验当前payable change是否有做recalculation，如果没有，提示错误，终止submit
      const ignoreExpectDecisionWarn = await validateSubmit({
        dispatch,
        nameSpace: NAMESPACE,
        validatorType: 'TypePayable',
      });

      if (!ignoreExpectDecisionWarn) {
        return requestHandleType.break;
      }

      // 判断调integration接口是否返回error
      if (promptMessages) {
        handleMessageModal(promptMessages);
        return requestHandleType.break;
      }

      await dispatch({
        type: 'formCommonController/handleSubmited',
      });

      const errors: any = await dispatch({
        type: `${NAMESPACE}/validateFields`,
      });

      // 对接payment allocation
      const backData: any = await dispatch({
        type: 'paymentAllocation/allocationDockings',
        payload: {
          claimData: dataForSubmit,
        },
      });
      const { errors: allocationErrors, output } = backData;
      // 将返回的claim数据同步到主页面
      if (!lodash.isEmpty(output)) {
        dispatch({
          type: `${NAMESPACE}/savePaymentAllocation`,
          payload: output,
        });
      }

      const tempErrors = [...errors, ...allocationErrors];

      return tempErrors;
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
        3: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[1] }),
        4: dataForSave,
      };
    },
    after: async () => {
      taskGoBack();
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
      taskGoBack();
    },
  },
  split: {
    isShowNotice: false,
    action: async ({ dispatch }: any) => {
      const claimData = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      dispatch({
        type: 'caseSplitController/splitModalOpen',
        payload: { claimData, wholeEntities },
      });
    },
  },
};
