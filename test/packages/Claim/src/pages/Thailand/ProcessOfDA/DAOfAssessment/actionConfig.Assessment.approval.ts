import lodash from 'lodash';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { warnMessageModal, errorMessageModal } from 'claim/pages/utils/popModel';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import { EOptionType } from 'basic/enum/EOptionType';
import { wholeEntities } from './_models/dto/EntriesModel';
import { EConfigActivityKey } from './enums';
import EConfigCaseCategory from 'enum/CaseCategory';

const cliaimDataIsEmpty = (dataForSubmit: any) =>
  !lodash.isObject(dataForSubmit) &&
  dataForSubmit.toString() === requestHandleType.break.toString();

export default {
  submit: {
    validate: async ({ dispatch, taskDetail }) => {
      await dispatch({
        type: 'formCommonController/handleSubmited',
      });
      const errors = await dispatch({
        type: 'daOfClaimAssessmentController/validateFields',
      });

      if (!lodash.isEmpty(errors)) return errors;
      const isSame = await dispatch({
        type: 'claimCaseController/compareClaimDataV2',
        payload: {
          targetDataPath: 'daOfClaimAssessmentController/getDenormalizedClaimData',
        },
      });
      const hasChangeSection = await dispatch({
        type: 'daOfClaimAssessmentController/getHasChangeSection',
      });

      const hasBenefitItemCodeErrors = await dispatch({
        type: 'daOfClaimAssessmentController/getBenefitItemCodeErrors',
      });

      if (!!hasBenefitItemCodeErrors) {
        return await errorMessageModal(
          [{ Label_COM_WarningMessage: 'MSG_000791' }],
          requestHandleType.break
        );
      }

      if (lodash.some(hasChangeSection, (item) => lodash.size(item) > 0)) {
        // eslint-disable-next-line no-return-await
        return await warnMessageModal(
          [{ Label_COM_WarningMessage: 'MSG_000407' }],
          [...errors],
          requestHandleType.break
        );
      }
      if (taskDetail?.activityKey !== EConfigActivityKey.CP_ACT004 && !isSame) {
        // eslint-disable-next-line no-return-await
        return await warnMessageModal(
          [{ Label_COM_WarningMessage: 'WRN_000038' }],
          [...errors],
          requestHandleType.break
        );
      }
      if (
        (taskDetail?.caseCategory === EConfigCaseCategory.IDAC ||
          taskDetail?.caseCategory === EConfigCaseCategory.TH_GC_CTG06) &&
        taskDetail?.activityKey === EConfigActivityKey.CP_ACT004
      ) {
        const MessageCode = await dispatch({
          type: 'daOfClaimAssessmentController/getValidateApprovalInfo',
        });

        if (!lodash.isEmpty(MessageCode)) {
          return await warnMessageModal(
            [{ Label_COM_WarningMessage: `${MessageCode}` }],
            [...errors],
            requestHandleType.break
          );
        }
      }

      return errors;
    },
    action: async ({ dispatch, taskDetail, allveriables }) => {
      const claimData = await dispatch({
        type: 'daOfClaimAssessmentController/getDataForSubmit',
      });

      const claimDecision = {
        ...claimData.claimDecision,
        assessmentDecision: claimData.claimDecision?.assessmentDecision || 'D',
      };
      const dataForSubmit = { ...claimData, claimDecision: { ...claimDecision } };

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Submit,
        dataForSubmit,
      });

      return {
        1: cliaimDataIsEmpty(claimData)
          ? claimData
          : getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[0] }),
        2: dataForSave,
      };
    },
    after: async ({ dispatch }) => {
      dispatch({
        type: 'followUpClaim/saveSnapshot',
      });
    },
  },
  reject: {
    action: async ({ dispatch, taskDetail }) => {
      const { taskId } = lodash.pick(taskDetail, ['taskId']);

      const dataForSubmit = await dispatch({
        type: 'daOfClaimAssessmentController/getDataForSubmit',
      });
      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Reject,
        dataForSubmit,
      });
      return {
        1: { taskId },
        2: dataForSave,
      };
    },
    after: async ({ dispatch }) => {
      dispatch({
        type: 'followUpClaim/saveSnapshot',
      });
    },
  },
  save: {
    // timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }: any) => {
      const dataForSubmit = await dispatch({
        type: 'daOfClaimAssessmentController/getDataForSubmit',
      });

      const { taskId, processInstanceId } = lodash.pick(taskDetail, [
        'taskId',
        'processInstanceId',
      ]);

      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        dataForSubmit: { ...dataForSubmit, taskId, processInstanceId },
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
        type: 'daOfClaimAssessmentController/prepareClaimData',
      });
      dispatch({
        type: 'caseSplitController/splitModalOpen',
        payload: { claimData, wholeEntities },
      });
    },
  },
  image: {
    action: ({ taskDetail }: any) => {
      const caseNo = taskDetail?.processInstanceId;
      window.open(`/documentManage/${caseNo}`);
    },
    isShowNotice: false,
  },
};
