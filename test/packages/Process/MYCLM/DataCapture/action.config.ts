import lodash from 'lodash';
import { NAMESPACE } from './activity.config';
import { EOptionType } from 'basic/enum/EOptionType';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { taskGoBack } from '@/utils/task';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import { errorMessageModal, warnMessageModal } from 'claim/pages/utils/popModel';
import { VLD_000569 } from 'claim/pages/HongKong/FurtherClaim/validator';
import { wholeEntities } from 'claimBasicProduct/pages/DataCapture/_models/dto/EntriesModel';
import handleMessageModal from '@/utils/commonMessage';
import { tenant } from '@/components/Tenant';

export default {
  submit: {
    validate: async ({ dispatch }) => {
      const region = tenant.region();

      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      const { checkNumberRefresh, policyAgent, promptMessages } = lodash.pick(dataForSubmit, [
        'checkNumberRefresh',
        'policyAgent',
        'promptMessages',
      ]);

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

      if (lodash.isEmpty(errors)) {
        const isVld000569 = VLD_000569(dataForSubmit);

        if (!dataForSubmit?.taskNotEditable && isVld000569) {
          return await warnMessageModal(
            [{ Label_COM_Message: 'MSG_000490' }],
            requestHandleType.continue,
            requestHandleType.break
          );
        }

        const claimRelation = await dispatch({
          type: `${NAMESPACE}/refreshSerialTreatment`,
        });

        if (
          lodash.isEmpty(dataForSubmit?.claimRelation?.treatmentRelationshipSelectionList) &&
          !lodash.isEmpty(claimRelation?.treatmentRelationshipSelectionList)
        ) {
          const result = await errorMessageModal(
            [{ Label_COM_Message: 'MSG_000485' }],
            requestHandleType.break
          );

          if (requestHandleType.break === result) {
            dispatch({
              type: 'claimCaseController/saveFurtherClaimVisable',
              payload: { furtherClaimVisable: true },
            });

            return requestHandleType.break;
          }
        }
      }

      return errors;
    },
    action: async ({ taskDetail, dispatch, allveriables }) => {
      const {
        taskDefKey,
        taskStatus,
        processInstanceId,
        taskId,
        caseCategory,
        submissionDate,
        submissionChannel,
      } = lodash.pick(taskDetail, [
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
        type: `${NAMESPACE}/getDataForSubmit`,
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
      dataForSubmit.submissionDate = dataForSubmit?.submissionDate || submissionDate;
      dataForSubmit.submissionChannel = dataForSubmit?.submissionChannel || submissionChannel;

      const common = {
        1: dataForBaseInfoParam,
        2: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[1] }),
        3: dataForSave,
      };

      return common;
    },
    after: async () => {
      taskGoBack();
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }) => {
      const taskNotEditable = await dispatch({
        type: 'claimEditable/getTaskNotEditable',
      });

      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        dataForSubmit,
        taskNotEditable,
      });

      return {
        1: dataForSave,
      };
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
};
