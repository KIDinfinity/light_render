import lodash from 'lodash';
import {
  calculatPayableAmountForSplit,
  updataPolicyBenefitList,
  calculatBeneficiaryAmount,
  calculatPaymentAmount,
} from '../functions/calculatPayableAmount';

// eslint-disable-next-line require-yield
export default function* updatePayableAmount({ payload }: any) {
  const { claimProcessData, claimEntities } = lodash.cloneDeep(payload);
  const { claimPayableList } = claimProcessData;
  if (lodash.isArray(claimPayableList) && claimPayableList.length > 0) {
    // payableAmount逐级计算
    calculatPayableAmountForSplit(claimProcessData, claimEntities);
    // 更新保单受取人
    updataPolicyBenefitList(claimProcessData, claimEntities);
    // 计算payeeList中每个人分配的收益金额
    calculatBeneficiaryAmount(claimProcessData, claimEntities);
    calculatPaymentAmount(claimProcessData, claimEntities);
  } else {
    claimProcessData.policyBenefitList = [];
    claimEntities.policyBenefitListMap = {};
    claimEntities.beneficiaryListMap = {};
  }
  return { claimProcessData, claimEntities };
}
