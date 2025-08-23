import claimSplitClaimCaseService from '@/services/claimSplitClaimCaseService';
import claimJpSplitClaimCaseService from '@/services/claimJpSplitClaimCaseService';
import claimQcControllerService from '@/services/claimQcControllerService';
import claimRbClaimAssessmentControllerService from '@/services/claimRbClaimAssessmentControllerService';
import lodash, { includes, toUpper, find, isFunction } from 'lodash';
import { Action } from '@/components/AuditLog/Enum';
import CaseCategory from 'enum/CaseCategory';
import { ESplitTypes } from '../../dto/splitTypes';

// /api/claim/assessment/th/rb/split
export default function* ({ payload }: any, { call, put, select }: any) {
  const { postData, caseCategory, splitType } = payload;
  const splitClaimAssessmentBO = yield select(
    ({ caseSplitController }: any) => caseSplitController.splitClaimAssessmentBO
  );

  const splitUrlData = [
    {
      splitUrl: claimSplitClaimCaseService.split,
      caseCategory: CaseCategory.Claim_Request, // 基础产品
    },
    {
      splitUrl:
        splitType === ESplitTypes.Document
          ? claimQcControllerService.splitCase
          : claimJpSplitClaimCaseService.splitCaseV3,
      caseCategory: [
        CaseCategory.JP_MC_CTG01,
        CaseCategory.JP_PC_CTG01,
        CaseCategory.JP_CP_CTG001,
        CaseCategory.JP_DD_CTG01,
        CaseCategory.JP_CLM_CTG001,
        CaseCategory.JP_PA_CTG01,
        CaseCategory.JP_CLM_CTG002,
        CaseCategory.JP_CLM_CTG01,
        CaseCategory.BP_CLM_CTG007,
        CaseCategory.BP_CLM_CTG008,
      ], // 日本产品 包括新的PH assessment
    },
    {
      splitUrl:
        splitType === ESplitTypes.DifferentIncidentNo
          ? claimSplitClaimCaseService.splitV2
          : claimRbClaimAssessmentControllerService.split,
      caseCategory: [
        CaseCategory.IAPC,
        CaseCategory.IDAC,
        CaseCategory.TH_MC_CTG01,
        CaseCategory.TH_GC_CTG01,
        CaseCategory.TH_GC_CTG02,
        CaseCategory.TH_GC_CTG03,
        CaseCategory.TH_GC_CTG04,
        CaseCategory.TH_GC_CTG05,
        CaseCategory.TH_GC_CTG06,
        CaseCategory.TH_GC_CTG07,
        CaseCategory.TH_UD_CTG01,
        CaseCategory.TH_IHB_CTG01,
        CaseCategory.TH_IHA_CTG01,
      ], // 泰国产品
    },
    {
      splitUrl: claimSplitClaimCaseService.phSplit,
      caseCategory: [
        CaseCategory.PH_CLM_CTG001,
        CaseCategory.PH_CLMUW_CTG001,
        CaseCategory.PH_AP_CTG01,
        CaseCategory.PH_POS_CTG006,
        CaseCategory.PH_POS_CTG005,
        CaseCategory.PH_POS_CTG004,
        CaseCategory.PH_POS_CTG003,
        CaseCategory.PH_POS_CTG002,
        CaseCategory.PH_POS_CTG001,
      ], // 菲律宾产品
    },
  ];

  if (splitType === ESplitTypes.DifferentIncidentNo && !lodash.isEmpty(splitClaimAssessmentBO)) {
    lodash.set(postData, 'splitClaimAssessmentBO', splitClaimAssessmentBO);
  }

  const { splitUrl } =
    find(splitUrlData, (item) => includes(item.caseCategory, toUpper(caseCategory))) || {};

  if (isFunction(splitUrl)) {
    const response = yield call(splitUrl, postData);

    /** -- auditLog -- */
    if (response?.success) {
      yield put({
        type: 'auditLogController/logTask',
        payload: {
          action: Action.Split,
        },
      });
      yield put({
        type: 'navigatorInformationController/loadAllCategoryInformation',
      });
    }

    return response;
  }
}
