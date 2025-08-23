import lodash from 'lodash';
import {
  calculatPayableAmount,
  calculatPolicyBenefitListAmount,
} from '../functions/calculatPayableAmount';

export default function* updatePayableAmount({ payload }: any, { select }: any) {
  const { claimProcessData, claimEntities } = lodash.cloneDeep(payload);
  const { claimPayableList } = claimProcessData;
  const listPolicy = yield select(
    ({ daOfClaimAssessmentController }: any) => daOfClaimAssessmentController.listPolicy
  );

  if (lodash.isArray(claimPayableList) && claimPayableList.length > 0) {
    // payableAmount逐级计算
    yield calculatPayableAmount(claimProcessData, claimEntities);

    // PolicyBenefitListAmount计算
    yield calculatPolicyBenefitListAmount(claimProcessData, claimEntities, listPolicy);
  } else {
    claimProcessData.policyBenefitList = [];
    claimEntities.policyBenefitListMap = {};
    claimEntities.beneficiaryListMap = {};
  }
  return { claimProcessData, claimEntities };
}
