import lodash from 'lodash';
import {
  summaryAmountToClaimDecision,
  updatPolicyBenefitList,
  updatPayeeList,
} from '../functions/claimPayableFunc';

export default function* updatePayableAmount({ payload }: any, { select }: any) {
  const { claimProcessData, claimEntities } = lodash.cloneDeep(payload);

  const {
    beneficiaryPayableTypeMap,
    policyBeneficiaryListMap,
    policyInsuredListMap,
    policyOwnerListMap,
  } = yield select((state: any) => state.JPCLMOfClaimAssessmentController);

  // payableAmount逐级计算
  summaryAmountToClaimDecision(claimProcessData, claimEntities);
  // 更新保单受取人
  updatPolicyBenefitList({
    claimProcessData,
    claimEntities,
    beneficiaryPayableTypeMap,
    policyBeneficiaryListMap,
    policyInsuredListMap,
    policyOwnerListMap,
  });
  // 计算payeeList中每个人分配的收益金额
  updatPayeeList(claimProcessData, claimEntities);

  return { claimProcessData, claimEntities };
}
