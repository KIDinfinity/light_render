import { getFacultativePackageCodeInfo } from '@/services/owbNbCoverageUWDecisionServices';
import lodash from 'lodash';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';
import TaskDefKey from 'enum/TaskDefKey';
import CaseCategory from 'enum/CaseCategory';
import { tenant, Region } from '@/components/Tenant';
import PolicyLevelDecision from 'opus/NewBusiness/Enum/PolicyLevelDecision';

let b = false;

export default function* (_: any, { call, select, put }: any): Generator<any, any, any> {
  const processData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData
  ) || {};
  const taskNotEditable = yield select(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const policyDecision = processData?.policyDecision || {};
  const decisionCode = formUtils.queryValue(
    lodash.chain(policyDecision).get('decisionCode').value()
  );
  const applicationNo = processData.applicationNo;
  const { caseCategory, activityKey } = yield select(
    ({ processTask }: any) => processTask.getTask
  ) || {};

  const isManualUwCase =
    caseCategory === CaseCategory.BP_NB_CTG001 && activityKey === TaskDefKey.BP_NB_ACT004;
  const isAppealCase =
    caseCategory === CaseCategory.BP_AP_CTG02 && activityKey === TaskDefKey.BP_AP_ACT003;
  const isProceedGetFacultativeInfo =
    tenant.region() === Region.TH &&
    decisionCode === PolicyLevelDecision.Approve &&
    (isManualUwCase || isAppealCase) &&
    !taskNotEditable;

  if (isProceedGetFacultativeInfo) {
    const facultativeInfoResponse = yield call(getFacultativePackageCodeInfo, {
      applicationNo,
      caseCategory,
      policyDecisionCode: decisionCode,
    });

    const { success, resultData } = lodash.pick(facultativeInfoResponse, ['success', 'resultData']);
    if (success) {
      b = !b;
      yield put({
        type: 'saveFacultativeInfo',
        payload: {
          facultativeInfo: resultData,
        },
      });
    }
  }
}
